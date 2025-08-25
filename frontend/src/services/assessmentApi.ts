import { HealthAnalysisResult, QuestionAnswer } from './healthAnalysis';
import { AuthService } from './authService';

const API_BASE_URL = 'http://localhost:8000';

// API請求接口類型
interface AssessmentCreateRequest {
  overall_score: number;
  diet_score: number;
  lifestyle_score: number;
  mental_score: number;
  physical_score: number;
  exercise_score: number;
  age?: number;
  height?: number;
  weight?: number;
  bmi?: number;
  percentile: number;
  needs_improvement: string[];
  recommendations: string[];
  questionnaire_answers: QuestionAnswer[];
}

interface AssessmentResponse {
  id: number;
  user_id: number;
  assessment_type: string;
  created_at: string;
  overall_score: number;
  diet_score: number;
  lifestyle_score: number;
  mental_score: number;
  physical_score: number;
  exercise_score: number;
  age?: number;
  height?: number;
  weight?: number;
  bmi?: number;
  percentile: number;
  needs_improvement: string[];
  recommendations: string[];
}

interface AssessmentListItem {
  id: number;
  assessment_type: string;
  created_at: string;
  overall_score: number;
}

class AssessmentApiService {
  private static getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }


  // 保存評估結果
  static async saveAssessment(
    analysisResult: HealthAnalysisResult,
    answers: QuestionAnswer[]
  ): Promise<AssessmentResponse> {
    console.log('🚀 開始保存評估結果...');
    console.log('分析結果:', analysisResult);
    console.log('問卷答案數量:', answers.length);
    
    // 檢查認證狀態
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log('認證狀態:', { hasToken: !!token, hasUser: !!user });
    
    if (!token) {
      throw new Error('用戶未登入，無法保存評估');
    }

    // 檢查Token是否過期
    if (AuthService.isTokenExpired()) {
      console.error('⏰ Token已過期');
      AuthService.clearAuthData();
      throw new Error('登入已過期，請重新登入後再嘗試保存評估結果');
    }
    
    // 獲取用戶的身高體重信息
    const userHealthInfo = localStorage.getItem('userHealthInfo');
    let height, weight;
    
    if (userHealthInfo) {
      try {
        const parsed = JSON.parse(userHealthInfo);
        height = parsed.height;
        weight = parsed.weight;
        console.log('用戶健康信息:', { height, weight });
      } catch (error) {
        console.error('❌ 解析用戶健康信息失敗:', error);
      }
    }
    
    const requestData: AssessmentCreateRequest = {
      overall_score: analysisResult.overallScore,
      diet_score: analysisResult.scores.diet,
      lifestyle_score: analysisResult.scores.lifestyle,
      mental_score: analysisResult.scores.mental,
      physical_score: analysisResult.scores.physical,
      exercise_score: analysisResult.scores.exercise,
      age: analysisResult.age,
      height: height,
      weight: weight,
      bmi: analysisResult.bmi,
      percentile: analysisResult.percentile,
      needs_improvement: analysisResult.needsImprovement,
      recommendations: analysisResult.recommendations,
      questionnaire_answers: answers
    };

    console.log('📤 發送評估數據:', requestData);

    try {
      const response = await fetch(`${API_BASE_URL}/api/assessments/`, {
        method: 'POST',
        headers: this.getAuthHeader(),
        body: JSON.stringify(requestData),
      });

      console.log('📥 收到回應:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        console.error('❌ HTTP錯誤:', response.status, response.statusText);
        let errorMessage = '保存評估失敗';
        
        // 如果是401錯誤，清除認證信息並提示重新登入
        if (response.status === 401) {
          console.error('🔐 認證失效，清除本地認證信息');
          AuthService.clearAuthData();
          errorMessage = '登入已過期，請重新登入後再嘗試保存評估結果';
        } else {
          try {
            const errorData = await response.json();
            console.error('❌ 錯誤詳情:', errorData);
            errorMessage = errorData.detail || errorMessage;
          } catch (parseError) {
            console.error('❌ 無法解析錯誤回應:', parseError);
            const responseText = await response.text();
            console.error('❌ 原始錯誤回應:', responseText);
          }
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ 評估保存成功!', result);
      return result;
      
    } catch (networkError) {
      console.error('❌ 網絡或其他錯誤:', networkError);
      throw networkError;
    }
  }

  // 獲取用戶的評估記錄列表
  static async getAssessments(skip: number = 0, limit: number = 10): Promise<AssessmentListItem[]> {
    const response = await fetch(
      `${API_BASE_URL}/api/assessments/?skip=${skip}&limit=${limit}`,
      {
        method: 'GET',
        headers: this.getAuthHeader(),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || '獲取評估記錄失敗');
    }

    return await response.json();
  }

  // 獲取最新的評估記錄
  static async getLatestAssessment(): Promise<AssessmentResponse> {
    const response = await fetch(`${API_BASE_URL}/api/assessments/latest`, {
      method: 'GET',
      headers: this.getAuthHeader(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || '獲取最新評估失敗');
    }

    return await response.json();
  }

  // 根據ID獲取特定評估記錄
  static async getAssessmentById(assessmentId: number): Promise<AssessmentResponse> {
    const response = await fetch(`${API_BASE_URL}/api/assessments/${assessmentId}`, {
      method: 'GET',
      headers: this.getAuthHeader(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || '獲取評估記錄失敗');
    }

    return await response.json();
  }

  // 刪除評估記錄
  static async deleteAssessment(assessmentId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/assessments/${assessmentId}`, {
      method: 'DELETE',
      headers: this.getAuthHeader(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || '刪除評估記錄失敗');
    }
  }

  // 檢查用戶是否已登入
  static isUserLoggedIn(): boolean {
    return AuthService.isUserLoggedIn();
  }
}

export { AssessmentApiService, type AssessmentResponse, type AssessmentListItem };