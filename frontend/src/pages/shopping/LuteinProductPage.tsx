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
  MessageCircle,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';

// ChatButton 组件
const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLineClick = () => {
    console.log("开启 LINE");
  };

  return (
    <>
      {/* 聊天按钮 - 放在购物车按钮正下方 */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center group"
        >
          <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* 对话框 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 border-0 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg font-bold">
                Healixir - 为你的健康量身推荐的保健食品
              </DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="mt-4">
            <div className="space-y-3">
              {/* LINE 按钮 */}
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
                  <span className="font-semibold text-base bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">专业药师咨询</span>
                  <span className="text-sm text-gray-600 mt-1">营业时间内药师即时回复 • 其他时段 AI 智能协助</span>
                </div>
              </Button>

              {/* 联络我们按钮 */}
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button
                  className="w-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white hover:shadow-lg justify-start p-4 h-auto shadow-md border-0 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">联络我们</span>
                    <span className="text-sm text-gray-600 mt-1">查看完整联络资讯 • 客服专线 • 营业时间</span>
                  </div>
                </Button>
              </Link>
            </div>

            {/* QR Code 区域 */}
            <div className="mt-6 text-center">
              <div className="w-32 h-32 bg-white/80 backdrop-blur-sm mx-auto rounded-xl shadow-lg flex items-center justify-center border border-white/50">
                <div className="text-gray-400 text-xs">LINE QR Code</div>
              </div>
              <p className="text-sm mt-3 text-gray-700 font-medium">扫描 QR Code 或点击上方按钮</p>
              <p className="text-xs mt-1 text-gray-600">立即获得专业健康咨询</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// FloatingCartButton 组件内嵌定义
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

const LuteinProductPage = () => {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const [user, setUser] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('商品介绍');
  const reviewsRef = React.useRef<HTMLDivElement>(null);

  // 商品资讯
  const productInfo = {
    id: 'lutein-complex',
    name: '蓉易明 叶黄素复方胶囊',
    price: 720,
    originalPrice: 1299,
    rating: 4.5,
    reviewCount: 156,
    description: '保护眼部健康的专业叶黄素复方胶囊',
    category: '眼部保健'
  };

  // 获取购物车中此商品的数量
  const cartItem = cartItems.find(item => item.id === productInfo.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    // 检查用户登入状态
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
    const currentCartItem = cartItems.find(item => item.id === productInfo.id);
    const currentCartQuantity = currentCartItem ? currentCartItem.quantity : 0;
    const newTotalQuantity = currentCartQuantity + quantity;
    
    if (currentCartItem) {
      updateQuantity(productInfo.id, newTotalQuantity);
    } else {
      addToCart({
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        image: '/lovable-uploads/6cbc969b-7bf0-43a6-b0c0-f81ca664a74d.png',
        quantity: 1,
        description: productInfo.description
      });
      
      if (quantity > 1) {
        setTimeout(() => {
          updateQuantity(productInfo.id, quantity);
        }, 0);
      }
    }
    
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      setQuantity(1);
      return;
    }
    setQuantity(newQuantity);
  };

  const productImages = [
    '/lovable-uploads/6cbc969b-7bf0-43a6-b0c0-f81ca664a74d.png',
    '/api/placeholder/400/400', 
    '/api/placeholder/400/400',
    '/api/placeholder/400/400'
  ];

  const tabs = ['商品介绍', '成分与营养标示', '顾客评论'];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const scrollToReviews = () => {
    setActiveTab('顾客评论');
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
                <p className="text-xs text-gray-500">智能保健顾问</p>
              </div>
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">首页</Link>
              <Link to="/shopDetail">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  商品
                </Button>
              </Link>
              <Link to="/member">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <User className="w-4 h-4 mr-2" />
                  会员
                </Button>
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    欢迎，<span className="font-medium text-blue-600">{user.name || user.email}</span>
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
            <Link to="/" className="text-gray-500 hover:text-blue-600">首页</Link>
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
                  <img src={productImages[index]} alt={`产品图 ${index + 1}`} className="w-full h-full object-cover" />
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
                <span className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={scrollToReviews}>{productInfo.reviewCount} 则评论</span>
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
                  <p className="font-semibold text-blue-800">使用建议</p>
                  <div className="text-blue-700 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">护眼配方 • 每日 1 粒 • 连续60天</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">饭后食用，配合温开水服用</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-lg">购买数量：</span>
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
              
              {/* 显示购物车中的数量资讯 */}
              {cartQuantity > 0 && (
                <div className="text-sm text-gray-600">
                  购物车中已有 {cartQuantity} 件此商品
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
                加入购物车
              </Button>
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg font-semibold rounded-xl">
                立即购买
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
              {activeTab === '商品介绍' && (
                <>
                  {/* Product Description */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">产品简介</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      蓉易明叶黄素复方胶囊采用专利FloraGLO®叶黄素，结合玉米黄素、山桑子萃取物等多种护眼成分，专为现代人眼部健康设计。每粒含高浓度叶黄素20mg，有效过滤蓝光，保护黄斑部健康，减缓眼部疲劳。
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-2xl font-bold mb-8">功效说明</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Eye className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">护眼抗蓝光</h4>
                        </div>
                        <p className="text-gray-700">有效过滤有害蓝光，保护视网膜健康</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Shield className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">黄斑部保护</h4>
                        </div>
                        <p className="text-gray-700">维护黄斑部健康，预防老化性眼疾</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Zap className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">缓解疲劳</h4>
                        </div>
                        <p className="text-gray-700">改善眼部疲劳，提升视觉舒适度</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-3">
                          <Sun className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 text-lg">抗氧化保护</h4>
                        </div>
                        <p className="text-gray-700">强化眼部抗氧化能力，延缓老化</p>
                      </div>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">适合族群</h3>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">长时间使用3C产品者</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">上班族</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">学生</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">中老年人</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm bg-gray-50 border-gray-300">关注眼部健康者</Badge>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">!</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-800 mb-3 text-lg">注意事项</h4>
                        <ul className="space-y-2 text-red-700">
                          <li>• 请存放于阴凉干燥处，避免阳光直射</li>
                          <li>• 孕妇、哺乳期妇女及12岁以下儿童请咨询医师后使用</li>
                          <li>• 本产品含有大豆，对大豆过敏者请谨慎使用</li>
                          <li>• 开封后请尽快食用完毕，并注意保存期限</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === '成分与营养标示' && (
                <>
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">主要成分</h3>
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium text-lg">FloraGLO®叶黄素</span>
                        <span className="text-lg text-gray-600 font-semibold">20mg</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">玉米黄素</span>
                        <span className="text-gray-600">4mg</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">山桑子萃取物</span>
                        <span className="text-gray-600">50mg</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">维生素A</span>
                        <span className="text-gray-600">800μg</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-medium">维生素E</span>
                        <span className="text-gray-600">12mg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">锌</span>
                        <span className="text-gray-600">15mg</span>
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
                          <span>每日1粒，饭后食用</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>配合温开水吞服</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>建议连续食用60天以上</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>避免与咖啡、茶同时服用</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {activeTab === '顾客评论' && (
                <div ref={reviewsRef}>
                  {/* Reviews Summary */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">顾客评论</h3>
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                      <div className="flex items-center space-x-6 mb-6">
                        <div className="text-4xl font-bold text-gray-900">{productInfo.rating}</div>
                        <div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="text-gray-600">基于{productInfo.reviewCount}则评论</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center space-x-3">
                            <span className="w-8">{stars}星</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-yellow-400 h-3 rounded-full" 
                                style={{width: stars === 5 ? '75%' : stars === 4 ? '18%' : stars === 3 ? '4%' : stars === 2 ? '2%' : '1%'}}
                              ></div>
                            </div>
                            <span className="text-gray-600 w-10 text-right">
                              {stars === 5 ? '117' : stars === 4 ? '28' : stars === 3 ? '6' : stars === 2 ? '3' : '2'}
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
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">陈</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">陈先生</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2024年6月20日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            工作需要长时间看电脑，使用蓉易明叶黄素一个月后，明显感觉眼睛比较不会疲劳干涩。晚上加班看萤幕也不会像以前那么不舒服，很推荐给上班族！
                          </p>
                          <div className="text-sm text-gray-500">已购买：蓉易明叶黄素复方胶囊 60粒装</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">林</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">林小姐</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2024年6月18日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            我是学生，每天要读书看手机，眼睛常常很疲劳。吃了这个叶黄素后，眼睛比较不会酸涩，看东西也比较清楚。胶囊不大，很好吞服。
                          </p>
                          <div className="text-sm text-gray-500">已购买：蓉易明叶黄素复方胶囊 30粒装</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">张</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">张太太</span>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                              <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <span className="text-sm text-gray-500">2024年6月15日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            买给50岁的妈妈吃，她说吃了两个月后，看东西比较不会模糊，眼睛也比较不会干。品质不错，价格也合理，会持续购买。
                          </p>
                          <div className="text-sm text-gray-500">已购买：蓉易明叶黄素复方胶囊 60粒装</div>
                        </div>
                      </div>
                    </div>

                    <div className="pb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">黄</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium">黄先生</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2024年6月12日</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            程式设计师，每天盯萤幕超过10小时。使用蓉易明叶黄素后，眼睛疲劳感明显减少，而且晚上看手机也不会像以前那么刺眼。很棒的产品！
                          </p>
                          <div className="text-sm text-gray-500">已购买：蓉易明叶黄素复方胶囊 60粒装</div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8">相关商品推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "善存 护眼胶囊", price: 899, image: "/api/placeholder/300/300" },
              { name: "白兰氏 深海鱼油", price: 1199, image: "/api/placeholder/300/300" },
              { name: "维他命A+E护眼锭", price: 699, image: "/api/placeholder/300/300" },
              { name: "蓝莓叶黄素软胶囊", price: 1099, image: "/api/placeholder/300/300" }
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
                    <span className="text-xs text-gray-600 ml-1">4.8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">NT$ {item.price}</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      加入购物车
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

export default LuteinProductPage;