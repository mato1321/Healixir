import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  LogOut, 
  LogIn, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronRight, 
  Star,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import ChatButton from '@/components/ChatButton';
import FloatingCartButton from '@/components/FloatingCartButton';
import { useCart } from '@/contexts/CartContext';

// 產品介面定義
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  type: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  createdAt?: string;
}

// 分類介面定義
interface Category {
  id: string;
  name: string;
  description: string;
  subcategories?: Array<{ id: string; name: string; }>;
}

// 假數據
const products: Product[] = [
  {
    id: 1,
    name: '善存 綜合維生素',
    description: '完整營養配方，含21種維生素礦物質',
    price: 899,
    brand: '善存',
    type: '錠劑',
    category: 'multivitamin',
    rating: 4.5,
    reviews: 120,
    image: '/api/placeholder/300/300',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: '白蘭氏 維生素C',
    description: '高濃度維生素C，增強免疫力',
    price: 450,
    brand: '白蘭氏',
    type: '錠劑',
    category: 'vitamin-c',
    rating: 4.7,
    reviews: 89,
    image: '/api/placeholder/300/300',
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    name: 'BHK\'s B群',
    description: '活力B群，提升新陳代謝',
    price: 680,
    brand: 'BHK\'s',
    type: '膠囊',
    category: 'vitamin-b',
    rating: 4.3,
    reviews: 156,
    image: '/api/placeholder/300/300',
    createdAt: '2024-01-08'
  },
  {
    id: 4,
    name: '大研生醫 薑黃',
    description: '95%薑黃素，天然抗氧化',
    price: 1200,
    brand: '大研生醫',
    type: '膠囊',
    category: 'turmeric',
    rating: 4.6,
    reviews: 78,
    image: '/api/placeholder/300/300',
    createdAt: '2024-01-05'
  },
  {
    id: 5,
    name: '營養師輕食 綠茶萃取',
    description: '兒茶素豐富，促進新陳代謝',
    price: 750,
    brand: '營養師輕食',
    type: '膠囊',
    category: 'green-tea',
    rating: 4.4,
    reviews: 92,
    image: '/api/placeholder/300/300',
    createdAt: '2024-01-03'
  },
  {
    id: 6,
    name: 'NOW健而婷 維生素D3',
    description: '高單位維生素D3，骨骼健康',
    price: 520,
    brand: 'NOW健而婷',
    type: '軟糖',
    category: 'vitamin-d',
    rating: 4.8,
    reviews: 134,
    image: '/api/placeholder/300/300',
    createdAt: '2024-01-01'
  },
  {
    id: 7,
    name: '威德 益生菌膠囊',
    description: '專利包埋技術，100億CFU活性益生菌，維持腸道健康',
    price: 999,
    brand: '威德',
    type: '膠囊',
    category: 'probiotics',
    rating: 4.7,
    reviews: 125,
    image: '/api/placeholder/300/300',
    createdAt: '2024-01-20'
  }
];

const productCategories: Category[] = [
  {
    id: 'vitamins',
    name: '維生素',
    description: '各種維生素補充品',
    subcategories: [
      { id: 'vitamin-c', name: '維生素C' },
      { id: 'vitamin-d', name: '維生素D' },
      { id: 'vitamin-b', name: 'B群' },
      { id: 'multivitamin', name: '綜合維生素' }
    ]
  },
  {
    id: 'herbal',
    name: '草本保健',
    description: '天然草本營養補充',
    subcategories: [
      { id: 'ginseng', name: '人參' },
      { id: 'turmeric', name: '薑黃' },
      { id: 'green-tea', name: '綠茶萃取' }
    ]
  },
  {
    id: 'minerals',
    name: '礦物質',
    description: '各種礦物質補充劑'
  },
  {
    id: 'probiotics',
    name: '益生菌',
    description: '腸道健康益生菌'
  }
];

// 搜尋欄組件
const SearchBar: React.FC<{ searchTerm: string; onSearchChange: (value: string) => void }> = ({ 
  searchTerm, 
  onSearchChange 
}) => (
  <div className="relative max-w-md mx-auto">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <Input
      type="text"
      placeholder="搜尋保健食品..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="pl-10 py-3 text-lg"
    />
  </div>
);

// 商品卡片組件
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  
  // 檢查商品是否已在購物車中
  const isInCart = cartItems.some(item => item.id === product.id);
  const cartItem = cartItems.find(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    setShowAddedMessage(true);
    
    // 1.5秒後隱藏提示訊息
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full flex flex-col relative">
        {/* 加入購物車成功提示 */}
        {showAddedMessage && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 z-10">
            <Check className="w-3 h-3" />
            已加入購物車
          </div>
        )}
        
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-semibold text-base text-gray-800 mb-2 line-clamp-2 flex-shrink-0">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-xs mb-2 line-clamp-2 flex-1">
            {product.description}
          </p>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="text-lg font-bold text-blue-600">
              NT$ {product.price.toLocaleString()}
            </div>
            
            <div className="flex items-center gap-2">
              {/* 顯示購物車中的數量 */}
              {isInCart && cartItem && (
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  購物車: {cartItem.quantity}
                </span>
              )}
              
              <button 
                onClick={handleAddToCart}
                className={`w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg ${
                  isInCart 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                }`}
              >
                {isInCart ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-lg font-medium">+</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// 商品網格組件
const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">找不到符合條件的商品</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// 分類側邊欄組件
const CategorySidebar: React.FC<{
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
}> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onRatingChange
}) => {
  const [openCategories, setOpenCategories] = useState<string[]>(['vitamins', 'herbal']);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="space-y-4">
      {/* 商品分類 */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">商品分類</h3>
        </div>

        <div className="p-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              activeCategory === 'all'
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            所有商品
          </button>
        </div>

        <div className="p-2 space-y-1">
          {categories.map((category) => (
            <div key={category.id}>
              {category.subcategories ? (
                <div>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <span className={activeCategory === category.id ? 'text-blue-600 font-medium' : ''}>
                      {category.name}
                    </span>
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform ${
                        openCategories.includes(category.id) ? 'rotate-90' : ''
                      }`} 
                    />
                  </button>
                  {openCategories.includes(category.id) && (
                    <div className="ml-4 mt-1 space-y-1">
                      <button
                        onClick={() => onCategoryChange(category.id)}
                        className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors ${
                          activeCategory === category.id
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        全部{category.name}
                      </button>
                      {category.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => onCategoryChange(sub.id)}
                          className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors ${
                            activeCategory === sub.id
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onCategoryChange(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 篩選條件 */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">篩選條件</h3>
          </div>
        </div>

        {/* 價格範圍 */}
        <div className="p-4 border-b">
          <h4 className="font-medium text-sm mb-3">價格範圍</h4>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              NT$ {priceRange[0].toLocaleString()} - NT$ {priceRange[1].toLocaleString()}
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[0]}
                onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* 評價篩選 */}
        <div className="p-4">
          <h4 className="font-medium text-sm mb-3">評價</h4>
          <div className="space-y-3">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={minRating === rating}
                  onCheckedChange={() => onRatingChange(minRating === rating ? 0 : rating)}
                />
                <label htmlFor={`rating-${rating}`} className="text-sm text-gray-600 cursor-pointer flex-1 flex items-center">
                  {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  <span className="ml-1">以上</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 主要商品頁面組件
const ShopDetail = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState('rating');
  const [minRating, setMinRating] = useState(0);

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

  // 篩選和排序商品
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = minRating === 0 || product.rating >= minRating;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'reviews': return b.reviews - a.reviews;
        case 'newest': return new Date(b.createdAt || '2024-01-01').getTime() - new Date(a.createdAt || '2024-01-01').getTime();
        case 'rating':
        default: return b.rating - a.rating;
      }
    });

    return filtered;
  }, [searchTerm, activeCategory, priceRange, sortBy, minRating]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
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
                  <ShoppingBag className="w-4 h-4 mr-2" />
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

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <CategorySidebar
              categories={productCategories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              minRating={minRating}
              onRatingChange={setMinRating}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                共找到 {filteredProducts.length} 項商品
              </p>
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">排序：</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg appearance-none bg-white text-sm pr-8"
                  >
                    <option value="rating">綜合排序</option>
                    <option value="reviews">評價最多</option>
                    <option value="price-low">價格低至高</option>
                    <option value="price-high">價格高至低</option>
                    <option value="newest">最新上架</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* 聊天按鈕 */}
      <ChatButton />
      
      {/* 購物車按鈕 */}
      <FloatingCartButton />
    </div>
  );
};

export default ShopDetail;