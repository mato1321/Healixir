import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const JyanyehFishOilProductPage = () => {
  const productInfo = {
    id: 'jyanyeh-fish-oil',
    name: '健業魚油',
    price: 980,
    originalPrice: 1280,
    rating: 4.6,
    reviewCount: 267,
    category: '心血管保健',
    brand: '健業生技',
    description: '高濃度Omega-3，魚油含量99. 6%',
    capacity: '60粒/瓶',
    ingredients: '高濃度魚油（Omega-3脂肪酸80%以上）、維生素E(抗氧化劑)',
    usage: '每日1–2次，每次1–2粒，餐後搭配開水食用；多食無益',
    images: [
      '/jyanyeh_fish_oil.ICO',
      '/jyanyeh_fish_oilb.ICO',
      '/jyanyeh_fish_oilr.ICO'
    ],
    features: [
      '魚油含量標示99.6%',
      '高濃度Omega-3（80%以上）',
      '添加維生素E穩定活性',
      '守護心血管健康'
    ],
    suitableFor: [
      '一般成人',
      '關注心血管健康者',
      '孕哺期、服用抗凝血藥物者請先諮詢',
      '魚類過敏者不適用'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default JyanyehFishOilProductPage;