import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const BaojianHealthRelaxProductPage = () => {
  const productInfo = {
    id: 'baojian-health-relax',
    name: '保健一生保通暢',
    price: 1180,
    originalPrice: 1580,
    rating: 4.5,
    reviewCount: 123,
    category: '心血管保健',
    brand: '保健一生',
    description: 'L-精胺酸配方，搭配丹蔘、松樹皮等植萃',
    capacity: '30包/盒',
    ingredients: 'L-精胺酸、丹蔘萃取物、松樹皮萃取物、L-麩醯胺酸、維生素C',
    usage: '每日1包，搭配開水食用',
    images: [
      '/baojian_health_relax.ICO',
      '/baojian_health_relaxd.ICO',  // 移除空格
      '/baojian_health_relaxl.ICO',  // 移除空格
      '/baojian_health_relaxr.ICO'   // 移除空格
    ],
    features: [
      '粉末劑型，方便食用',
      '含L-精胺酸主配方',
      '搭配丹蔘、松樹皮等植萃',
      '幫助維持循環與代謝'
    ],
    suitableFor: [
      '一般成人',
      '關注循環保健者',
      '孕哺期與慢性病用藥者請先諮詢'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default BaojianHealthRelaxProductPage;