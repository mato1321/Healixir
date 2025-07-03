import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Shield, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  User,
  LogOut,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('商品介紹');
  const reviewsRef = React.useRef<HTMLDivElement>(null);

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

  const productImages = [
    '/api/placeholder/400/400',
    '/api/placeholder/400/400', 
    '/api/placeholder/400/400',
    '/api/placeholder/400/400'
  ];

  const tabs = ['商品介紹', '成分與營養標示', '顧客評論'];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const scrollToReviews = () => {
    setActiveTab('顧客評論');
    setTimeout(() => {
      reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
            
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">首頁</Link>
              <Link to="/shopDetail">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
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

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">首頁</Link>
            <span className="text-gray-400">/</span>
            <Link to="/shopDetail" className="text-gray-500 hover:text-blue-600">商品</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">威德益生菌膠囊</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden aspect-square shadow-lg">
              <img 
                src={productImages[currentImage]} 
                alt="威德益生菌膠囊"
                className="w-full h-full object-cover"
              />
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-3">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors bg-white ${
                    currentImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={productImages[index]} alt={`產品圖 ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">威德 益生菌膠囊</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <div className="flex cursor-pointer" onClick={scrollToReviews}>
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <div className="relative">
                      <Star className="w-5 h-5 text-gray-300" />
                      <div className="absolute inset-0 overflow-hidden" style={{width: '70%'}}>
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                  <span className="text-lg text-gray-600 font-medium ml-2">4.7</span>
                </div>
                <span className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={scrollToReviews}>125 則評論</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-bold text-blue-600">NT$ 999</span>
                <span className="text-xl text-gray-500 line-through">NT$ 1,299</span>
                <Badge className="bg-red-100 text-red-600 hover:bg-red-100">23% OFF</Badge>
              </div>
            </div>

            {/* Usage Instructions */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full mt-1 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold text-blue-800">使用建議</p>
                  <div className="text-blue-700 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">營養配方 • 每日 2 粒 • 連續30天</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">餐後食用，配合溫開水服用</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-lg">數量：</span>
                <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 text-gray-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 border-x border-gray-300 min-w-[4rem] text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100 text-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl">
                <ShoppingCart className="w-5 h-5 mr-2" />
                加入購物車
              </Button>
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg font-semibold rounded-xl">
                立即購買
              </Button>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex-1 py-3 ${isLiked ? 'text-red-500' : 'text-gray-600'} border border-gray-300 rounded-xl`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  收藏
                </Button>
                <Button variant="ghost" className="flex-1 text-gray-600 py-3 border border-gray-300 rounded-xl">
                  <Share2 className="w-5 h-5 mr-2" />
                  分享
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex space-x-8 overflow-x-auto px-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-6 text-lg font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8 space-y-10">
              {activeTab === '商品介紹' && (
                <>
                  {/* Product Description */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">產品簡介</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      威德益生菌膠囊採用專利包埋技術，確保益生菌能夠安全通過胃酸環境，直達腸道發揮作用。每粒含有100億CFU活性益生菌，包含多種優質菌株，有助於維持腸道菌群平衡，促進消化健康。
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-2xl font-bold mb-8">功效說明</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Shield className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">腸道健康</h4>
                        </div>
                        <p className="text-gray-700">維持腸道菌群平衡，改善消化功能</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Shield className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">免疫支持</h4>
                        </div>
                        <p className="text-gray-700">增強身體自然的免疫力</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Shield className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">營養吸收</h4>
                        </div>
                        <p className="text-gray-700">促進營養素的吸收利用</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Shield className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">整體健康</h4>
                        </div>
                        <p className="text-gray-700">支持整體健康狀態</p>
                      </div>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">適合族群</h3>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">經常外食者</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">消化不良者</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">免疫力較弱者</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">壓力大的上班族</Badge>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">!</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-800 mb-3 text-lg">注意事項</h4>
                        <ul className="space-y-2 text-red-700">
                          <li>• 請存放於陰涼乾燥處，避免陽光直射</li>
                          <li>• 孕婦、哺乳期婦女及特殊疾病患者請諮詢醫師後使用</li>
                          <li>• 本產品含有乳製品，對乳製品過敏者請謹慎使用</li>
                          <li>• 開封後請盡快食用完畢</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === '成分與營養標示' && (
                <>
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">主要成分</h3>
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium text-lg">乳酸菌混合物</span>
                        <span className="text-lg text-gray-600 font-semibold">100億CFU</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">嗜酸乳桿菌</span>
                        <span className="text-gray-600">30億CFU</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">雙歧桿菌</span>
                        <span className="text-gray-600">25億CFU</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">植物乳桿菌</span>
                        <span className="text-gray-600">20億CFU</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">其他輔助菌株</span>
                        <span className="text-gray-600">25億CFU</span>
                      </div>
                    </div>
                  </div>

                  {/* Nutrition Facts */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">營養標示 (每粒)</h3>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-800 text-white px-6 py-4">
                        <h4 className="font-bold text-lg">營養成分表</h4>
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span>熱量</span>
                          <span className="font-medium">2大卡</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span>蛋白質</span>
                          <span className="font-medium">0.1公克</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span>脂肪</span>
                          <span className="font-medium">0.05公克</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span>碳水化合物</span>
                          <span className="font-medium">0.3公克</span>
                        </div>
                        <div className="flex justify-between">
                          <span>鈉</span>
                          <span className="font-medium">1毫克</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Usage Instructions */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">食用方法</h3>
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <ul className="space-y-3 text-blue-800">
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>每日2粒，餐後食用</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>配合溫開水吞服</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>建議連續食用30天以上</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>請勿與熱水一同服用</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {activeTab === '顧客評論' && (
                <div ref={reviewsRef}>
                  {/* Reviews Summary */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">顧客評論</h3>
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                      <div className="flex items-center space-x-6 mb-6">
                        <div className="text-4xl font-bold text-gray-900">4.7</div>
                        <div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="text-gray-600">基於125則評論</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center space-x-3">
                            <span className="w-8">{stars}星</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-yellow-400 h-3 rounded-full" 
                                style={{width: stars === 5 ? '70%' : stars === 4 ? '20%' : stars === 3 ? '5%' : stars === 2 ? '3%' : '2%'}}
                              ></div>
                            </div>
                            <span className="text-gray-600 w-10 text-right">
                              {stars === 5 ? '87' : stars === 4 ? '25' : stars === 3 ? '6' : stars === 2 ? '4' : '3'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-8">
                    <div className="border-b border-gray-200 pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">李</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">李小姐</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2024年6月15日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            使用了一個月後，明顯感覺消化變好了，之前經常脹氣的問題也改善很多。包裝很方便攜帶，會繼續購買。
                          </p>
                          <div className="text-sm text-gray-500">已購買：威德益生菌膠囊 60粒裝</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">王</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">王先生</span>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                              <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <span className="text-sm text-gray-500">2024年6月10日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            產品效果不錯，但是價格稍微偏高。服用後腸胃確實比較舒服，推薦給有腸胃問題的朋友。
                          </p>
                          <div className="text-sm text-gray-500">已購買：威德益生菌膠囊 30粒裝</div>
                        </div>
                      </div>
                    </div>

                    <div className="pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">陳</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">陳太太</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2024年6月5日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            很棒的產品！我是上班族，經常外食，自從開始吃這個益生菌後，消化問題明顯改善。膠囊很好吞，沒有異味。
                          </p>
                          <div className="text-sm text-gray-500">已購買：威德益生菌膠囊 60粒裝</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">相關商品推薦</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img src="/api/placeholder/300/300" alt="相關商品" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">相關保健食品 {item}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">4.8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">NT$ {(Math.random() * 1000 + 500).toFixed(0)}</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      加入購物車
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;