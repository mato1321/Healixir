import React from 'react';
import { Plus } from 'lucide-react';

// 類型定義
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  count: number;
  onUpdateCount: (change: number) => void;
}

interface ProductGridProps {
  products: Product[];
  productCounts: Record<string, number>;
  onUpdateCount: (productId: string, change: number) => void;
}

// 簡化的 Button 組件
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline';
}> = ({ children, onClick, className, variant = 'default' }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors";
  const variantStyle = variant === 'outline' 
    ? "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900"
    : "bg-blue-600 text-white hover:bg-blue-700";
  
  return (
    <button 
      className={`${baseStyle} ${variantStyle} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// 簡化的 Card 組件
const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className || ''}`}>
    {children}
  </div>
);

const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={`p-6 ${className || ''}`}>
    {children}
  </div>
);

// 星級評分組件
const StarRating: React.FC<{ 
  rating: number; 
  reviewCount: number; 
}> = ({ rating, reviewCount }) => (
  <div className="flex items-center space-x-1 mb-2">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
    <span className="text-xs text-gray-500">
      {rating} ({reviewCount})
    </span>
  </div>
);

// 商品卡片組件
const ProductCard: React.FC<ProductCardProps> = ({ product, count, onUpdateCount }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* 商品圖片 */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // 圖片載入失敗時的處理
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIj7llYblk4E8L3RleHQ+Cjwvc3ZnPgo=';
              }}
            />
          </div>
          
          {/* 商品資訊 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-1 text-sm overflow-hidden text-ellipsis" 
                style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  minHeight: '2.5rem'
                }}>
              {product.name}
            </h3>
            
            {product.description && (
              <p className="text-xs text-gray-600 mb-2 overflow-hidden text-ellipsis"
                 style={{ 
                   display: '-webkit-box',
                   WebkitLineClamp: 2,
                   WebkitBoxOrient: 'vertical'
                 }}>
                {product.description}
              </p>
            )}
            
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            
            {/* 價格 */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg font-bold text-gray-900">
                NT$ {product.price.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* 加入購物車按鈕或數量控制 */}
          <div className="flex items-center justify-center">
            {count === 0 ? (
              <Button
                onClick={() => onUpdateCount(1)}
                className="flex-1 rounded-full h-8 text-sm font-medium"
              >
                <Plus className="h-4 w-4 mr-1" />
                加入
              </Button>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => onUpdateCount(-1)}
                  className="h-10 w-10 rounded-full text-lg font-medium"
                >
                  -
                </Button>
                <span className="text-lg font-bold min-w-[2rem] text-center">
                  {count}
                </span>
                <Button
                  variant="outline"
                  onClick={() => onUpdateCount(1)}
                  className="h-10 w-10 rounded-full text-lg font-medium"
                >
                  +
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 商品網格組件 - 現在放在 ProductCard 之後定義
const ProductGrid: React.FC<ProductGridProps> = ({ products, productCounts, onUpdateCount }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">此分類暫無商品</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          count={productCounts[product.id] || 0}
          onUpdateCount={(change) => onUpdateCount(product.id, change)}
        />
      ))}
    </div>
  );
};

// 默認導出
export default ProductGrid;