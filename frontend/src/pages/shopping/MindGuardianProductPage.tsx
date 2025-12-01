import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const MindGuardianProductPage = () => {
  const productInfo = {
    id: 'mind-guardian',
    name: '精神守護者',
    price: 1680,
    originalPrice: 2180,
    rating: 4.7,
    reviewCount: 189,
    category: '體力/精力保健',
    brand: '金博氏',
    description: '含韓國製枳椇子萃取與B群、膽鹼、牛磺酸',
    capacity: '60粒/盒',
    ingredients: '枳椇子萃取、膽鹼、牛磺酸、維生素B群等',
    usage: '每日1–2次，每次1–2粒，飯後食用；多食無益',
    images: [
      '/mind_guardian.ICO',
      '/mind_guardianb.ICO',
      '/mind_guardianr.ICO',
      '/mind_guardianl.ICO'
    ],
    features: [
      '韓國製枳椇子萃取',
      '含B群、膽鹼、牛磺酸',
      '精神與代謝調理',
      '適合上班族'
    ],
    suitableFor: [
      '上班族',
      '需維持代謝者',
      '孕哺期請先諮詢',
      '咖啡因敏感者請注意'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default MindGuardianProductPage;