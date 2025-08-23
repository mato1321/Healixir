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
  User,
  LogOut,
  LogIn,
  Eye,
  Zap,
  Sun,
  Sparkles,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';

// ChatButton 組件
const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLineClick = () => {
    console.log("開啟 LINE");
  };

  return (
    <>
      {/* 聊天按鈕 - 放在購物車按鈕正下方 */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center group"
        >
          <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* 對話框 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 border-0 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg font-bold">
                Healixir - 為你的健康量身推薦的保健食品
              </DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="mt-4">
            <div className="space-y-3">
              {/* LINE 按鈕 */}
              <Button
                onClick={handleLineClick}
                className="w-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white hover:shadow-lg justify-start p-4 h-auto shadow-md border-0 transition-all duration-300"
              >
                <img 
                  src="/line.ico" 
                  alt="LINE" 
                  className="w-12 h-12 mr-4"
                />
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-base bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">專業藥師諮詢</span>
                  <span className="text-sm text-gray-600 mt-1">營業時間內藥師即時回覆 • 其他時段專業系統協助</span>
                </div>
              </Button>

              {/* 聯絡我們按鈕 */}
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button
                  className="w-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white hover:shadow-lg justify-start p-4 h-auto shadow-md border-0 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">聯絡我們</span>
                    <span className="text-sm text-gray-600 mt-1">查看完整聯絡資訊 • 客服專線 • 營業時間</span>
                  </div>
                </Button>
              </Link>
            </div>

            {/* QR Code 區域 */}
            <div className="mt-6 text-center">
              <div className="w-32 h-32 bg-white/80 backdrop-blur-sm mx-auto rounded-xl shadow-lg flex items-center justify-center border border-white/50">
                <div className="text-gray-400 text-xs">LINE QR Code</div>
              </div>
              <p className="text-sm mt-3 text-gray-700 font-medium">掃描 QR Code 或點擊上方按鈕</p>
              <p className="text-xs mt-1 text-gray-600">立即獲得專業健康諮詢</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// FloatingCartButton 組件內嵌定義
const FloatingCartButton: React.FC = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link to="/cart">
      <div className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center group">
        <div className="relative">
          <ShoppingCart className="w-8 h-8 group-hover:scale-110 transition-transform" />
          {totalItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold min-w-[20px]">
              {totalItems > 99 ? '99+' : totalItems}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const JinJingMingProductPage = () => {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const [user, setUser] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('商品介紹');
  const reviewsRef = React.useRef<HTMLDivElement>(null);

  // 商品資訊
  const productInfo = {
    id: 'gold-eye-capsule',
    name: '金博氏 金晶明膠囊',
    price: 650,
    originalPrice: 850,
    rating: 4.3,
    reviewCount: 98,
    description: '眼部營養補充膠囊',
    category: '眼部保健'
  };

  // 獲取購物車中此商品的數量
  const cartItem = cartItems.find(item => item.id === productInfo.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

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

  const handleAddToCart = () => {
    // 使用即時的購物車狀態來判斷
    const currentCartItem = cartItems.find(item => item.id === productInfo.id);
    const currentCartQuantity = currentCartItem ? currentCartItem.quantity : 0;
    
    // 計算新的總數量（當前數量 + 選擇的數量）
    const newTotalQuantity = currentCartQuantity + quantity;
    
    console.log('添加購物車:', {
      currentCartQuantity,
      selectedQuantity: quantity,
      newTotalQuantity,
      hasExistingItem: !!currentCartItem
    });
    
    // 統一使用 updateQuantity，如果商品不存在會自動創建
    if (currentCartItem) {
      // 商品已存在，累加數量
      updateQuantity(productInfo.id, newTotalQuantity);
    } else {
      // 商品不存在，創建新商品並設置數量
      // 先添加商品
      addToCart({
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        image: '/lovable-uploads/6cbc969b-7bf0-43a6-b0c0-f81ca664a74d.png',
        quantity: 1, // 先添加1件
        description: productInfo.description
      });
      
      // 如果選擇的數量大於1，再更新到正確的數量
      if (quantity > 1) {
        // 使用 setTimeout 確保 addToCart 完成後再更新
        setTimeout(() => {
          updateQuantity(productInfo.id, quantity);
        }, 0);
      }
    }
    
    // 加入購物車後重置數量為1
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    // 確保數量不能小於1
    if (newQuantity < 1) {
      setQuantity(1);
      return;
    }
    setQuantity(newQuantity);
  };

  // 新增直接更新購物車數量的函數 - 已移除大部分功能
  const handleUpdateCartQuantity = (newCartQuantity: number) => {
    if (newCartQuantity === 0) {
      // 如果數量為0，從購物車移除
      if (cartItem) {
        removeFromCart(productInfo.id);
      }
    } else {
      // 更新購物車中的數量
      if (cartItem) {
        updateQuantity(productInfo.id, newCartQuantity);
      }
    }
  };

  const productImages = [
    '/lovable-uploads/6cbc969b-7bf0-43a6-b0c0-f81ca664a74d.png',
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

  const discount = Math.round((1 - productInfo.price / productInfo.originalPrice) * 100);

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
                <p className="text-xs text-gray-500">專業保健顧問</p>
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
            <span className="text-gray-900">{productInfo.name}</span>
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
                alt={productInfo.name}
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{productInfo.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <div className="flex cursor-pointer" onClick={scrollToReviews}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(productInfo.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-lg text-gray-600 font-medium ml-2">{productInfo.rating}</span>
                </div>
                <span className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={scrollToReviews}>{productInfo.reviewCount} 則評論</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-bold text-blue-600">NT$ {productInfo.price.toLocaleString()}</span>
                <span className="text-xl text-gray-500 line-through">NT$ {productInfo.originalPrice.toLocaleString()}</span>
                <Badge className="bg-red-100 text-red-600 hover:bg-red-100">{discount}% OFF</Badge>
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
                      <span className="text-sm">專利金晶明配方 • 每日 2 粒 • 持續使用3個月</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">餐後食用，搭配溫水服用效果更佳</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-lg">購買數量：</span>
                <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-4 py-3 hover:bg-gray-100 text-gray-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 border-x border-gray-300 min-w-[4rem] text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100 text-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* 顯示購物車中的數量資訊 */}
              {cartQuantity > 0 && (
                <div className="text-sm text-gray-600">
                  購物車中已有 {cartQuantity} 件此商品
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl"
              >
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
                <div className="space-y-10">
                  {/* Product Description */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">產品簡介</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      金博氏金晶明膠囊結合專利葉黃素、玻尿酸及多種護眼營養素，採用先進的微囊化技術提升吸收率。專為長期用眼過度、關注眼部健康的人群設計，有效維護黃斑部健康，改善視覺疲勞。
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-2xl font-bold mb-8">功效說明</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Sparkles className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">專利金晶明配方</h4>
                        </div>
                        <p className="text-gray-700">獨家專利技術，提升營養素生物利用率</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Shield className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">玻尿酸護眼</h4>
                        </div>
                        <p className="text-gray-700">添加玻尿酸，維持眼部濕潤度</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Eye className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">深度護眼</h4>
                        </div>
                        <p className="text-gray-700">全方位眼部營養補充，維護視覺健康</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Zap className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">快速吸收</h4>
                        </div>
                        <p className="text-gray-700">微囊化技術，提升營養素吸收效率</p>
                      </div>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">適合族群</h3>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">長期電腦工作者</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">手機重度使用者</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">夜間工作者</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">中高齡族群</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">視力保健需求者</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">眼部乾澀困擾者</Badge>
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
                          <li>• 請存放於25°C以下乾燥處，避免陽光直射</li>
                          <li>• 孕婦、哺乳婦女及15歲以下兒童請先諮詢醫師</li>
                          <li>• 對本產品任何成分過敏者請勿使用</li>
                          <li>• 如有不適請立即停用並諮詢醫師</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '成分與營養標示' && (
                <div className="space-y-10">
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">主要成分</h3>
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium text-lg">專利葉黃素</span>
                        <span className="text-lg text-gray-600 font-semibold">30mg</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">玻尿酸</span>
                        <span className="text-gray-600">10mg</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">玉米黃素</span>
                        <span className="text-gray-600">6mg</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">花青素</span>
                        <span className="text-gray-600">80mg</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">維生素A</span>
                        <span className="text-gray-600">600μg</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">維生素C</span>
                        <span className="text-gray-600">100mg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">硒</span>
                        <span className="text-gray-600">55μg</span>
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
                          <span>搭配溫水服用，避免熱水</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>建議持續使用3個月以上</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>可分早晚各1粒，效果更佳</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '顧客評論' && (
                <div ref={reviewsRef}>
                  {/* Reviews Summary */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">顧客評論</h3>
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                      <div className="flex items-center space-x-6 mb-6">
                        <div className="text-4xl font-bold text-gray-900">{productInfo.rating}</div>
                        <div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="text-gray-600">基於{productInfo.reviewCount}則評論</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center space-x-3">
                            <span className="w-8">{stars}星</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-yellow-400 h-3 rounded-full" 
                                style={{width: stars === 5 ? '43%' : stars === 4 ? '39%' : stars === 3 ? '12%' : stars === 2 ? '4%' : '2%'}}
                              ></div>
                            </div>
                            <span className="text-gray-600 w-10 text-right">
                              {stars === 5 ? '42' : stars === 4 ? '38' : stars === 3 ? '12' : stars === 2 ? '4' : '2'}
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
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-medium">陳</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">陳先生</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2024年6月25日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            使用金博氏金晶明膠囊三個月了，效果非常顯著！原本長時間看電腦後眼睛會很乾澀，現在這個問題明顯改善了。而且夜間視力也變得更清楚，很推薦給經常用眼的朋友。
                          </p>
                          <div className="text-sm text-gray-500">已購買：金博氏 金晶明膠囊 60粒裝</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">李</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">李小姐</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2024年6月22日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            金晶明的配方真的很不錯，添加了玻尿酸讓眼睛感覺更滋潤。我是護理師，經常需要長時間工作，自從開始吃這個後眼部疲勞感明顯減輕了。價格雖然高一些，但品質值得。
                          </p>
                          <div className="text-sm text-gray-500">已購買：金博氏 金晶明膠囊 30粒裝</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">張</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">張太太</span>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                              <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <span className="text-sm text-gray-500">2024年6月19日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            買給65歲的老公使用，他說視力確實有改善，看報紙比較不會模糊。專利配方感覺比較安心，會繼續購買。唯一缺點是膠囊比較大顆，吞嚥需要注意。
                          </p>
                          <div className="text-sm text-gray-500">已購買：金博氏 金晶明膠囊 60粒裝</div>
                        </div>
                      </div>
                    </div>

                    <div className="pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">劉</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">劉先生</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2024年6月16日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            設計師工作需要長時間盯著螢幕，之前試過很多護眼產品效果都不明顯。金晶明真的不一樣，使用一個月後眼睛乾澀的問題大幅改善，工作效率也提升了。強烈推薦！
                          </p>
                          <div className="text-sm text-gray-500">已購買：金博氏 金晶明膠囊 60粒裝</div>
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
            {[
              { name: "明適E 葉黃素II代", price: 680, image: "/api/placeholder/300/300" },
              { name: "蓉易明葉黃素複方膠囊", price: 1299, image: "/api/placeholder/300/300" },
              { name: "視力保健複方錠", price: 899, image: "/api/placeholder/300/300" },
              { name: "藍光護眼膠囊", price: 1199, image: "/api/placeholder/300/300" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">4.7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">NT$ {item.price}</span>
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

      {/* Floating Cart Button */}
      <FloatingCartButton />
      
      {/* Chat Button */}
      <ChatButton />
    </div>
  );
};

export default JinJingMingProductPage;