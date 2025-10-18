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
 *
 * 注意：
 * - 分數與建議為簡化實作，您可以根據業務規則調整各題的評分邏輯與建議文字。
 */
export class HealthAnalysisService {
  /**
   * 問題類別對應（可根據題目順序調整）
   * 根據使用者提供的題目（1~38），將題號分派到不同分析面向
   */
  private static readonly QUESTION_CATEGORIES: { [key: string]: number[] } = {
    eyes: [1, 2], // 眼睛相關
    bones: [3, 4, 5, 6], // 骨關節相關
    gut: [7], // 腸胃
    immune: [8], // 免疫力（感冒次數）
    mental: [9, 10, 15], // 精神體力、情緒
    skin: [11, 12, 13], // 皮膚
    sleep: [14, 29, 30, 31, 32], // 睡眠相關（包含熬夜）
    diet: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25], // 飲食相關
    smoking: [26],
    bowel: [27],
    deficiency: [28],
    chronic: [34, 35],
    meds: [36],
    outdoor: [37],
    exercise: [38]
  };

  // ------------------------------
  // 分析主流程
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

  // ------------------------------
  // 計分流程
  // ------------------------------
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

  /**
   * 根據題號與選項回傳 0..100 的分數（越高越好）
   * 這裡的邏輯為簡化示例，請根據實際需要調整映射
   */
  private static getQuestionScore(questionNumber: number, selectedOptions: string[], category?: string): number {
    // 若沒有回答，給預設中等分數
    if (!selectedOptions || selectedOptions.length === 0) return 50;

    // 使用 switch 針對使用者提供的 1~38 題簡單評分
    switch (questionNumber) {
      // 1: (眼睛) 乾澀 是/否
      case 1:
        return selectedOptions.includes('是') ? 30 : 90;

      // 2: (眼睛) 被診斷出哪些眼部疾病（複選）
      case 2: {
        const problems = selectedOptions.length;
        if (problems === 0) return 90;
        return Math.max(90 - problems * 25, 20);
      }

      // 3: 骨質密度過低 嚴重/輕微/不清楚
      case 3:
        if (selectedOptions.includes('嚴重')) return 20;
        if (selectedOptions.includes('輕微')) return 60;
        return 50;

      // 4: 關節疼痛或腫脹 經常/偶爾/幾乎沒有
      case 4:
        if (selectedOptions.includes('經常')) return 25;
        if (selectedOptions.includes('偶爾')) return 60;
        return 90;

      // 5: 關節靈活度不足 嚴重/輕微/不曾
      case 5:
        if (selectedOptions.includes('嚴重')) return 30;
        if (selectedOptions.includes('輕微')) return 65;
        return 90;

      // 6: 運動後肌肉痠痛 是/否
      case 6:
        return selectedOptions.includes('是') ? 50 : 80;

      // 7: 腸胃問題 複選（腹瀉/脹氣/便祕/消化不良/都沒有）
      case 7: {
        if (selectedOptions.includes('都沒有')) return 90;
        const problems = selectedOptions.includes('都沒有') ? 0 : selectedOptions.length;
        return Math.max(85 - problems * 20, 25);
      }

      // 8: 平均一年感冒次數 0-1 / 2-4 / 5次以上
      case 8:
        if (selectedOptions.includes('0-1次')) return 90;
        if (selectedOptions.includes('2-4次')) return 65;
        return 30;

      // 9: 精神體力需要加強 是/否
      case 9:
        return selectedOptions.includes('是') ? 35 : 85;

      // 10: 因 B 群 味道噁心 是/否
      case 10:
        return selectedOptions.includes('是') ? 40 : 85;

      // 11: 皮膚缺乏水份與彈性 是/否
      case 11:
        return selectedOptions.includes('是') ? 40 : 85;

      // 12: 皮膚容易長痘 是/否
      case 12:
        return selectedOptions.includes('是') ? 45 : 85;

      // 13: 美白需求 是/否（偏主觀，若有需求分數低代表有改善空間）
      case 13:
        return selectedOptions.includes('是') ? 65 : 85;

      // 14: 需要幫助入睡頻率 幾乎不用 / 一週1-3次 / 幾乎天天難以入睡
      case 14:
        if (selectedOptions.includes('幾乎不用')) return 90;
        if (selectedOptions.includes('一週1-3次')) return 60;
        return 25;

      // 15: 最近情緒 焦慮 / 壓力大 / 低落 / 正常
      case 15:
        if (selectedOptions.includes('正常')) return 90;
        if (selectedOptions.includes('壓力大')) return 60;
        return selectedOptions.includes('低落') || selectedOptions.includes('焦慮') ? 35 : 60;

      // 16: 飲食習慣 素食/葷食（簡單給分：均衡為佳，葷食或素食需看細節）
      case 16:
        // 假設葷食或素食都非直接不好，給中上分
        return 75;

      // 17: 日常飲食來源 餐廳 / 方便食品 / 自己煮
      case 17:
        if (selectedOptions.includes('自己煮')) return 90;
        if (selectedOptions.includes('餐廳')) return 70;
        return 40; // 方便食品

      // 18: 蔬菜攝取 0-2 / 3-5 / 5份以上
      case 18:
        if (selectedOptions.includes('5份以上')) return 90;
        if (selectedOptions.includes('3-5份')) return 70;
        return 35;

      // 19: 水果攝取 0-2 / 2-4 / 4份以上
      case 19:
        if (selectedOptions.includes('4份以上')) return 90;
        if (selectedOptions.includes('2-4份')) return 70;
        return 35;

      // 20: 豆蛋魚肉類 少於1 / 1-2 / 3份以上
      case 20:
        if (selectedOptions.includes('3份以上')) return 90;
        if (selectedOptions.includes('1-2份')) return 70;
        return 35;

      // 21: 奶製品攝取 少於1杯 / 1-2杯 / 2杯以上
      case 21:
        if (selectedOptions.includes('2杯以上')) return 85;
        if (selectedOptions.includes('1-2杯')) return 70;
        return 40;

      // 22: 五穀雜糧 0-2 / 2-4 / 4碗以上
      case 22:
        if (selectedOptions.includes('2-4碗')) return 75;
        if (selectedOptions.includes('4碗以上')) return 90;
        return 45;

      // 23: 水分攝取 少於1瓶 / 1-2瓶 / 3瓶以上
      case 23:
        if (selectedOptions.includes('3瓶以上')) return 90;
        if (selectedOptions.includes('1-2瓶')) return 70;
        return 40;

      // 24: 飲酒頻率 每週0-1 / 2-8 / 9+
      case 24:
        if (selectedOptions.includes('每週0-1份')) return 90;
        if (selectedOptions.includes('每週2-8份')) return 65;
        return 30;

      // 25: 飲酒隔天不適 經常 / 偶爾 / 從來不會 / 很少飲酒不清楚
      case 25:
        if (selectedOptions.includes('從來不會')) return 90;
        if (selectedOptions.includes('偶爾')) return 65;
        if (selectedOptions.includes('經常')) return 30;
        return 50;

      // 26: 抽菸頻率（頻率越高分數越低）
      case 26:
        if (selectedOptions.includes('幾乎不抽菸')) return 90;
        if (selectedOptions.includes('一週1-2包')) return 60;
        if (selectedOptions.includes('每天半包')) return 40;
        return 20;

      // 27: 排便頻率（一天一次為標準）
      case 27:
        if (selectedOptions.includes('一天一次')) return 90;
        if (selectedOptions.includes('一天三次以上')) return 75;
        if (selectedOptions.includes('兩天一次')) return 50;
        return 30;

      // 28: 半年內被診斷缺乏養分 複選（鐵/鈣/維生素B/C/D/都沒有）
      case 28:
        if (selectedOptions.includes('都沒有')) return 90;
        const defs = selectedOptions.includes('都沒有') ? 0 : selectedOptions.length;
        return Math.max(85 - defs * 20, 20);

      // 29: 平均多久睡著 30分鐘以內 / 30分鐘以上
      case 29:
        return selectedOptions.includes('30分鐘以內') ? 90 : 40;

      // 30: 睡眠品質 能一覺到天亮 / 睡睡醒醒 / 提早甦醒
      case 30:
        if (selectedOptions.includes('能一覺到天亮')) return 90;
        if (selectedOptions.includes('睡睡醒醒')) return 50;
        return 40;

      // 31: 多夢 經常 / 偶爾 / 很少
      case 31:
        if (selectedOptions.includes('很少')) return 90;
        if (selectedOptions.includes('偶爾')) return 65;
        return 35;

      // 32: 是否經常熬夜 是/否
      case 32:
        return selectedOptions.includes('是') ? 30 : 85;

      // 33: 久坐/同姿勢/提重物 是/否
      case 33:
        return selectedOptions.includes('是') ? 40 : 85;

      // 34: 高血壓/高血脂/高血糖/心臟/腎臟/肝臟/都沒有 複選
      case 34:
        if (selectedOptions.includes('都沒有')) return 90;
        return Math.max(80 - selectedOptions.length * 15, 20);

      // 35: 痛風/貧血/氣喘/子宮卵巢/乳房/紅斑性狼瘡/乳糖不耐症/都沒有 複選
      case 35:
        if (selectedOptions.includes('都沒有')) return 90;
        return Math.max(80 - selectedOptions.length * 12, 20);

      // 36: 規律服用藥物 抗凝血/降血脂/激素/抗生素/消炎止痛/都沒有
      case 36:
        if (selectedOptions.includes('都沒有')) return 90;
        // 使用藥物會影響建議風險評估
        return Math.max(70 - (selectedOptions.length - 1) * 10, 30);

      // 37: 每日待在戶外時長 少於15 / 15-60 / 1小時以上
      case 37:
        if (selectedOptions.includes('1小時以上')) return 90;
        if (selectedOptions.includes('15-60分鐘')) return 70;
        return 40;

      // 38: 每週運動頻率 幾乎不運動 / 1-2次 / 3次以上
      case 38:
        if (selectedOptions.includes('3次以上')) return 90;
        if (selectedOptions.includes('1-2次')) return 65;
        return 30;

      default:
        // 若未特別處理，回傳中間分數
        return 50;
    }
  }

  // ------------------------------
  // 改善建議與風險判斷
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