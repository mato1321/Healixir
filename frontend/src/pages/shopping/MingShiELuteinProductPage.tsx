import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const MingShiELuteinProductPage = () => {
  const productInfo = {
    id: 'ming-shi-e-lutein',
    name: '明適E葉黃素',
    price: 1280,
    originalPrice: 1680,
    rating: 4.7,
    reviewCount: 234,
    category: '眼部保健',
    brand: '健業生技',
    description: '採用美國專利FloraGLO®游離型葉黃素，小分子好吸收',
    capacity: '60粒/盒',
    ingredients: '金盞花萃取物(含葉黃素)、玉米黃素、決明子、葡萄子萃取物、小米草萃取物、茄紅素、L-蛋胺酸、玻尿酸、山桑子萃取物',
    usage: '每日1次，每次1–2粒，飯後搭配開水；多食無益',
    images: [
      '/ming_shi_e_lutein.ICO',
      '/ming_shi_e_luteinl.ICO',
      '/ming_shi_e_luteinr.ICO'
    ],
    features: [
      '採用美國專利FloraGLO®游離型葉黃素',
      '小分子好吸收配方',
      '適合長時間使用3C族群',
      '含玉米黃素、山桑子等複方成分'
    ],
    suitableFor: [
      '長時間使用3C產品者',
      '上班族、學生',
      '銀髮族',
      '需要眼部保健者'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default MingShiELuteinProductPage;