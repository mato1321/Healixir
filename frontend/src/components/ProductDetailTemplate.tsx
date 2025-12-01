import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Package, 
  Shield, 
  Truck, 
  Home, 
  ChevronLeft, 
  ChevronRight,
  User,
  LogOut,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { supplementData } from '@/data/supplementData';

interface ProductInfo {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  category: string;
  brand: string;
  description: string;
  capacity: string;
  ingredients: string;
  usage: string;
  images: string[];
  features?: string[];
  suitableFor?: string[];
}

interface ProductDetailTemplateProps {
  productInfo: ProductInfo;
}

const ProductDetailTemplate: React.FC<ProductDetailTemplateProps> = ({ productInfo }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const reviewsRef = useRef<HTMLDivElement>(null);
  
  // 用戶狀態邏輯 (源自 Dashboard.tsx)
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

  const currentIndex = supplementData.findIndex(p => p.id === productInfo.id);
  const previousProduct = currentIndex > 0 ? supplementData[currentIndex - 1] : null;
  const nextProduct = currentIndex < supplementData.length - 1 ? supplementData[currentIndex + 1] : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        image: productInfo.images[0], // 使用第一張圖片
        description: productInfo.description,
        category: productInfo.category,
        brand: productInfo.brand,
        rating: productInfo.rating,
        reviews: productInfo.reviewCount
      });
    }
    alert(`已將 ${quantity} 個商品加入購物車！`);
  };

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToProduct = (productId: string) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productInfo.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productInfo.images.length) % productInfo.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* 頂部導航 (更新為 Dashboard 格式) */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
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
        {/* 商品導航按鈕 */}
        <div className="flex justify-between items-center mb-6">
          {previousProduct ?  (
            <button
              onClick={() => navigateToProduct(previousProduct.id)}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              <div className="text-left">
                <p className="text-xs text-gray-500">上一個商品</p>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-1">
                  {previousProduct.name}
                </p>
              </div>
            </button>
          ) : (
            <div></div>
          )}

          {nextProduct ? (
            <button
              onClick={() => navigateToProduct(nextProduct.id)}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all group"
            >
              <div className="text-right">
                <p className="text-xs text-gray-500">下一個商品</p>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-1">
                  {nextProduct.name}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            </button>
          ) : (
            <div></div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左側：商品圖片輪播 */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl overflow-hidden aspect-square shadow-lg">
              <img 
                src={productInfo.images[currentImageIndex]} 
                alt={`${productInfo.name} - ${currentImageIndex + 1}`} 
                className="w-full h-full object-contain p-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400?text=Product+Image';
                }}
              />
              
              {/* 圖片切換按鈕 */}
              {productInfo.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>

                  {/* 圖片指示器 */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {productInfo.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-blue-600 w-8' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 縮圖列表 */}
            {productInfo.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {productInfo.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative bg-white rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-blue-600 shadow-md' 
                        : 'border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${productInfo.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 右側：商品資訊 */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{productInfo.name}</h1>
              <p className="text-sm text-gray-600 mb-2">品牌：{productInfo.brand}</p>
              <p className="text-sm text-gray-600 mb-4">容量：{productInfo.capacity}</p>
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

            <div className="space-y-2">
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-bold text-blue-600">NT$ {productInfo.price.toLocaleString()}</span>
                <span className="text-xl text-gray-500 line-through">NT$ {productInfo.originalPrice.toLocaleString()}</span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  省 NT$ {(productInfo.originalPrice - productInfo.price).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium min-w-[80px]">數量</span>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 rounded-lg">-</Button>
                  <span className="text-xl font-semibold min-w-[40px] text-center">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 rounded-lg">+</Button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleAddToCart} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                <ShoppingCart className="w-5 h-5 mr-2" />
                加入購物車
              </Button>
              <Button variant="outline" onClick={() => setIsWishlisted(!isWishlisted)} className={`h-14 w-14 rounded-xl border-2 ${isWishlisted ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600">正品保證</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600">快速配送</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600">安全認證</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">商品詳情</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">{productInfo.description}</p>
            
            {productInfo.features && productInfo.features.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">產品特色</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {productInfo.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">主要成分</h3>
            <p className="text-gray-700">{productInfo.ingredients}</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">使用方法</h3>
            <p className="text-gray-700">{productInfo.usage}</p>

            {productInfo.suitableFor && productInfo.suitableFor.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">適用對象</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {productInfo.suitableFor.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div ref={reviewsRef} className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">顧客評價</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">顧客</span>
                <span className="text-gray-500 text-sm">2024/11/20</span>
              </div>
              <p className="text-gray-700">商品品質很好，非常滿意！</p>
            </div>
          </div>
        </div>

        {/* 相關商品推薦 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">相關商品推薦</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {supplementData
              .filter(p => p.category === productInfo.category && p.id !== productInfo.id)
              .slice(0, 4)
              .map(product => (
                <div
                  key={product.id}
                  onClick={() => navigateToProduct(product.id)}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer p-4"
                >
                  <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-2" />
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-blue-600">NT$ {product.price.toLocaleString()}</p>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailTemplate;