
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  count: number;
  onUpdateCount: (change: number) => void;
}

export const ProductCard = ({ product, count, onUpdateCount }: ProductCardProps) => {
  const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => (
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem] text-sm">
              {product.name}
            </h3>
            
            {product.description && (
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {product.description}
              </p>
            )}
            
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            
            {/* Price */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg font-bold text-gray-900">
                NT$ {product.price.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Add to Cart Button or Quantity Controls */}
          <div className="flex items-center justify-center">
            {count === 0 ? (
              <Button
                onClick={() => onUpdateCount(1)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full h-8 text-sm font-medium"
              >
                <Plus className="h-4 w-4 mr-1" />
                加入
              </Button>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => onUpdateCount(-1)}
                  className="h-10 w-10 rounded-full border-gray-300 text-lg font-medium"
                >
                  -
                </Button>
                <span className="text-lg font-bold min-w-[2rem] text-center">
                  {count}
                </span>
                <Button
                  variant="outline"
                  onClick={() => onUpdateCount(1)}
                  className="h-10 w-10 rounded-full border-gray-300 text-lg font-medium"
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
