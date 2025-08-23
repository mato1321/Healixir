import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Calendar, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    birth_date: ''  // 改為 birth_date 與後端一致
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    // 載入用戶資料
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // 從後端 API 取得最新的用戶資料 (使用一致的 auth 路由)
      const response = await fetch('http://localhost:8000/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          birth_date: userData.birth_date || ''
        });
      } else if (response.status === 401) {
        // Token 過期或無效，重定向到登入頁面
        console.log('Token expired or invalid, redirecting to login');
        localStorage.clear();
        navigate('/login');
        return;
      } else {
        // 如果 API 失敗，嘗試從 localStorage 載入
        const localUser = localStorage.getItem('user');
        if (localUser) {
          const parsedUser = JSON.parse(localUser);
          setFormData({
            name: parsedUser.name || '',
            email: parsedUser.email || '',
            phone: parsedUser.phone || '',
            birth_date: parsedUser.birth_date || ''
          });
        }
      }
    } catch (error) {
      console.error('載入用戶資料失敗:', error);
      // 嘗試從 localStorage 載入作為備案
      const localUser = localStorage.getItem('user');
      if (localUser) {
        try {
          const parsedUser = JSON.parse(localUser);
          setFormData({
            name: parsedUser.name || '',
            email: parsedUser.email || '',
            phone: parsedUser.phone || '',
            birth_date: parsedUser.birth_date || ''
          });
        } catch (parseError) {
          console.error('解析本地用戶資料失敗:', parseError);
        }
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // 取得 token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('請先登入');
      }

      // 準備要傳送的資料，只傳送有變更的欄位
      const updateData = {};
      if (formData.name.trim()) updateData.name = formData.name.trim();
      if (formData.email.trim()) updateData.email = formData.email.trim();
      if (formData.phone.trim()) updateData.phone = formData.phone.trim();
      if (formData.birth_date) updateData.birth_date = formData.birth_date;

      // 發送更新請求到後端 (使用一致的 auth 路由)
      const response = await fetch('http://localhost:8000/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token 過期或無效
          localStorage.clear();
          navigate('/login');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || '更新失敗');
      }

      const result = await response.json();
      
      // 更新 localStorage 中的用戶資料
      localStorage.setItem('user', JSON.stringify(result.user));
      
      setMessage('✅ 個人資料更新成功！');
      
      // 3秒後清除訊息
      setTimeout(() => {
        setMessage('');
      }, 3000);

    } catch (error) {
      console.error('更新資料失敗:', error);
      setMessage('❌ 更新失敗：' + error.message);
      
      // 5秒後清除錯誤訊息
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* 頂部導航 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/favicon.ico" 
                alt="Logo" 
                className="w-10 h-10 mr-3"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Healixir
                </h1>
                <p className="text-xs text-gray-500">專業保健顧問</p>
              </div>
            </Link>
            <div className="text-sm text-gray-600">
              歡迎，<span className="font-medium text-blue-600">{formData.name || '用戶'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 主要內容 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* 標題區域 */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">編輯個人資料</h2>
                <p className="text-white/80">更新您的個人信息和偏好設置</p>
              </div>
            </div>
          </div>

          {/* 表單內容 */}
          <div className="p-8">
            {/* 訊息顯示區域 */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 姓名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    姓名
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="請輸入您的姓名"
                  />
                </div>

                {/* 電子郵件 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    電子郵件
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="請輸入電子郵件"
                  />
                </div>

                {/* 電話號碼 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    電話號碼
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="請輸入電話號碼"
                  />
                </div>

                {/* 生日 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    生日
                  </label>
                  <input
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => handleInputChange('birth_date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* 按鈕區域 */}
            <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isLoading}
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    儲存中...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    儲存變更
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;