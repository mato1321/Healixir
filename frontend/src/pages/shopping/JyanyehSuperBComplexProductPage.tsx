import React from 'react';
import ProductDetailTemplate from '@/components/ProductDetailTemplate';

const JyanyehSuperBComplexProductPage = () => {
  const productInfo = {
    id: 'jyanyeh-super-b-complex',
    name: '健業超級B群',
    price: 600,
    originalPrice: 800,
    rating: 4.6,
    reviewCount: 223,
    category: '體力/精力保健',
    brand: '健業生技',
    description: '高單位B群並添加維他命C',
    capacity: '30錠/瓶；60錠/瓶',
    ingredients: '維生素B1、B2、B6、B12、葉酸、泛酸等B群＋維生素C（500mg）',
    usage: '每日1錠，或依專業建議；多食無益',
    images: [
      '/jyanyeh_super_b_complex.ICO',
      '/jyanyeh_super_b_complexl.ICO',
      '/jyanyeh_super_b_complexr.ICO'
    ],
    features: [
      '高單位B群配方',
      '添加維他命C（500mg）',
      '能量代謝、增強體力',
      '協助代謝與抗氧化',
      '尿液偏黃屬B2正常現象'
    ],
    suitableFor: [
      '應酬多、壓力大者',
      '需要精神體力者',
      '上班族、學生'
    ]
  };

  return <ProductDetailTemplate productInfo={productInfo} />;
};

export default JyanyehSuperBComplexProductPage;