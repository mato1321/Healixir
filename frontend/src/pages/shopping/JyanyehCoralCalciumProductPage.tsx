import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const JyanyehCoralCalciumProductPage = () => {
  const productInfo = {
    id: 'jyanyeh-coral-calcium',
    name: '健業珊瑚鈣',
    price: 850,
    originalPrice: 1100,
    rating: 4.5,
    reviewCount: 156,
    category: '關節/骨頭保健',
    brand: '健業生技',
    description: '加拿大進口，添加D3與CPP',
    capacity: '60錠 / 180錠',
    ingredients: '珊瑚鈣、鎂、維他命D3、酪蛋白磷酸胜肽(CPP)',
    usage: '成人每日1–2錠，或依專業人員建議食用（多食無益）',
    images: [
      '/jyanyeh_coral_calcium.ICO',
      '/jyanyeh_coral_calciumb.ICO',
      '/jyanyeh_coral_calciuml.ICO',
    ],
    features: [
      '加拿大進口珊瑚鈣',
      '每錠鈣含量500mg',
      '添加維生素D3幫助吸收',
      '含酪蛋白磷酸胜肽(CPP)',
      '奶素可食'
    ],
    suitableFor: [
      '需要補充鈣質者',
      '關注骨骼健康者',
      '成長中的青少年',
      '中高齡族群'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default JyanyehCoralCalciumProductPage;