import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const ShieldDefenderProductPage = () => {
  const productInfo = {
    id: 'shield-defender',
    name: '神盾',
    price: 1780,
    originalPrice: 2300,
    rating: 4.8,
    reviewCount: 156,
    category: '免疫/抗氧化',
    brand: '金博氏',
    description: '高劑量酵母β-葡聚多醣，原料來自挪威',
    capacity: '30粒/盒',
    ingredients: '高劑量酵母β-葡聚多醣（約400mg/份）（依商品標示）',
    usage: '每日1次，每次1粒，飯後搭配開水；多食無益',
    images: [
      '/shield_defender.ICO',
      '/shield_defenderb.ICO',
      '/shield_defenderl.ICO',
      '/shield_defenderr.ICO',
      '/shield_defenderu.ICO'
    ],
    features: [
      '高劑量酵母β-葡聚多醣',
      '原料來自挪威',
      '高濃度高劑量配方',
      '調節生理機能、提升保護力'
    ],
    suitableFor: [
      '一般成人',
      '孕哺期與特殊族群請先諮詢'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default ShieldDefenderProductPage;