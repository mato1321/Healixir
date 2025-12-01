import React from 'react';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  quantity: number;
  onUpdateCount: (change: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  price,
  rating,
  reviewCount,
  image,
  quantity,
  onUpdateCount,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log('導航到商品詳細頁:', id);
    navigate(`/product/${id}`);
  };

  const handleAddToCart = () => {
    console.log('加入購物車:', id);
    onUpdateCount(1);
  };

  const handleIncrement = () => {
    console.log('增加數量:', id);
    onUpdateCount(1);
  };

  const handleDecrement = () => {
    console.log('減少數量:', id);
    onUpdateCount(-1);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* 圖片區域 - 可點擊進入詳細頁 */}
      <div 
        onClick={handleCardClick}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 aspect-square cursor-pointer group"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300? text=Product+Image';
          }}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {category}
        </div>
      </div>

      {/* 商品資訊區域 */}
      <div className="p-6">
        {/* 商品名稱 - 可點擊進入詳細頁 */}
        <h3 
          onClick={handleCardClick}
          className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
        >
          {name}
        </h3>

        {/* 評分 */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* 價格 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            NT$ {price.toLocaleString()}
          </span>
        </div>

        {/* 購物車操作區域 */}
        <div className="flex items-center space-x-2">
          {quantity > 0 ? (
            // ★ 已加入購物車 → 只顯示增減按鈕
            <div className="flex items-center justify-center space-x-4 w-full">
              <button
                onClick={handleDecrement}
                className="h-9 w-9 rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-700" />
              </button>

              <span className="text-lg font-semibold min-w-[30px] text-center">
                {quantity}
              </span>

              <button
                onClick={handleIncrement}
                className="h-9 w-9 rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          ) : (
            // ★ 尚未加入購物車 → 顯示完整加入購物車按鈕
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-10 rounded-lg font-semibold transition-all flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              加入購物車
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;