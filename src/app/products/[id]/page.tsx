'use client';

import { useState } from 'react';
import Image from 'next/image';
import AddToCartButton from '@/app/components/AddToCartButton';
import FavoriteButton from '@/app/components/FavoriteButton';
import CartIcon from '@/app/components/CartIcon';
import { Product } from '@/data/products';
import { useLanguage } from '@/i18n/LanguageContext';

const product: Product = {
  id: '1',
  name: {
    th: 'iPhone 15 Pro',
    zh: 'iPhone 15 Pro',
    en: 'iPhone 15 Pro'
  },
  price: 41900,
  image: '/images/products/iphone15pro.png',
  category: '手机数码',
  tags: ['新品', '热销'],
  description: {
    th: 'iPhone 15 Pro รุ่นใหม่ล่าสุด',
    zh: 'iPhone 15 Pro 最新款',
    en: 'Latest iPhone 15 Pro'
  }
};

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4 flex items-center justify-between">
            <button onClick={() => window.history.back()} className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <CartIcon />
          </div>
        </div>
      </nav>

      {/* 商品详情 */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* 商品图片 */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="relative h-[300px]">
            <Image
              src={selectedImage}
              alt={product.name[language]}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 商品信息 */}
        <div className="mt-6 bg-white rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-medium">{product.name[language]}</h2>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-medium text-red-600">
                  ฿{product.price.toLocaleString()}
                </span>
              </div>
            </div>
            <FavoriteButton productId={product.id} />
          </div>
          <p className="mt-4 text-gray-600">
            {product.description ? product.description[language] : '暂无描述'}
          </p>
        </div>

        {/* 底部操作栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-3xl mx-auto px-4">
            <div className="py-4 flex space-x-4">
              <AddToCartButton product={product} />
              <button className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
                立即购买
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 