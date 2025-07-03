import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle,
  Brain,
  Pill,
  ShoppingCart,
  Sparkles,
  Users,
  Shield,
  User,
  LogOut,
  Star,
  LogIn,
  Heart,
  Activity,
  Award,
  Zap,
  Target
} from "lucide-react";
import ChatButton from "@/components/ChatButton";
import FloatingCartButton from "@/components/FloatingCartButton";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 檢查用戶登入狀態
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('Token:', token);
    console.log('User data:', userData);
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Parsed user:', parsedUser);
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

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* 頂部導航 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
            
            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">首頁</Link>
              <Link to="/shopDetail">
                <Button variant="ghost" size="sm" className="hover:bg-green-50">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  商品
                </Button>
              </Link>
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

      {/* 主要內容 */}
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="max-w-6xl mx-auto text-center px-4 relative">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                為你的健康量身推薦
              </span>
              <br />
              <span className="text-gray-800">保健食品</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              只需 3 分鐘，完成健康問卷，獲得專屬營養建議
            </p>
            
            <div className="flex flex-col items-center mb-8">
              <Link to="/nutrition/personal-info" className="mb-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-32 py-12 text-3xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                  <Star className="w-12 h-12 mr-6" fill="currentColor" />
                  立即免費評估
                </Button>
              </Link>
              <div className="text-lg text-gray-500 flex items-center space-x-6">
                <span>⏱️ 僅需 3 分鐘</span>
                <span>💊 個人化推薦</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">10,000+</div>
                <div className="text-sm text-gray-600">成功推薦</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">滿意度</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">48</div>
                <div className="text-sm text-gray-600">評估維度</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">3min</div>
                <div className="text-sm text-gray-600">快速評估</div>
              </div>
            </div>
          </div>
        </section>

        {/* 四步驟流程 */}
        <section className="py-20 bg-white/50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                簡單四步驟，找到最適合的保健方案
              </h2>
              <p className="text-lg text-gray-600">科學化的評估流程，為您提供最精準的健康建議</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group">
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl">填寫健康問卷</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    3分鐘快速問卷，了解您的健康狀況
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group">
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl">AI 分析生活狀況</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    智能分析您的身體與生活習慣
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group">
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Pill className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl">推薦專屬保健食品</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    獲得個人化的營養補充建議
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group">
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ShoppingCart className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl">線上選購或藥局諮詢</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    方便購買或至合作藥局專業諮詢
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 核心優勢 */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                為什麼選擇我們的健康評估？
              </h2>
              <p className="text-lg text-gray-600">領先的技術與專業的團隊，為您的健康保駕護航</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">AI 精準分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    運用先進人工智慧技術，精準分析您的健康需求
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">與實體藥局合作</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    與專業藥師合作，提供最可靠的健康建議
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">快速且隱私保護</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    快速完成評估，嚴格保護您的個人隱私資料
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 用戶見證 */}
        <section className="py-20 bg-white/50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                用戶真實回饋
              </h2>
              <p className="text-lg text-gray-600">看看其他用戶如何透過 Healixir 改善健康狀況</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-2xl">👩</span>
                    </div>
                    <div>
                      <h4 className="font-medium">李小姐</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "問卷很簡單，推薦的保健食品真的很適合我的需求！"
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-2xl">👨</span>
                    </div>
                    <div>
                      <h4 className="font-medium">陳先生</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "3分鐘就完成評估，獲得了很實用的營養建議。"
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-2xl">🧓</span>
                    </div>
                    <div>
                      <h4 className="font-medium">王太太</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "AI分析很準確，藥師的專業建議讓我很放心。"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-4xl mx-auto text-center px-4 relative">
            <div className="mb-8">
              <Activity className="w-16 h-16 mx-auto mb-4 text-white/80" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              開始您的健康之旅
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              立即進行免費評估，讓 AI 為您推薦最適合的保健方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/nutrition/personal-info">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-24 py-6 text-2xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                  <Award className="w-8 h-8 mr-4" />
                  立即免費評估
                </Button>
              </Link>
              <div className="text-white/80 text-sm">
                ✨ 完全免費 • 🚀 即時結果 • 🎯 個人專屬
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 聊天按鈕 */}
      <ChatButton />
      
      {/* 購物車按鈕 */}
      <FloatingCartButton />
    </div>
  );
};

export default Dashboard;