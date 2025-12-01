import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const GuardProbioticsProductPage = () => {
  const productInfo = {
    id: 'guard-probiotics',
    name: '保衛菌',
    price: 1380,
    originalPrice: 1780,
    rating: 4.7,
    reviewCount: 167,
    category: '消化/腸胃保健',
    brand: '金博氏',
    description: '高純度β-葡聚多醣與褐藻多醣複方',
    capacity: '30包/盒',
    ingredients: 'β-1,3/1,6酵母葡聚多醣體（高純度）、褐藻多醣體、益生菌等',
    usage: '每日1包，搭配溫開水；多食無益',
    images: [
      '/guard_probiotics.ICO',
      '/guard_probioticsb.ICO',
      '/guard_probioticsl.ICO',
      '/guard_probioticsr.ICO'
    ],
    features: [
      '高純度β-葡聚多醣體',
      '褐藻多醣複方',
      '營養補給、調節生理機能',
      '提升保護力'
    ],
    suitableFor: [
      '一般成人',
      '孕哺期與特殊族群請先諮詢'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default GuardProbioticsProductPage;