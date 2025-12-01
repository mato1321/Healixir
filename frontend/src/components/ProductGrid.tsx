import React from 'react';
import ProductCard from './ProductCard';

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

interface ProductGridProps {
  products: Product[];
  productCounts: Record<string, number>;
  onUpdateCount: (productId: string, change: number) => void;
}

const ProductGrid: React. FC<ProductGridProps> = ({
  products,
  productCounts,
  onUpdateCount,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">沒有找到符合條件的商品</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products. map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          category={product.category}
          price={product.price}
          rating={product.rating}
          reviewCount={product.reviewCount}
          image={product.image}
          quantity={productCounts[product.id] || 0}
          onUpdateCount={(change) => onUpdateCount(product.id, change)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;