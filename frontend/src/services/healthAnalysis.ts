export interface QuestionAnswer {
  questionNumber: number;
  selectedOptions: string[];
  question: string;
}

export interface HealthScores {
  diet: number;      // 飲食
  lifestyle: number; // 作息  
  mental: number;    // 心理
  physical: number;  // 體質
  exercise: number;  // 運動
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

export class HealthAnalysisService {
  private static readonly QUESTION_CATEGORIES = {
    // 眼部健康和3C使用 (Q1-Q10) - 影響身體素質
    eyes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    
    // 睡眠和作息 (Q11-Q20) - 影響作息分數
    sleep: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    
    // 飲食習慣 (Q21-Q30) - 影響飲食分數  
    diet: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    
    // 運動和體能 (Q31-Q38) - 影響運動分數
    exercise: [31, 32, 33, 34, 35, 36, 37, 38],
    
    // 心理和壓力 (Q39-Q48) - 影響心理分數
    mental: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
  };

  static analyzeAnswers(answers: QuestionAnswer[], userInfo?: { age: number, weight: number, height: number }): HealthAnalysisResult {
    const scores = this.calculateScores(answers);
    const overallScore = Math.round((scores.diet + scores.lifestyle + scores.mental + scores.physical + scores.exercise) / 5);
    
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

  private static calculateScores(answers: QuestionAnswer[]): HealthScores {
    const eyesScore = this.calculateCategoryScore(answers, this.QUESTION_CATEGORIES.eyes, 'eyes');
    const sleepScore = this.calculateCategoryScore(answers, this.QUESTION_CATEGORIES.sleep, 'sleep');
    const dietScore = this.calculateCategoryScore(answers, this.QUESTION_CATEGORIES.diet, 'diet');
    const exerciseScore = this.calculateCategoryScore(answers, this.QUESTION_CATEGORIES.exercise, 'exercise');
    const mentalScore = this.calculateCategoryScore(answers, this.QUESTION_CATEGORIES.mental, 'mental');

    return {
      diet: dietScore,
      lifestyle: sleepScore,
      mental: mentalScore,
      physical: Math.round((eyesScore * 0.7 + dietScore * 0.3)), // 身體素質綜合眼部健康和部分飲食
      exercise: exerciseScore
    };
  }

  private static calculateCategoryScore(answers: QuestionAnswer[], questionNumbers: number[], category: string): number {
    const categoryAnswers = answers.filter(answer => questionNumbers.includes(answer.questionNumber));
    
    if (categoryAnswers.length === 0) return 50; // 預設分數
    
    let totalScore = 0;
    let answeredQuestions = 0;

    categoryAnswers.forEach(answer => {
      const questionScore = this.getQuestionScore(answer, category);
      totalScore += questionScore;
      answeredQuestions++;
    });

    return answeredQuestions > 0 ? Math.round(totalScore / answeredQuestions) : 50;
  }

  private static getQuestionScore(answer: QuestionAnswer, category: string): number {
    const { questionNumber, selectedOptions } = answer;
    
    // 根據不同問題和類別給予不同分數
    switch (category) {
      case 'eyes':
        return this.getEyesScore(questionNumber, selectedOptions);
      case 'sleep':
        return this.getSleepScore(questionNumber, selectedOptions);
      case 'diet':
        return this.getDietScore(questionNumber, selectedOptions);
      case 'exercise':
        return this.getExerciseScore(questionNumber, selectedOptions);
      case 'mental':
        return this.getMentalScore(questionNumber, selectedOptions);
      default:
        return 50;
    }
  }

  private static getEyesScore(questionNumber: number, selectedOptions: string[]): number {
    switch (questionNumber) {
      case 1: // 3C使用頻率
        if (selectedOptions.includes("少於3小時")) return 90;
        if (selectedOptions.includes("4-6小時")) return 60;
        if (selectedOptions.includes("7+小時")) return 30;
        break;
      case 2: // 眼部問題
        const eyeProblems = selectedOptions.length;
        if (eyeProblems === 0) return 85; // 沒有問題
        return Math.max(90 - eyeProblems * 20, 20);
      case 3: // 眼部保健習慣
        if (selectedOptions.includes("定期休息") || selectedOptions.includes("使用護眼產品")) return 85;
        if (selectedOptions.includes("偶爾注意")) return 60;
        return 35;
      case 4: // 視力狀況
        if (selectedOptions.includes("視力良好")) return 90;
        if (selectedOptions.includes("輕微近視") || selectedOptions.includes("輕微遠視")) return 70;
        return 50;
      // 其他眼部相關問題的基本評分
      default:
        return selectedOptions.length > 0 ? 60 : 50;
    }
    return 50;
  }

  private static getSleepScore(questionNumber: number, selectedOptions: string[]): number {
    switch (questionNumber) {
      case 11: // 睡眠時間
        if (selectedOptions.includes("7-9小時") || selectedOptions.includes("7-8小時")) return 90;
        if (selectedOptions.includes("6-7小時") || selectedOptions.includes("8-9小時")) return 75;
        if (selectedOptions.includes("5-6小時") || selectedOptions.includes("9-10小時")) return 50;
        return 30;
      case 12: // 入睡時間
        if (selectedOptions.includes("21:00-22:00") || selectedOptions.includes("22:00-23:00")) return 85;
        if (selectedOptions.includes("23:00-24:00")) return 65;
        return 40;
      case 13: // 睡眠品質
        if (selectedOptions.includes("很好") || selectedOptions.includes("良好")) return 90;
        if (selectedOptions.includes("普通") || selectedOptions.includes("尚可")) return 60;
        return 30;
      case 14: // 夜間醒來頻率
        if (selectedOptions.includes("很少") || selectedOptions.includes("不會")) return 85;
        if (selectedOptions.includes("偶爾") || selectedOptions.includes("1-2次")) return 60;
        return 35;
      // 其他作息相關問題
      default:
        // 根據選項內容進行基本評分
        const positiveKeywords = ["規律", "良好", "充足", "早睡", "按時"];
        const negativeKeywords = ["不規律", "熬夜", "失眠", "疲勞", "晚睡"];
        
        const hasPositive = selectedOptions.some(opt => 
          positiveKeywords.some(keyword => opt.includes(keyword))
        );
        const hasNegative = selectedOptions.some(opt => 
          negativeKeywords.some(keyword => opt.includes(keyword))
        );
        
        if (hasPositive && !hasNegative) return 75;
        if (hasNegative) return 35;
        return 55;
    }
    return 50;
  }

  private static getDietScore(questionNumber: number, selectedOptions: string[]): number {
    switch (questionNumber) {
      case 21: // 假設這是飲食習慣相關
        if (selectedOptions.includes("均衡飲食")) return 90;
        if (selectedOptions.includes("偶爾不規律")) return 60;
        if (selectedOptions.includes("經常外食")) return 40;
        break;
      // 其他飲食相關問題...
    }
    return 50;
  }

  private static getExerciseScore(questionNumber: number, selectedOptions: string[]): number {
    switch (questionNumber) {
      case 31: // 假設這是運動頻率
        if (selectedOptions.includes("每天")) return 95;
        if (selectedOptions.includes("每週3-4次")) return 80;
        if (selectedOptions.includes("每週1-2次")) return 50;
        if (selectedOptions.includes("很少運動")) return 20;
        break;
      // 其他運動相關問題...
    }
    return 50;
  }

  private static getMentalScore(questionNumber: number, selectedOptions: string[]): number {
    switch (questionNumber) {
      case 48: // 最希望改善的問題
        const mentalIssues = selectedOptions.filter(opt => 
          opt.includes("睡眠") || opt.includes("精神") || opt.includes("壓力")
        ).length;
        return Math.max(80 - mentalIssues * 15, 20);
      // 其他心理相關問題...
    }
    return 50;
  }

  private static identifyImprovementAreas(scores: HealthScores): string[] {
    const areas: string[] = [];
    
    if (scores.exercise < 40) areas.push("運動");
    if (scores.mental < 40) areas.push("心理");
    if (scores.diet < 50) areas.push("飲食");
    if (scores.lifestyle < 50) areas.push("作息");
    if (scores.physical < 50) areas.push("體質");
    
    return areas;
  }

  private static generateRecommendations(scores: HealthScores, answers: QuestionAnswer[]): string[] {
    const recommendations: string[] = [];
    
    if (scores.diet < 70) {
      recommendations.push("建議增加蔬果攝取，減少加工食品");
    }
    
    if (scores.exercise < 40) {
      recommendations.push("建議每週至少進行150分鐘中等強度運動");
    }
    
    if (scores.mental < 50) {
      recommendations.push("建議練習放鬆技巧，如冥想或深呼吸");
    }
    
    if (scores.lifestyle < 60) {
      recommendations.push("建議保持規律作息，每晚7-9小時睡眠");
    }
    
    if (scores.physical < 60) {
      recommendations.push("建議定期檢查身體狀況，補充必要營養素");
    }
    
    return recommendations;
  }

  private static calculatePercentile(score: number): number {
    // 簡化的百分位計算
    if (score >= 80) return 90;
    if (score >= 70) return 75;
    if (score >= 60) return 60;
    if (score >= 50) return 45;
    if (score >= 40) return 30;
    return 20;
  }

  // 儲存答案到 localStorage
  static saveAnswers(answers: QuestionAnswer[]): void {
    localStorage.setItem('nutritionAnswers', JSON.stringify(answers));
  }

  // 從 localStorage 讀取答案
  static loadAnswers(): QuestionAnswer[] {
    const saved = localStorage.getItem('nutritionAnswers');
    return saved ? JSON.parse(saved) : [];
  }

  // 儲存用戶信息
  static saveUserInfo(userInfo: { age: number, weight: number, height: number }): void {
    localStorage.setItem('userHealthInfo', JSON.stringify(userInfo));
  }

  // 讀取用戶信息
  static loadUserInfo(): { age: number, weight: number, height: number } | null {
    const saved = localStorage.getItem('userHealthInfo');
    return saved ? JSON.parse(saved) : null;
  }

  // 清除所有評估數據（開始新評估時使用）
  static clearAllData(): void {
    localStorage.removeItem('nutritionAnswers');
    localStorage.removeItem('userHealthInfo');
  }

  // 檢查是否有進行中的評估
  static hasOngoingAssessment(): boolean {
    const answers = this.loadAnswers();
    const userInfo = this.loadUserInfo();
    return answers.length > 0 || userInfo !== null;
  }
}