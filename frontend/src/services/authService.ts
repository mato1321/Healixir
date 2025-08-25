// 認證服務，負責處理登入狀態檢查和Token管理
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  phone?: string;
  birth_date?: string;
  gender?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class AuthService {
  // 檢查Token是否過期
  static isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;

    try {
      // 解碼JWT token (不驗證簽名)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      console.log('🕒 Token過期檢查:', {
        currentTime: new Date(currentTime * 1000).toLocaleString(),
        expTime: new Date(payload.exp * 1000).toLocaleString(),
        isExpired: payload.exp < currentTime
      });
      
      // Token已過期
      return payload.exp < currentTime;
    } catch (error) {
      console.error('❌ Token解析失敗:', error);
      return true;
    }
  }

  // 檢查Token是否即將過期（5分鐘內）
  static isTokenExpiringSoon(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // 如果token在5分鐘內過期，返回true
      return payload.exp < (currentTime + 300);
    } catch (error) {
      console.error('❌ Token解析失敗:', error);
      return true;
    }
  }

  // 清除認證信息
  static clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('🔄 已清除認證信息');
  }

  // 檢查用戶是否已登入
  static isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user && !this.isTokenExpired());
  }

  // 獲取當前用戶信息
  static getCurrentUser(): UserInfo | null {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) return null;
      
      return JSON.parse(userData);
    } catch (error) {
      console.error('❌ 解析用戶數據失敗:', error);
      return null;
    }
  }

  // 檢查並處理過期登入
  static checkAndHandleExpiredAuth(): {
    isExpired: boolean;
    message?: string;
  } {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // 沒有認證信息
    if (!token || !user) {
      return { isExpired: false };
    }

    // Token已過期
    if (this.isTokenExpired()) {
      console.warn('⏰ 檢測到過期的登入信息');
      this.clearAuthData();
      return {
        isExpired: true,
        message: '您的登入已過期，請重新登入'
      };
    }

    // Token即將過期
    if (this.isTokenExpiringSoon()) {
      return {
        isExpired: false,
        message: '您的登入即將過期，建議重新登入以免影響使用'
      };
    }

    return { isExpired: false };
  }

  // 獲取Token剩餘有效時間（分鐘）
  static getTokenRemainingTime(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      const remainingTime = Math.max(0, payload.exp - currentTime);
      
      return Math.floor(remainingTime / 60); // 返回分鐘數
    } catch (error) {
      console.error('❌ Token解析失敗:', error);
      return null;
    }
  }
}