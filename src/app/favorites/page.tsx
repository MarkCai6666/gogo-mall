'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';
import { CartItem } from '@/types/cart';
import { Product } from '@/data/products';
import { useLanguage } from '@/i18n/LanguageContext';

// 模拟收藏数据
const mockFavorites: Product[] = [
  {
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
  },
  {
    id: '2',
    name: {
      th: 'เสื้อแจ็คเก็ตขนเป็ด',
      zh: '轻薄羽绒服',
      en: 'Light Down Jacket'
    },
    price: 1990,
    image: '/images/products/downjacket.png',
    category: '服装配饰',
    tags: ['热销', '特惠'],
    description: {
      th: 'เสื้อแจ็คเก็ตขนเป็ดน้ำหนักเบา',
      zh: '轻薄保暖羽绒服',
      en: 'Lightweight warm down jacket'
    }
  }
];

export default function Favorites() {
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1
    };
    addToCart(cartItem);
    toast.success('已添加到购物车');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4 flex items-center">
            <Link href="/profile" className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="ml-4 text-lg font-medium">我的收藏</h1>
          </div>
        </div>
      </div>

      {/* 商品列表 */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {mockFavorites.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name[language]}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-medium mb-2">
                  {product.name[language]}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-red-600 font-medium">฿{product.price.toLocaleString()}</div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    加入购物车
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockFavorites.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="text-gray-500">暂无收藏商品</div>
            <Link
              href="/"
              className="mt-4 inline-block px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              去逛逛
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 