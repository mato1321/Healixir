import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  MessageCircle,
  User,
  LogOut,
  AlertTriangle,
  LogIn,
  Sparkles,
  Heart,
  Star,
  Gift,
  Truck,
  Shield,
  CreditCard
} from "lucide-react";
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, addToCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 頁面載入時滾動到頂部
    window.scrollTo(0, 0);
    
    // 檢查用戶登入狀態
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const recommendedProducts = [
    { 
      id: 8, 
      name: "鈣片 600mg", 
      price: 380, 
      image: "/api/placeholder/150/150",
      reason: "骨骼健康",
      description: "高吸收率鈣片，強化骨骼",
      brand: "健康牌",
      type: "錠劑",
      category: "minerals",
      rating: 4.5,
      reviews: 89
    },
    { 
      id: 9, 
      name: "益生菌", 
      price: 720, 
      image: "/api/placeholder/150/150", 
      reason: "腸道健康",
      description: "多株益生菌，維持腸道平衡",
      brand: "活力牌",
      type: "膠囊",
      category: "probiotics",
      rating: 4.7,
      reviews: 156
    },
    { 
      id: 10, 
      name: "葉黃素", 
      price: 680, 
      image: "/api/placeholder/150/150", 
      reason: "眼部保健",
      description: "護眼配方，保護視力",
      brand: "明亮牌",
      type: "軟膠囊",
      category: "vitamins",
      rating: 4.6,
      reviews: 123
    }
  ];

  const handleQuantityChange = (id: number, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity);
      }
    }
  };

  const addRecommendedProduct = (product: any) => {
    addToCart(product);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 1000 ? 0 : 80;
  const discount = promoCode === "HEALTH10" ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

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
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Healixir
                  </h1>
                  <p className="text-xs text-gray-500">專業保健顧問</p>
                </div>
              </Link>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">首頁</Link>
              <Link to="/shopDetail" className="text-gray-600 hover:text-blue-600 transition-colors">商品</Link>
              <Link to="/member">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <User className="w-4 h-4 mr-2" />
                  會員
                </Button>
              </Link>
              
              {isLoggedIn && user ? (
                // 已登入狀態
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    歡迎，<span className="font-medium text-blue-600">{user.name || user.email}</span>
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="hover:bg-red-50 hover:text-red-600"
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      setUser(null);
                      setIsLoggedIn(false);
                    }}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 購物車標題 */}
        <div className="flex items-center mb-8">
          <ShoppingCart className="w-6 h-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">購物車</h1>
          <span className="ml-2 text-gray-500">({cartItems.length} 件商品)</span>
        </div>

        {/* 空購物車狀態 */}
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">購物車是空的</h2>
            <p className="text-gray-500 mb-6">快去選購您喜歡的保健商品吧！</p>
            <Link to="/shopDetail">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                開始購物
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 購物車主要內容 */}
            <div className="lg:col-span-2">
              {/* 未登入提醒 */}
              {!isLoggedIn && (
                <Card className="mb-6 border-yellow-200 bg-yellow-50/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center text-yellow-800">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      <span>建議您先登入以儲存購物車資料</span>
                      <Link to="/login" className="ml-2 text-blue-600 hover:text-blue-800 underline">
                        立即登入
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 商品清單 */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{item.specs || '60顆/瓶'}</p>
                              <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                              {item.isRecommended && (
                                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mb-2">
                                  💡 {item.reason}
                                </div>
                              )}
                              {item.needsPharmacist && (
                                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                                  ⚠️ 需藥師確認
                                </div>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="w-8 h-8 p-0"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="w-8 h-8 p-0"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">NT$ {item.price}</p>
                              <p className="font-semibold text-gray-800">NT$ {item.price * item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 推薦商品 */}
              <Card className="mt-8 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">📦 你可能也需要</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendedProducts.map((product) => {
                      const isInCart = cartItems.some(item => item.id === product.id);
                      return (
                        <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white/60 backdrop-blur-sm">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-20 object-cover rounded-lg bg-gray-100 mb-3"
                          />
                          <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                          <p className="text-xs text-blue-600 mb-2">💡 {product.reason}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">NT$ {product.price}</span>
                            <Button
                              size="sm"
                              onClick={() => addRecommendedProduct(product)}
                              className={`text-xs ${isInCart ? 'bg-green-500 hover:bg-green-600' : ''}`}
                              disabled={isInCart}
                            >
                              {isInCart ? '已加入' : '加購'}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 側邊欄 */}
            <div className="space-y-6">
              {/* 總金額 */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">訂單摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>商品小計</span>
                    <span>NT$ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>運費</span>
                    <span>{shipping === 0 ? "免費" : `NT$ ${shipping}`}</span>
                  </div>
                  {subtotal < 1000 && (
                    <p className="text-xs text-gray-600">滿 NT$ 1,000 免運費</p>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Input
                      placeholder="輸入優惠碼"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>優惠折扣</span>
                        <span>-NT$ {discount}</span>
                      </div>
                    )}
                    {promoCode && promoCode !== "HEALTH10" && (
                      <p className="text-xs text-red-500">無效的優惠碼</p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>總計</span>
                    <span>NT$ {total.toLocaleString()}</span>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    前往結帳
                  </Button>
                  
                  <Link to="/shopDetail">
                    <Button variant="outline" className="w-full">
                      繼續購物
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* 購物保障 */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-3 text-gray-800">購物保障</h3>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-green-500" />
                      <span>正品保證</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-2 text-blue-500" />
                      <span>快速配送</span>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                      <span>安全付款</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;