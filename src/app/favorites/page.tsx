'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';
import { CartItem } from '@/types/cart';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  soldCount: number;
}

// 模拟收藏数据
const mockFavorites: Product[] = [
  {
    id: '1',
    name: '泰国金枕头榴莲',
    price: 499,
    originalPrice: 599,
    image: '/images/durian.jpg',
    soldCount: 2341
  },
  {
    id: '2',
    name: '泰国椰青',
    price: 89,
    image: '/images/coconut.jpg',
    soldCount: 1532
  },
  {
    id: '3',
    name: '泰国山竹',
    price: 299,
    originalPrice: 359,
    image: '/images/mangosteen.jpg',
    soldCount: 892
  }
];

export default function Favorites() {
  const [favorites, setFavorites] = useState<Product[]>(mockFavorites);
  const { addToCart } = useCart();

  // 移除收藏
  const removeFavorite = (productId: string) => {
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  // 添加到购物车
  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
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
          {favorites.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 flex">
                {/* 商品图片 */}
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* 商品信息 */}
                <div className="ml-4 flex-1">
                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="text-base font-medium line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center">
                      <span className="text-red-600 text-lg font-medium">
                        ฿{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-gray-400 text-sm line-through">
                          ฿{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      已售 {product.soldCount}
                    </div>
                  </Link>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                  >
                    加入购物车
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {favorites.length === 0 && (
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