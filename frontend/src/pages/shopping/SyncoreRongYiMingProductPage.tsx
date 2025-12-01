import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const SyncoreRongYiMingProductPage = () => {
  const productInfo = {
    id: 'syncore-rong-yi-ming',
    name: '杏國蓉易明',
    price: 1680,
    originalPrice: 2180,
    rating: 4.8,
    reviewCount: 189,
    category: '眼部保健',
    brand: '杏國新藥',
    description: '新一代葉黃素複方，雙劑型設計',
    capacity: '30日份雙劑型（A 30粒 + B 30粒）',
    ingredients: 'A. 葉黃素軟膠囊：葉黃素20%、魚油DHA、維生素E；B.複方膠囊：管花肉蓯蓉萃取物、智利酒果萃取物、維生素B6',
    usage: '成人每日 A+B 各1粒，飯後食用；多食無益',
    images: [
      '/SynCore_rong_yi_mingb.ICO',
      '/SynCore_rong_yi_mingl.ICO'
    ],
    features: [
      '新一代葉黃素複方配方',
      '雙劑型設計，A+B協同作用',
      '2021年國際發明雙金獎',
      '適合經常使用3C者'
    ],
    suitableFor: [
      '經常使用3C產品者',
      '中高齡族群',
      '需深度眼部保養者'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default SyncoreRongYiMingProductPage;