import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const GoldCalciumPlusProductPage = () => {
  const productInfo = {
    id: 'gold-calcium-plus',
    name: '金鈣補力',
    price: 880,
    originalPrice: 1150,
    rating: 4.6,
    reviewCount: 178,
    category: '關節/骨頭保健',
    brand: '金博氏',
    description: '加拿大進口胺基酸螯合鈣，搭配D3、K2',
    capacity: '60錠/盒',
    ingredients: '胺基酸螯合鈣(含鈣約333. 33mg) 1041. 66mg、維生素D3 100 IU、維生素K 100 mcg',
    usage: '每日1錠，每日1–3次，配水吞食；一日請勿超過5錠',
    images: [
      '/gold_calcium_plus.ICO',
      '/gold_calcium_plusl.ICO',
      '/gold_calcium_plusr.ICO'
    ],
    features: [
      '加拿大進口胺基酸螯合鈣',
      '搭配維生素D3提升吸收',
      '添加維生素K2促進骨骼健康',
      '三合一鈣+D3+K2配方'
    ],
    suitableFor: [
      '需要補鈣與維生素D、K的成人',
      '關注骨骼健康者',
      '銀髮族群'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default GoldCalciumPlusProductPage;