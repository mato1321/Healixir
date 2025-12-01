import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const YouBioticsProductPage = () => {
  const productInfo = {
    id: 'you-biotics',
    name: '優菌多',
    price: 720,
    originalPrice: 950,
    rating: 4.4,
    reviewCount: 198,
    category: '消化/腸胃保健',
    brand: '生達健生',
    description: '六菌合一有益菌，耐酸性與高活性配方',
    capacity: '100包/盒（3公克/包）',
    ingredients: '果寡糖、維生素C、L. fermentum、B. lactis、L.casei、B.longum、B.coagulans、木寡醣、β-胡蘿蔔素、酵母、維生素B2、B6',
    usage: '一日1~3次，一次1~2包；兒童減半；可加入牛奶或開水；多食無益',
    images: [
      '/you_biotics.ICO',
      '/you_bioticsl.ICO',
      '/you_bioticsr.ICO'
    ],
    features: [
      '六菌合一有益菌配方',
      '耐酸性與高活性',
      '幫助維持消化道機能',
      '使排便順暢',
      '全家人皆可食用'
    ],
    suitableFor: [
      '全家人',
      '兒童（用量減半）',
      '孕乳婦',
      '銀髮族'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default YouBioticsProductPage;