import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import { supplementData } from '@/data/supplementData';
import ChatButton from '@/components/ChatButton';
import FloatingCartButton from '@/components/FloatingCartButton';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('所有商品');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('綜合排序');
  const [searchTerm, setSearchTerm] = useState('');

  // 定義分類層級結構
  const categoryHierarchy = {
    '維生素': ['維生素B', '維生素C', '維生素D'],
    '草本保健': ['人參', '薑黃', '綠茶萃取'],
    '礦物質': [],
    '益生菌': [],
    '眼部保健': [],
    '魚油/Omega-3': [],
    '膠原蛋白/美容保健': [],
    '女性保健': [],
    '關節/骨骼保健': [],
    '心血管保健': [],
    '消化/腸道保健': [],
    '免疫/抗氧化': [],
    '體力/精力保健': [],
    '其他特殊保健': []
  };

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

  const handleLogin = () => {
    navigate('/login');
  };

  const updateProductCount = (productId: string, change: number) => {
    const product = supplementData.find(p => p.id === productId);
    if (!product) return;

    const currentItem = cartItems.find(item => item.id === productId);
    const currentQuantity = currentItem ? currentItem.quantity : 0;
    const newQuantity = Math.max(0, currentQuantity + change);

    console.log('更新商品數量:', { productId, change, currentQuantity, newQuantity });

    if (newQuantity === 0 && currentItem) {
      // 如果數量變為0，從購物車移除
      removeFromCart(productId);
    } else if (newQuantity > 0) {
      if (currentItem) {
        // 更新現有商品數量
        updateQuantity(productId, newQuantity);
      } else {
        // 添加新商品到購物車
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: newQuantity,
          description: product.description
        });
      }
    }
  };

  // 創建 productCounts 對象以便傳遞給 ProductGrid
  const productCounts = cartItems.reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {} as Record<string, number>);

  console.log('當前購物車商品:', cartItems);
  console.log('商品數量映射:', productCounts);

  // Filter products based on category, price range, ratings, and search term
  let filteredProducts;
  
  if (selectedCategory === '所有商品') {
    filteredProducts = supplementData;
  } else {
    // 檢查是否為父分類
    const subcategories = categoryHierarchy[selectedCategory as keyof typeof categoryHierarchy];
    if (subcategories && subcategories.length > 0) {
      // 如果是父分類，顯示所有子分類的商品
      filteredProducts = supplementData.filter(product => 
        subcategories.includes(product.category)
      );
    } else {
      // 如果是子分類或一般分類，正常篩選
      filteredProducts = supplementData.filter(product => product.category === selectedCategory);
    }
  }

  // Apply price filter
  filteredProducts = filteredProducts.filter(product => 
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Apply rating filter
  if (selectedRatings.length > 0) {
    const minRating = Math.min(...selectedRatings);
    filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
  }

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case '價格低到高':
        return a.price - b.price;
      case '價格高到低':
        return b.price - a.price;
      case '評價高到低':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100">
      {/* 頂部導航 - 使用 Dashboard 的樣式 */}
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
              <Link to="/shopDetail">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 bg-blue-50 text-blue-600">
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
        
        {/* 搜尋欄 */}
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="搜尋保健品..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <Sidebar 
          categories={['所有商品', ...new Set(supplementData.map(item => item.category))]}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          selectedRatings={selectedRatings}
          onRatingsChange={setSelectedRatings}
        />
        
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">
              共找到 {sortedProducts.length} 項商品
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">排序</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded px-3 py-1 text-sm"
              >
                <option>綜合排序</option>
                <option>價格低到高</option>
                <option>價格高到低</option>
                <option>評價高到低</option>
              </select>
            </div>
          </div>

          <ProductGrid 
            products={sortedProducts}
            productCounts={productCounts}
            onUpdateCount={updateProductCount}
          />
        </main>
      </div>

      {/* 聊天按鈕 */}
      <ChatButton />
      
      {/* 購物車按鈕 */}
      <FloatingCartButton />
    </div>
  );
};

export default Index;