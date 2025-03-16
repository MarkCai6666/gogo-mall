'use client';

import { useState } from 'react';
import CouponSelector from '../components/CouponSelector';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// 模拟购物车数据
const cartItems: CartItem[] = [
  {
    id: '1',
    name: '泰国山竹',
    price: 299,
    quantity: 2,
    image: '/images/mangosteen.jpg'
  },
  {
    id: '2',
    name: '泰国椰青',
    price: 89,
    quantity: 3,
    image: '/images/coconut.jpg'
  }
];

export default function Checkout() {
  const router = useRouter();
  const [isCouponSelectorOpen, setIsCouponSelectorOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  // 计算商品总价
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // 计算优惠金额
  const discount = selectedCoupon
    ? selectedCoupon.type === 'fixed'
      ? selectedCoupon.value
      : Math.round(subtotal * (selectedCoupon.value / 100))
    : 0;

  // 计算最终支付金额
  const total = subtotal - discount;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">确认订单</h1>

      {/* 商品列表 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">商品清单</h2>
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-gray-500">
                  ฿{item.price} × {item.quantity}
                </div>
              </div>
              <div className="font-medium">฿{item.price * item.quantity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 优惠券 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsCouponSelectorOpen(true)}
        >
          <div>
            <h2 className="text-lg font-medium">优惠券</h2>
            <p className="text-gray-500 text-sm mt-1">
              {selectedCoupon
                ? `已选择：${selectedCoupon.description}`
                : '点击选择优惠券'}
            </p>
          </div>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* 金额明细 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">金额明细</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">商品总价</span>
            <span>฿{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">优惠金额</span>
            <span className="text-green-600">-฿{discount}</span>
          </div>
          <div className="flex justify-between text-lg font-medium">
            <span>实付金额</span>
            <span className="text-red-600">฿{total}</span>
          </div>
        </div>
      </div>

      {/* 提交订单按钮 */}
      <button
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700"
        onClick={() => router.push('/payment/123')}
      >
        提交订单
      </button>

      {/* 优惠券选择器 */}
      <CouponSelector
        isOpen={isCouponSelectorOpen}
        onClose={() => setIsCouponSelectorOpen(false)}
        onSelect={coupon => {
          setSelectedCoupon(coupon);
          setIsCouponSelectorOpen(false);
        }}
        totalAmount={subtotal}
        selectedCoupon={selectedCoupon}
      />
    </div>
  );
} 