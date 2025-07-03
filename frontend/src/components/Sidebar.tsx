
import { cn } from '@/lib/utils';
import { ChevronRight, Filter } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedRatings: number[];
  onRatingsChange: (ratings: number[]) => void;
}

export const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  priceRange,
  onPriceRangeChange,
  selectedRatings,
  onRatingsChange
}: SidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['維生素']);

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

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleRatingChange = (rating: number) => {
    onRatingsChange(
      selectedRatings.includes(rating)
        ? selectedRatings.filter(r => r !== rating)
        : [...selectedRatings, rating]
    );
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={cn(
            "text-sm",
            star <= rating ? "text-yellow-400" : "text-gray-300"
          )}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <aside className="w-80 bg-white shadow-sm border-r border-gray-200 h-screen overflow-y-auto sticky top-0">
      <div className="p-6">
        {/* Categories Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">商品分類</h3>
          
          <nav className="space-y-1 max-h-96 overflow-y-auto">
            <button
              onClick={() => onCategorySelect('所有商品')}
              className={cn(
                "w-full text-left px-3 py-2 rounded text-sm transition-colors",
                selectedCategory === '所有商品'
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-blue-600 hover:bg-gray-50"
              )}
            >
              所有商品
            </button>
            
            {Object.entries(categoryHierarchy).map(([category, subcategories]) => (
              <div key={category}>
                <div className="flex items-center">
                  <button
                    onClick={() => onCategorySelect(category)}
                    className={cn(
                      "flex-1 text-left px-3 py-2 rounded text-sm transition-colors",
                      selectedCategory === category
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {category}
                  </button>
                  {subcategories.length > 0 && (
                    <button
                      onClick={() => toggleCategory(category)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight 
                        className={cn(
                          "h-4 w-4 text-gray-400 transition-transform",
                          expandedCategories.includes(category) && "rotate-90"
                        )}
                      />
                    </button>
                  )}
                </div>
                
                {expandedCategories.includes(category) && subcategories.length > 0 && (
                  <div className="ml-4 mt-1 space-y-1">
                    {subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() => onCategorySelect(subcategory)}
                        className={cn(
                          "block w-full text-left px-3 py-1 rounded text-sm transition-colors",
                          selectedCategory === subcategory
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-4 w-4 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">篩選條件</h3>
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">價格範圍</h4>
            <div className="text-sm text-gray-600 mb-2">
              NT$ {priceRange[0]} - NT$ {priceRange[1]}
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[0]}
                onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">評價</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2].map((rating) => (
                <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <StarRating rating={rating} />
                  <span className="text-sm text-gray-600">以上</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
