import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const LightEnzymeProductPage = () => {
  const productInfo = {
    id: 'light-enzyme',
    name: '輕酵素',
    price: 1080,
    originalPrice: 1400,
    rating: 4.5,
    reviewCount: 145,
    category: '消化/腸胃保健',
    brand: '金博氏',
    description: '酵素＋益生菌複方，搭配蔬果多酚',
    capacity: '120錠/盒',
    ingredients: '酵素、益生菌、蔬果多酚、決明子萃取、羊角豆萃取、秋葵萃取等',
    usage: '每日2~4錠，分次飯後搭配開水食用；多食無益',
    images: [
      '/light_enzyme.ICO',
      '/light_enzymeb.ICO',
      '/light_enzymer.ICO'
    ],
    features: [
      '酵素＋益生菌複方',
      '搭配蔬果多酚',
      '決明子、秋葵萃取',
      '幫助維持消化道機能',
      '促進新陳代謝'
    ],
    suitableFor: [
      '一般成人',
      '孕哺期與特殊族群請先諮詢',
      '對特定植萃過敏者請評估'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default LightEnzymeProductPage;