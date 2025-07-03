import React, { useState } from 'react';import { ArrowLeft, User, Mail, Phone, Calendar, Save } from 'lucide-react';

const EditProfilePage = () => {
  const [formData, setFormData] = React.useState({
    name: 'test',
    email: 'test@gmail.com',
    phone: '',
    birthday: '2025-01-01'
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [activeTab, setActiveTab] = useState('basic');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = () => {
    console.log('更新資料:', formData);
    // 這裡可以添加實際的更新邏輯
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* 頂部導航 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回會員中心
            </button>
            <div className="flex items-center">
              <img 
                src="/favicon.ico" 
                alt="Logo" 
                className="w-10 h-10 mr-3"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Healixir
                </h1>
                <p className="text-xs text-gray-500">智能保健顧問</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              歡迎，<span className="font-medium text-blue-600">test</span>
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
                    value={formData.birthday}
                    onChange={(e) => handleInputChange('birthday', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* 按鈕區域 */}
            <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                儲存變更
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;