import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const DrkimSugarManagerProductPage = () => {
  const productInfo = {
    id: 'drkim-sugar-manager',
    name: '金博氏糖管家',
    price: 1680,
    originalPrice: 2180,
    rating: 4.7,
    reviewCount: 145,
    category: '心血管保健',
    brand: '金博氏',
    description: '專利定序苦瓜胜肽複方',
    capacity: '60粒/盒',
    ingredients: '苦瓜萃取物(定序19肽)、葫蘆巴籽萃取、肉桂萃取、松樹皮萃取、吡啶甲酸鉻等',
    usage: '每日2粒；一日請勿超過2粒，多食無益',
    images: [
      '/drkim_sugar_manager.ICO',
      '/drkim_sugar_managerb.ICO',
      '/drkim_sugar_manageru.ICO',
    ],
    features: [
      '專利定序苦瓜胜肽（定序19肽）',
      '複方配方：葫蘆巴籽、肉桂、松樹皮',
      '添加吡啶甲酸鉻',
      '維持醣類正常代謝'
    ],
    suitableFor: [
      '一般成人',
      '關注代謝健康者',
      '孕哺期、慢性病用藥者請先諮詢專業'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default DrkimSugarManagerProductPage;