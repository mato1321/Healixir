import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Star, CheckCircle, Heart, User, LogOut, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { HealthAnalysisService, HealthAnalysisResult } from "@/services/healthAnalysis";

const ProductRecommendation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<HealthAnalysisResult | null>(null);

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

    // 分析問卷答案
    const answers = HealthAnalysisService.loadAnswers();
    const userInfo = HealthAnalysisService.loadUserInfo();
    
    if (answers.length > 0) {
      const result = HealthAnalysisService.analyzeAnswers(answers, userInfo || undefined);
      setAnalysisResult(result);
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

  const generateRecommendedProducts = () => {
    if (!analysisResult) return [];

    const products: any[] = [];
    const { scores, needsImprovement } = analysisResult;

    // 基於分析結果推薦產品
    if (scores.mental < 60 || needsImprovement.includes('心理')) {
      products.push({
        id: 1,
        name: "優質綜合維生素B群",
        description: "根據您的精神狀態評估，特別推薦此B群配方來改善疲勞和提升精神狀態",
        price: 699,
        originalPrice: 899,
        rating: 4.8,
        reviews: 234,
        image: "/placeholder.svg",
        category: "維生素",
        matchScore: Math.min(95, 100 - scores.mental + 20),
        reasons: ["改善疲勞", "提升精神狀態", "支持神經系統健康"]
      });
    }

    if (scores.physical < 60 || scores.diet < 60) {
      products.push({
        id: 2,
        name: "高濃度魚油Omega-3",
        description: "針對您的身體狀況和營養需求，推薦此深海魚油來支持整體健康",
        price: 1299,
        originalPrice: 1599,
        rating: 4.9,
        reviews: 189,
        image: "/placeholder.svg",
        category: "魚油",
        matchScore: Math.min(90, 100 - Math.min(scores.physical, scores.diet) + 15),
        reasons: ["心血管保健", "抗炎作用", "支持腦部健康"]
      });
    }

    if (scores.exercise < 40 || scores.physical < 50) {
      products.push({
        id: 3,
        name: "運動能量補充劑",
        description: "考量您的運動習慣和體能狀況，建議此能量補充劑來提升運動表現",
        price: 899,
        originalPrice: 1199,
        rating: 4.6,
        reviews: 156,
        image: "/placeholder.svg",
        category: "運動營養",
        matchScore: Math.min(85, 100 - scores.exercise + 10),
        reasons: ["提升運動表現", "增強體力", "促進恢復"]
      });
    }

    if (scores.lifestyle < 60 || needsImprovement.includes('作息')) {
      products.push({
        id: 4,
        name: "天然褪黑激素",
        description: "根據您的作息狀況，推薦此天然褪黑激素來改善睡眠品質",
        price: 599,
        originalPrice: 799,
        rating: 4.7,
        reviews: 203,
        image: "/placeholder.svg",
        category: "睡眠保健",
        matchScore: Math.min(88, 100 - scores.lifestyle + 18),
        reasons: ["改善睡眠品質", "調節生理時鐘", "天然安全"]
      });
    }

    // 總是推薦綜合維生素作為基礎營養
    if (!products.some(p => p.category === "維生素")) {
      products.push({
        id: 5,
        name: "每日綜合維生素",
        description: "基礎營養補充，適合所有人的日常保健需求",
        price: 799,
        originalPrice: 999,
        rating: 4.5,
        reviews: 312,
        image: "/placeholder.svg",
        category: "維生素",
        matchScore: 75,
        reasons: ["全面營養補充", "提升免疫力", "日常保健基礎"]
      });
    }

    return products.slice(0, 3); // 最多推薦3個產品
  };

  const recommendedProducts = generateRecommendedProducts();

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "優秀";
    if (score >= 60) return "良好";
    if (score >= 40) return "普通";
    return "需改善";
  };

  const healthAnalysis = analysisResult ? {
    overallScore: analysisResult.overallScore,
    categories: [
      { name: "飲食", score: analysisResult.scores.diet, status: getScoreStatus(analysisResult.scores.diet) },
      { name: "作息", score: analysisResult.scores.lifestyle, status: getScoreStatus(analysisResult.scores.lifestyle) },
      { name: "心理", score: analysisResult.scores.mental, status: getScoreStatus(analysisResult.scores.mental) },
      { name: "體質", score: analysisResult.scores.physical, status: getScoreStatus(analysisResult.scores.physical) },
      { name: "運動", score: analysisResult.scores.exercise, status: getScoreStatus(analysisResult.scores.exercise) }
    ]
  } : {
    overallScore: 60,
    categories: [
      { name: "飲食", score: 70, status: "良好" },
      { name: "作息", score: 85, status: "優秀" },
      { name: "心理", score: 25, status: "需改善" },
      { name: "體質", score: 58, status: "普通" },
      { name: "運動", score: 9, status: "需改善" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
                  <p className="text-xs text-gray-500">專業保健顧問</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 標題區域 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            為您量身推薦的保健食品
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            根據您的健康評估結果，我們為您精選了最適合的營養補充方案
          </p>
        </div>

        {/* 健康評估摘要 */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-6 h-6 text-blue-600 mr-2" />
              您的健康評估摘要
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {healthAnalysis.categories.map((category, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{category.score}</div>
                  <div className="text-sm text-gray-600">{category.name}</div>
                  <div className={`text-xs font-medium ${
                    category.score >= 80 ? 'text-green-600' :
                    category.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {category.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 推薦產品 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">專為您推薦</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product, index) => (
              <Card key={product.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.matchScore}% 匹配
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-600">
                  推薦 #{index + 1}
                </div>
                
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews}則評論)
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">為什麼推薦給您：</h4>
                    <div className="space-y-1">
                      {product.reasons.map((reason, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <Heart className="w-3 h-3 text-red-400 mr-2 flex-shrink-0" />
                          {reason}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        NT${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        NT${product.originalPrice}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    加入購物車
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 底部行動呼籲 */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">開始您的健康之旅</h3>
              <p className="text-blue-100 mb-6">
                這些推薦是根據您的個人健康狀況量身定制的，開始使用這些產品，邁向更健康的生活！
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                    查看更多產品
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button className="bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                    查看購物車
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProductRecommendation;