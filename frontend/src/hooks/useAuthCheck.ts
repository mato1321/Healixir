import { useEffect, useState } from 'react';
import { AuthService, UserInfo } from '@/services/authService';
import { useToast } from '@/components/ui/use-toast';

interface AuthState {
  isLoggedIn: boolean;
  user: UserInfo | null;
  isCheckingAuth: boolean;
}

export const useAuthCheck = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    isCheckingAuth: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    console.log('🔍 執行全局認證檢查...');
    
    const checkAuth = () => {
      const authCheck = AuthService.checkAndHandleExpiredAuth();
      const user = AuthService.getCurrentUser();
      const isLoggedIn = AuthService.isUserLoggedIn();

      // 如果有認證過期或即將過期的消息，顯示通知
      if (authCheck.message) {
        const variant = authCheck.isExpired ? 'destructive' : 'default';
        const title = authCheck.isExpired ? '登入已過期' : '登入即將過期';
        
        toast({
          title,
          description: authCheck.message,
          variant,
          duration: authCheck.isExpired ? 8000 : 5000, // 過期消息顯示更久
        });

        console.log(authCheck.isExpired ? '🚨 登入已過期' : '⚠️ 登入即將過期');
      }

      // 如果用戶已登入，顯示剩餘時間信息
      if (isLoggedIn && user) {
        const remainingTime = AuthService.getTokenRemainingTime();
        if (remainingTime !== null) {
          console.log(`👤 用戶 ${user.name} 已登入，Token剩餘 ${remainingTime} 分鐘`);
        }
      }

      setAuthState({
        isLoggedIn,
        user,
        isCheckingAuth: false,
      });
    };

    // 立即檢查
    checkAuth();

    // 每5分鐘檢查一次認證狀態
    const interval = setInterval(() => {
      console.log('🔄 定期檢查認證狀態...');
      checkAuth();
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [toast]);

  // 提供手動重新檢查認證的方法
  const recheckAuth = () => {
    console.log('🔍 手動重新檢查認證...');
    const authCheck = AuthService.checkAndHandleExpiredAuth();
    const user = AuthService.getCurrentUser();
    const isLoggedIn = AuthService.isUserLoggedIn();

    setAuthState({
      isLoggedIn,
      user,
      isCheckingAuth: false,
    });

    return { isLoggedIn, user };
  };

  // 登出方法
  const logout = () => {
    console.log('👋 用戶登出');
    AuthService.clearAuthData();
    setAuthState({
      isLoggedIn: false,
      user: null,
      isCheckingAuth: false,
    });
    
    toast({
      title: "已登出",
      description: "您已成功登出系統",
    });
  };

  return {
    ...authState,
    recheckAuth,
    logout,
  };
};