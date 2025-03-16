'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // 确保在客户端渲染后再显示内容
  useEffect(() => {
    setMounted(true);
    console.log('Cart items:', items); // 调试日志
  }, [items]);

  // 在客户端渲染之前返回加载状态
  if (!mounted) {
    return <div>Loading...</div>;
  }

  // 切换商品选中状态
  const toggleSelect = (productId: string) => {
    setSelectedItems(current =>
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId]
    );
  };

  // 切换全选状态
  const toggleSelectAll = () => {
    setSelectedItems(current =>
      current.length === items.length ? [] : items.map(item => item.id)
    );
  };

  // 计算选中商品总金额
  const selectedTotal = items
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 调整商品数量
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="ml-4 text-lg font-medium">购物车</h1>
            </div>
            {items.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('确定要清空购物车吗？')) {
                    items.forEach(item => removeFromCart(item.id));
                  }
                }}
                className="text-sm text-gray-500"
              >
                清空购物车
              </button>
            )}
          </div>
        </div>
      </div>

      {items.length > 0 ? (
        <>
          {/* 商品列表 */}
          <div className="max-w-3xl mx-auto px-4 py-6">
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 flex items-center">
                    {/* 选择框 */}
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />

                    {/* 商品图片 */}
                    <div className="ml-4 w-20 h-20 relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* 商品信息 */}
                    <div className="ml-4 flex-1">
                      <Link href={`/products/${item.id}`} className="block">
                        <h3 className="text-base font-medium line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="mt-2 text-red-600 text-lg font-medium">
                          ฿{item.price}
                        </div>
                      </Link>
                    </div>

                    {/* 数量调整 */}
                    <div className="ml-4 flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 border rounded-l"
                      >
                        -
                      </button>
                      <span className="w-12 h-8 flex items-center justify-center border-t border-b">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 border rounded-r"
                      >
                        +
                      </button>
                    </div>

                    {/* 删除按钮 */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-gray-400 hover:text-gray-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 底部结算栏 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
            <div className="max-w-3xl mx-auto px-4">
              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === items.length && items.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">全选</span>
                  <span className="ml-4 text-sm">
                    合计：
                    <span className="text-red-600 text-lg font-medium">
                      ฿{selectedTotal}
                    </span>
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (selectedItems.length === 0) {
                      alert('请选择要结算的商品');
                      return;
                    }
                    router.push('/checkout');
                  }}
                  className={`px-6 py-2 rounded-full text-white font-medium ${
                    selectedItems.length > 0
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400'
                  }`}
                >
                  结算({selectedItems.length})
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // 空购物车状态
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div className="text-gray-500 mb-4">购物车是空的</div>
          <Link
            href="/"
            className="inline-block px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            去逛逛
          </Link>
        </div>
      )}
    </div>
  );
} 