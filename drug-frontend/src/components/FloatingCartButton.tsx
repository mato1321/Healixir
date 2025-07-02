import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const FloatingCartButton = () => {
  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Link to="/cart">
        <Button
          className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group relative"
        >
          <ShoppingCart className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          
          {/* 可選：商品數量徽章 */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default FloatingCartButton;