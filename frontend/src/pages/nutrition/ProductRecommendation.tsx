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
    // 頁面載入時滾動到頂部
    window.scrollTo(0, 0);
    
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

    // 核心推薦產品 - 基於分析結果
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
        category: "維生素B",
        matchScore: Math.min(95, 100 - scores.mental + 20),
        reasons: ["改善疲勞", "提升精神狀態", "支持神經系統健康"],
        priority: "核心推薦"
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
        category: "魚油/Omega-3",
        matchScore: Math.min(90, 100 - Math.min(scores.physical, scores.diet) + 15),
        reasons: ["心血管保健", "抗炎作用", "支持腦部健康"],
        priority: "核心推薦"
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
        category: "體力/精力保健",
        matchScore: Math.min(85, 100 - scores.exercise + 10),
        reasons: ["提升運動表現", "增強體力", "促進恢復"],
        priority: "核心推薦"
      });
    }

    // 輔助推薦產品
    products.push(
      {
        id: 4,
        name: "天然褪黑激素",
        description: "改善睡眠品質，調節生理時鐘的天然選擇",
        price: 599,
        originalPrice: 799,
        rating: 4.7,
        reviews: 203,
        image: "/placeholder.svg",
        category: "睡眠保健",
        matchScore: Math.max(70, Math.min(88, 100 - scores.lifestyle + 18)),
        reasons: ["改善睡眠品質", "調節生理時鐘", "天然安全"],
        priority: "輔助推薦"
      },
      {
        id: 5,
        name: "每日綜合維生素",
        description: "全方位營養補充，提供身體所需的基礎維生素礦物質",
        price: 799,
        originalPrice: 999,
        rating: 4.5,
        reviews: 312,
        image: "/placeholder.svg",
        category: "維生素",
        matchScore: 75,
        reasons: ["全面營養補充", "提升免疫力", "日常保健基礎"],
        priority: "基礎推薦"
      },
      {
        id: 6,
        name: "高濃度維生素C",
        description: "強化免疫系統，抗氧化保護，支持膠原蛋白合成",
        price: 450,
        originalPrice: 590,
        rating: 4.6,
        reviews: 278,
        image: "/placeholder.svg",
        category: "維生素C",
        matchScore: 78,
        reasons: ["增強免疫力", "抗氧化保護", "美容養顏"],
        priority: "基礎推薦"
      },
      {
        id: 7,
        name: "益生菌複合配方",
        description: "維護腸道健康，促進消化吸收，提升整體免疫力",
        price: 890,
        originalPrice: 1180,
        rating: 4.4,
        reviews: 165,
        image: "/placeholder.svg",
        category: "益生菌",
        matchScore: Math.max(65, Math.min(82, 100 - scores.diet + 10)),
        reasons: ["改善腸道健康", "促進消化", "增強免疫"],
        priority: "輔助推薦"
      },
      {
        id: 8,
        name: "膠原蛋白胜肽",
        description: "補充優質膠原蛋白，維持肌膚彈性與關節健康",
        price: 1280,
        originalPrice: 1680,
        rating: 4.3,
        reviews: 198,
        image: "/placeholder.svg",
        category: "膠原蛋白/美容保健",
        matchScore: 72,
        reasons: ["美容養顏", "關節保健", "抗老化"],
        priority: "輔助推薦"
      },
      {
        id: 9,
        name: "葉黃素護眼配方",
        description: "保護眼部健康，預防藍光傷害，適合長時間用眼族群",
        price: 680,
        originalPrice: 880,
        rating: 4.7,
        reviews: 224,
        image: "/placeholder.svg",
        category: "眼部保健",
        matchScore: 73,
        reasons: ["護眼抗藍光", "預防眼疲勞", "維護視力"],
        priority: "基礎推薦"
      }
    );

    return products.sort((a, b) => b.matchScore - a.matchScore);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100">
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
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
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

        {/* 健康評估摘要 */}
        <Card className="mb-12 bg-gradient-to-br from-white/95 to-blue-50/80 backdrop-blur-sm border-2 border-blue-200/30 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center text-2xl">
              <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                您的健康評估摘要
              </span>
            </CardTitle>
            <p className="text-gray-600 mt-2">基於您的問卷回答，以下是各維度的健康評分</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {healthAnalysis.categories.map((category, index) => (
                <div key={index} className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50 hover:bg-blue-50/50 transition-all duration-300">
                  <div className={`text-3xl font-bold mb-2 ${
                    category.score >= 80 ? 'text-green-600' :
                    category.score >= 60 ? 'text-blue-600' : 
                    category.score >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {category.score}
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">{category.name}</div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                    category.score >= 80 ? 'bg-green-100 text-green-700' :
                    category.score >= 60 ? 'bg-blue-100 text-blue-700' : 
                    category.score >= 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {category.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 核心推薦區 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              核心推薦
            </h3>
            <p className="text-gray-600">根據您的健康評估結果，這些是最適合您的保健品</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedProducts.filter(p => p.priority === '核心推薦').map((product, index) => (
              <Card key={product.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300 relative">
                
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-gray-800">{product.name}</CardTitle>
                  <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">
                      {product.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-blue-600">
                        NT${product.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        NT${product.originalPrice}
                      </span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xs">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    加入購物車
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 輔助推薦區 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              輔助保健推薦
            </h3>
            <p className="text-gray-600">這些產品能進一步提升您的健康狀況</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedProducts.filter(p => p.priority === '輔助推薦').map((product, index) => (
              <Card key={product.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300 relative">
                
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-gray-800">{product.name}</CardTitle>
                  <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">
                      {product.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-blue-600">
                        NT${product.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        NT${product.originalPrice}
                      </span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xs">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    加入購物車
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 基礎保健推薦 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              基礎保健推薦
            </h3>
            <p className="text-gray-600">日常保健的基礎選擇，適合所有人</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedProducts.filter(p => p.priority === '基礎推薦').map((product, index) => (
              <Card key={product.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300 relative">
                
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-gray-800">{product.name}</CardTitle>
                  <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">
                      {product.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-blue-600">
                        NT${product.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        NT${product.originalPrice}
                      </span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xs">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    加入購物車
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 底部行動呼籲 */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">開始您的健康之旅</h3>
              <p className="text-blue-100 mb-6">
                這些推薦是根據您的個人健康狀況量身定制的，開始使用這些產品，邁向更健康的生活！
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shopDetail">
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