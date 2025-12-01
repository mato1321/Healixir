import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const GoldenGlowProductPage = () => {
  const productInfo = {
    id: 'golden-glow',
    name: '金緻妍',
    price: 1680,
    originalPrice: 2180,
    rating: 4.7,
    reviewCount: 234,
    category: '膠原蛋白/美容保健',
    brand: '金博氏',
    description: '七合一複方，小分子膠原蛋白粉',
    capacity: '5g×30包/盒',
    ingredients: '小分子膠原蛋白(PO. OG雙胜肽)、紅石榴萃取物、金絲燕窩萃取、余甘子萃取、賽洛美、玻尿酸、維生素C等',
    usage: '每日1–2包，可直接入口或搭配溫冷開水；多食無益',
    images: [
      '/golden_glow.ICO',
      '/golden_glowb.ICO',
      '/golden_glowl.ICO',
      '/golden_glowr.ICO',
    ],
    features: [
      '七合一複方配方',
      '小分子膠原蛋白(PO.OG雙胜肽)',
      '紅石榴、金絲燕窩萃取',
      '玻尿酸、維生素C',
      '可直接食用或沖調'
    ],
    suitableFor: [
      '一般成人',
      '關注美容保養者',
      '孕哺期與海鮮過敏者請先諮詢',
      '含牛奶、魚類製品過敏者不適用'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default GoldenGlowProductPage;