export interface QuestionAnswer {
  questionNumber: number;
  selectedOptions: string[];
  question: string;
}

export interface HealthScores {
  diet: number;      // 飲食
  lifestyle: number; // 作息 / 睡眠
  mental: number;    // 心理 / 精神
  physical: number;  // 身體素質（含眼睛、骨關節等）
  exercise: number;  // 運動
  immune: number;    // 免疫力
  skin?: number;     // 皮膚（選填）
  eyes?: number;     // 眼睛（選填）
}

export interface HealthAnalysisResult {
  scores: HealthScores;
  overallScore: number;
  bmi?: number;
  age?: number;
  needsImprovement: string[];
  recommendations: string[];
  percentile: number;
}

/**
 * HealthAnalysisService
 * - 儲存 / 讀取問卷答案與使用者資料
 * - 儲存 / 讀取使用者在 Health Goals 頁面選擇的目標
 * - 分析問卷答案並計算簡單分數與建議
 */
export class HealthAnalysisService {
  /**
   * 問題類別對應（1~38）
   * - 眼睛: Q1-2
   * - 骨關節: Q3-6
   * - 腸胃: Q7
   * - 免疫力: Q8
   * - 精神體力: Q9-10
   * - 皮膚: Q11-13
   * - 睡眠: Q14, Q15, Q29-31, Q32
   * - 飲食: Q16-25
   * - 抽菸: Q26
   * - 排便: Q27
   * - 營養缺乏: Q28
   * - 慢性病: Q34
   * - 其他問題群: Q35
   * - 服藥: Q36
   * - 戶外日照: Q37
   * - 運動: Q38
   */
  private static readonly QUESTION_CATEGORIES: { [key: string]: number[] } = {
    eyes: [1, 2],
    bones: [3, 4, 5, 6],
    gut: [7],
    immune: [8],
    mental: [9, 10],
    skin: [11, 12, 13],
    sleep: [14, 15, 29, 30, 31, 32],
    diet: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    smoking: [26],
    bowel: [27],
    deficiency: [28],
    chronic: [34],
    otherConditions: [35],
    meds: [36],
    outdoor: [37],
    exercise: [38]
  };

  /**
   * QUESTION_SHOW_IF: 若題目只在特定目標被選時顯示，請在此 mapping 上註明
   * (題目 1..15 有綁定主題；16~38 為通用)
   */
  private static readonly QUESTION_SHOW_IF: { [questionNumber: number]: string } = {
    1: "眼睛",
    2: "眼睛",
    3: "骨關節",
    4: "骨關節",
    5: "骨關節",
    6: "骨關節",
    7: "腸胃",
    8: "免疫力",
    9: "精神體力",
    10: "精神體力",
    11: "皮膚",
    12: "皮膚",
    13: "皮膚",
    14: "睡眠",
    15: "睡眠"
    // 16-38 為通用（未列於此 mapping）
  };

  // ------------------------------
  // 新增：計算顯示題目的 helper（避免頁面逐個 mount 再跳轉造成閃動）
  // ------------------------------
  /**
   * 取得第一個應顯示的題號（依照 1..38 的順序）
   * 若沒有任何題目需要顯示，回傳 null
   */
  static getFirstVisibleQuestion(selectedGoals: string[]): number | null {
    for (let q = 1; q <= 38; q++) {
      const requiredGoal = this.QUESTION_SHOW_IF[q];
      if (!requiredGoal) {
        // 通用題，顯示
        return q;
      }
      if (selectedGoals.includes(requiredGoal)) {
        return q;
      }
    }
    return null;
  }

  /**
   * 取得 currentQuestionNumber 之後下一個應顯示題目的題號，若找不到回傳 null
   * selectedGoals 可選，若未提供會讀取 localStorage 的 selected goals
   */
  static getNextVisibleQuestion(currentQuestionNumber: number, selectedGoals?: string[]): number | null {
    const goals = selectedGoals || this.loadSelectedGoals();
    for (let q = currentQuestionNumber + 1; q <= 38; q++) {
      const requiredGoal = this.QUESTION_SHOW_IF[q];
      if (!requiredGoal) {
        return q;
      }
      if (goals.includes(requiredGoal)) {
        return q;
      }
    }
    return null;
  }

  // ------------------------------
  // 分析主流程（保留原有實作）
  // ------------------------------
  static analyzeAnswers(
    answers: QuestionAnswer[],
    userInfo?: { age?: number; weight?: number; height?: number }
  ): HealthAnalysisResult {
    const scores = this.calculateScores(answers);
    const overallScore = Math.round(
      (scores.diet +
        scores.lifestyle +
        scores.mental +
        scores.physical +
        scores.exercise +
        (scores.immune ?? 50)) /
        6
    );

    let bmi: number | undefined;
    if (userInfo?.weight && userInfo?.height) {
      const heightInMeters = userInfo.height / 100;
      bmi = Math.round((userInfo.weight / (heightInMeters * heightInMeters)) * 10) / 10;
    }

    const needsImprovement = this.identifyImprovementAreas(scores);
    const recommendations = this.generateRecommendations(scores, answers);
    const percentile = this.calculatePercentile(overallScore);

    return {
      scores,
      overallScore,
      bmi,
      age: userInfo?.age,
      needsImprovement,
      recommendations,
      percentile
    };
  }

  // 以下為原本的計分實作（未變動）
  private static calculateScores(answers: QuestionAnswer[]): HealthScores {
    const get = (category: string) =>
      this.calculateCategoryScore(answers, this.QUESTION_CATEGORIES[category] || [], category);

    const eyesScore = get('eyes');
    const bonesScore = get('bones');
    const gutScore = get('gut');
    const immuneScore = get('immune');
    const mentalScore = get('mental');
    const skinScore = get('skin');
    const sleepScore = get('sleep');
    const dietScore = get('diet');
    const exerciseScore = get('exercise');

    // physical 綜合：骨關節、眼睛、部分飲食影響
    const physicalScore = Math.round((bonesScore * 0.6 + eyesScore * 0.25 + dietScore * 0.15));

    return {
      diet: dietScore,
      lifestyle: sleepScore,
      mental: mentalScore,
      physical: physicalScore,
      exercise: exerciseScore,
      immune: immuneScore,
      skin: skinScore,
      eyes: eyesScore
    };
  }

  private static calculateCategoryScore(
    answers: QuestionAnswer[],
    questionNumbers: number[],
    category: string
  ): number {
    if (!questionNumbers || questionNumbers.length === 0) return 50;

    const categoryAnswers = answers.filter(a => questionNumbers.includes(a.questionNumber));
    if (categoryAnswers.length === 0) return 50;

    let total = 0;
    let count = 0;
    categoryAnswers.forEach(a => {
      total += this.getQuestionScore(a.questionNumber, a.selectedOptions, category);
      count++;
    });

    return count > 0 ? Math.round(total / count) : 50;
  }

  private static getQuestionScore(questionNumber: number, selectedOptions: string[], category?: string): number {
    if (!selectedOptions || selectedOptions.length === 0) return 50;

    switch (questionNumber) {
      case 1:
        return selectedOptions.includes('是') ? 30 : 90;
      case 2: {
        const problems = selectedOptions.length;
        if (problems === 0) return 90;
        return Math.max(90 - problems * 25, 20);
      }
      case 3:
        if (selectedOptions.includes('嚴重')) return 20;
        if (selectedOptions.includes('輕微')) return 60;
        return 50;
      case 4:
        if (selectedOptions.includes('經常')) return 25;
        if (selectedOptions.includes('偶爾')) return 60;
        return 90;
      case 5:
        if (selectedOptions.includes('嚴重')) return 30;
        if (selectedOptions.includes('輕微')) return 65;
        return 90;
      case 6:
        return selectedOptions.includes('是') ? 50 : 80;
      case 7: {
        if (selectedOptions.includes('都沒有')) return 90;
        const problems = selectedOptions.length;
        return Math.max(85 - problems * 20, 25);
      }
      case 8:
        if (selectedOptions.includes('0-1次')) return 90;
        if (selectedOptions.includes('2-4次')) return 65;
        return 30;
      case 9:
        return selectedOptions.includes('是') ? 35 : 85;
      case 10:
        return selectedOptions.includes('是') ? 40 : 85;
      case 11:
        return selectedOptions.includes('是') ? 40 : 85;
      case 12:
        return selectedOptions.includes('是') ? 45 : 85;
      case 13:
        return selectedOptions.includes('是') ? 65 : 85;
      case 14:
        if (selectedOptions.includes('幾乎不用')) return 90;
        if (selectedOptions.includes('一週1-3次')) return 60;
        return 25;
      case 15:
        if (selectedOptions.includes('正常')) return 90;
        if (selectedOptions.includes('壓力大')) return 60;
        return selectedOptions.includes('低落') || selectedOptions.includes('焦慮') ? 35 : 60;
      case 16:
        return 75;
      case 17:
        if (selectedOptions.includes('自己煮')) return 90;
        if (selectedOptions.includes('餐廳')) return 70;
        return 40;
      case 18:
        if (selectedOptions.includes('5份以上')) return 90;
        if (selectedOptions.includes('3-5份')) return 70;
        return 35;
      case 19:
        if (selectedOptions.includes('4份以上')) return 90;
        if (selectedOptions.includes('2-4份')) return 70;
        return 35;
      case 20:
        if (selectedOptions.includes('3份以上')) return 90;
        if (selectedOptions.includes('1-2份')) return 70;
        return 35;
      case 21:
        if (selectedOptions.includes('2杯以上')) return 85;
        if (selectedOptions.includes('1-2杯')) return 70;
        return 40;
      case 22:
        if (selectedOptions.includes('2-4碗')) return 75;
        if (selectedOptions.includes('4碗以上')) return 90;
        return 45;
      case 23:
        if (selectedOptions.includes('3瓶以上')) return 90;
        if (selectedOptions.includes('1-2瓶')) return 70;
        return 40;
      case 24:
        if (selectedOptions.includes('每週0-1份')) return 90;
        if (selectedOptions.includes('每週2-8份')) return 65;
        return 30;
      case 25:
        if (selectedOptions.includes('從來不會')) return 90;
        if (selectedOptions.includes('偶爾')) return 65;
        if (selectedOptions.includes('經常')) return 30;
        return 50;
      case 26:
        if (selectedOptions.includes('幾乎不抽菸')) return 90;
        if (selectedOptions.includes('一週1-2包')) return 60;
        if (selectedOptions.includes('每天半包')) return 40;
        return 20;
      case 27:
        if (selectedOptions.includes('一天一次')) return 90;
        if (selectedOptions.includes('一天三次以上')) return 75;
        if (selectedOptions.includes('兩天一次')) return 50;
        return 30;
      case 28:
        if (selectedOptions.includes('都沒有')) return 90;
        const defs = selectedOptions.length;
        return Math.max(85 - defs * 20, 20);
      case 29:
        return selectedOptions.includes('30分鐘以內') ? 90 : 40;
      case 30:
        if (selectedOptions.includes('能一覺到天亮')) return 90;
        if (selectedOptions.includes('睡睡醒醒')) return 50;
        return 40;
      case 31:
        if (selectedOptions.includes('很少')) return 90;
        if (selectedOptions.includes('偶爾')) return 65;
        return 35;
      case 32:
        return selectedOptions.includes('是') ? 30 : 85;
      case 33:
        return selectedOptions.includes('是') ? 40 : 85;
      case 34:
        if (selectedOptions.includes('都沒有')) return 90;
        return Math.max(80 - selectedOptions.length * 15, 20);
      case 35:
        if (selectedOptions.includes('都沒有')) return 90;
        return Math.max(80 - selectedOptions.length * 12, 20);
      case 36:
        if (selectedOptions.includes('都沒有')) return 90;
        return Math.max(70 - (selectedOptions.length - 1) * 10, 30);
      case 37:
        if (selectedOptions.includes('1小時以上')) return 90;
        if (selectedOptions.includes('15-60分鐘')) return 70;
        return 40;
      case 38:
        if (selectedOptions.includes('3次以上')) return 90;
        if (selectedOptions.includes('1-2次')) return 65;
        return 30;
      default:
        return 50;
    }
  }

  // ------------------------------
  // 改善建議與風險判斷（同原實作）
  // ------------------------------
  private static identifyImprovementAreas(scores: HealthScores): string[] {
    const areas: string[] = [];

    if (scores.exercise < 50) areas.push('運動');
    if (scores.mental < 60) areas.push('精神/情緒');
    if (scores.diet < 65) areas.push('飲食');
    if (scores.lifestyle < 65) areas.push('作息/睡眠');
    if (scores.physical < 60) areas.push('身體素質');
    if (scores.immune < 65) areas.push('免疫力');
    if (scores.skin !== undefined && scores.skin < 70) areas.push('皮膚');
    if (scores.eyes !== undefined && scores.eyes < 70) areas.push('眼睛');

    return areas;
  }

  private static generateRecommendations(scores: HealthScores, answers: QuestionAnswer[]): string[] {
    const recs: string[] = [];

    if (scores.diet < 70) {
      recs.push('建議增加蔬果與全穀攝取，減少加工食品與高油鹽食物。');
    }
    if (scores.exercise < 50) {
      recs.push('建議每週至少 150 分鐘中等強度運動（例如快走、慢跑或游泳）。');
    }
    if (scores.mental < 60) {
      recs.push('建議實施壓力管理技巧，例如深呼吸、正念或短時間運動。');
    }
    if (scores.lifestyle < 65) {
      recs.push('建議建立規律睡眠習慣，避免過度使用 3C 與熬夜。');
    }
    if (scores.physical < 60) {
      recs.push('建議定期檢查骨密度與眼部健康，必要時諮詢專業醫師。');
    }
    if (scores.immune < 65) {
      recs.push('建議注意免疫支持營養（例如維生素D、C、均衡飲食），並保持充足睡眠。');
    }
    if (scores.eyes !== undefined && scores.eyes < 70) {
      recs.push('眼睛乾澀或有眼疾建議就醫檢查，並採取護眼習慣（定時休息、人工淚液等）。');
    }

    // 依據特定答案再補建議（示例：若第28題有缺乏維生素D）
    const ans28 = answers.find(a => a.questionNumber === 28);
    if (ans28 && ans28.selectedOptions.some(o => o.includes('維生素D'))) {
      recs.push('您有維生素 D 缺乏的紀錄，建議檢測血液維生素 D 並在專業建議下補充。');
    }

    return recs;
  }

  private static calculatePercentile(score: number): number {
    if (score >= 85) return 95;
    if (score >= 75) return 80;
    if (score >= 65) return 65;
    if (score >= 55) return 50;
    if (score >= 45) return 35;
    return 20;
  }

  // ------------------------------
  // localStorage helpers (answers & user info)
  // ------------------------------
  static saveAnswers(answers: QuestionAnswer[]): void {
    try {
      localStorage.setItem('nutritionAnswers', JSON.stringify(answers));
    } catch (e) {
      console.warn('saveAnswers failed', e);
    }
  }

  static loadAnswers(): QuestionAnswer[] {
    try {
      const raw = localStorage.getItem('nutritionAnswers');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('loadAnswers failed', e);
      return [];
    }
  }

  static saveUserInfo(userInfo: { age?: number; weight?: number; height?: number }): void {
    try {
      localStorage.setItem('userHealthInfo', JSON.stringify(userInfo));
    } catch (e) {
      console.warn('saveUserInfo failed', e);
    }
  }

  static loadUserInfo(): { age?: number; weight?: number; height?: number } | null {
    try {
      const raw = localStorage.getItem('userHealthInfo');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('loadUserInfo failed', e);
      return null;
    }
  }

  // ------------------------------
  // selected health goals (從 HealthGoalsPage 儲存 / 讀取)
  // ------------------------------
  static saveSelectedGoals(goals: string[]): void {
    try {
      localStorage.setItem('selectedHealthGoals', JSON.stringify(goals));
    } catch (e) {
      console.warn('saveSelectedGoals failed', e);
    }
  }

  static loadSelectedGoals(): string[] {
    try {
      const raw = localStorage.getItem('selectedHealthGoals');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('loadSelectedGoals failed', e);
      return [];
    }
  }

  static clearSelectedGoals(): void {
    try {
      localStorage.removeItem('selectedHealthGoals');
    } catch (e) {
      console.warn('clearSelectedGoals failed', e);
    }
  }

  // ------------------------------
  // 清除或檢查進行中評估
  // ------------------------------
  static clearAllData(): void {
    try {
      localStorage.removeItem('nutritionAnswers');
      localStorage.removeItem('userHealthInfo');
      localStorage.removeItem('selectedHealthGoals');
    } catch (e) {
      console.warn('clearAllData failed', e);
    }
  }

  static hasOngoingAssessment(): boolean {
    const answers = this.loadAnswers();
    const info = this.loadUserInfo();
    const goals = this.loadSelectedGoals();
    return (answers && answers.length > 0) || info !== null || (goals && goals.length > 0);
  }
}