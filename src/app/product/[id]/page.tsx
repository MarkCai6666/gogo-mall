'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, type Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = products.find((p: Product) => p.id === params.id);

  // 添加到购物车
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name[language],
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.common.productNotFound}</h1>
          <Link href="/" className="text-orange-500 hover:text-orange-600">
            {t.common.backToHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-gray-600 hover:text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <span className="text-lg font-medium">{t.common.productDetails}</span>
            <div className="w-6"></div>
          </div>
        </div>
      </nav>

      {/* 商品详情 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* 商品图片 */}
            <div className="md:w-1/2">
              <div className="relative h-96 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name[language]}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>

            {/* 商品信息 */}
            <div className="md:w-1/2 p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full ${
                      tag === "新品" ? "bg-blue-500 text-white" :
                      tag === "热销" ? "bg-red-500 text-white" :
                      tag === "特惠" ? "bg-orange-500 text-white" :
                      "bg-purple-500 text-white"
                    }`}
                  >
                    {t.tags[tag as keyof typeof t.tags]}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name[language]}</h1>
              <p className="text-sm text-gray-500 mb-4">{t.categories[product.category as keyof typeof t.categories]}</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl font-bold text-red-500">฿{product.price.toLocaleString()}</span>
                <span className="text-sm text-gray-400 line-through">฿{(product.price * 1.2).toFixed(2)}</span>
              </div>
              
              {/* 商品描述 */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">{t.common.description}</h2>
                <p className="text-gray-600">
                  {product.description ? product.description[language] : t.common.noDescription}
                </p>
              </div>

              {/* 数量选择 */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">{t.common.quantity}</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:border-orange-500 hover:text-orange-500"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:border-orange-500 hover:text-orange-500"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {t.common.addToCart}
                </button>
                <button className="flex-1 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                  {t.common.buyNow}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 