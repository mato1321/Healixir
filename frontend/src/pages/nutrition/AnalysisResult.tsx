import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, TrendingUp, Activity, User, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AnalysisResult = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 檢查用戶登入狀態
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleNext = () => {
    navigate("/nutrition/recommendations");
  };

  const analysisData = [
    { category: "飲食", score: 70, color: "from-green-400 to-green-600" },
    { category: "作息", score: 85, color: "from-green-400 to-green-600" },
    { category: "心理", score: 25, color: "from-red-400 to-red-600" },
    { category: "體質", score: 58, color: "from-yellow-400 to-yellow-600" },
    { category: "運動", score: 9, color: "from-red-400 to-red-600" }
  ];

  const overallScore = Math.round(analysisData.reduce((sum, item) => sum + item.score, 0) / analysisData.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* 頂部導航 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
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
              </Link>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">首頁</Link>
              <Link to="/member">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <User className="w-4 h-4 mr-2" />
                  會員
                </Button>
              </Link>
              
              {user ? (
                // 已登入狀態
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    歡迎，<span className="font-medium text-blue-600">{user.name || user.email}</span>
                  </span>
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    size="sm"
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    登出
                  </Button>
                </div>
              ) : (
                // 未登入狀態
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                    <LogIn className="w-4 h-4 mr-2" />
                    登入
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 標題區域 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            健康分析結果
          </h1>
          <p className="text-gray-600">基於您的問卷回答，我們為您生成了個人化的健康評估報告</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 綜合分析結果 */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex justify-between items-center">
                <span className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                  綜合分析結果
                </span>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {overallScore}分
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {analysisData.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{item.category}</span>
                    <span className="font-bold text-lg text-gray-800">{item.score}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                    <div 
                      className={`bg-gradient-to-r ${item.color} h-4 rounded-full transition-all duration-1000 shadow-sm`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-sm text-gray-500 mt-6 px-1">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </CardContent>
          </Card>

          {/* 綜合分析說明 */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-purple-600" />
                健康分析說明
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-gray-700 space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <p className="mb-2">您的綜合健康分數超過</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    59% 的同齡人
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="mb-2">您的身體質量指數為</p>
                  <p className="mb-2">
                    <span className="font-bold text-lg text-green-600">21.1 kg/m²</span>
                    <span className="text-gray-600">，屬於正常範圍</span>
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="font-medium text-orange-800 mb-2">需要改善的領域：</p>
                  <p className="text-orange-700">
                    <span className="font-semibold">心理和運動</span> 方面需要特別關注
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg shadow-inner">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-lg text-gray-800">BMI: 21.1</span>
                      <span className="ml-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        正常範圍
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 底部操作區域 */}
        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-20 py-6 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="mr-4">查看個人化建議</span>
            <ArrowRight className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;