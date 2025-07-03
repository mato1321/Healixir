// 更新後的 FloatingCartButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

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

export default FloatingCartButton;