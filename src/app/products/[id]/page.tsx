'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/app/components/AddToCartButton';
import FavoriteButton from '@/app/components/FavoriteButton';
import CartIcon from '@/app/components/CartIcon';

// 模拟商品数据
const product = {
  id: '1',
  name: '泰国金枕头榴莲',
  price: 499,
  originalPrice: 599,
  description: '新鲜采摘的金枕头榴莲，果肉饱满，口感细腻，香甜浓郁。',
  image: '/images/durian.jpg',
  images: [
    '/images/durian.jpg',
    '/images/durian-2.jpg',
    '/images/durian-3.jpg',
  ],
  specs: [
    { name: '规格', value: '2-3斤/个' },
    { name: '产地', value: '泰国' },
    { name: '保质期', value: '7天' },
    { name: '储存方式', value: '0-4℃冷藏' }
  ]
};

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4 flex items-center justify-between">
            <Link href="/" className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-lg font-medium">商品详情</h1>
            <CartIcon />
          </div>
        </div>
      </div>

      {/* 商品信息 */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg overflow-hidden">
          {/* 商品图片 */}
          <div className="relative aspect-square">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* 缩略图列表 */}
          <div className="p-4 flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`w-16 h-16 relative rounded-lg overflow-hidden ${
                  selectedImage === image ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name}-${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* 商品信息 */}
          <div className="p-4 border-t">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-medium">{product.name}</h2>
                <div className="mt-2 flex items-baseline">
                  <span className="text-2xl font-medium text-red-600">
                    ฿{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-gray-400 line-through">
                      ฿{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <FavoriteButton productId={product.id} />
            </div>
            <p className="mt-4 text-gray-600">{product.description}</p>
          </div>

          {/* 商品规格 */}
          <div className="p-4 border-t">
            <h3 className="text-lg font-medium mb-4">商品规格</h3>
            <div className="space-y-2">
              {product.specs.map((spec, index) => (
                <div key={index} className="flex">
                  <span className="w-20 text-gray-500">{spec.name}</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
  );
} 