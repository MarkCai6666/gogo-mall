'use client';

import { useState } from 'react';
import CouponSelector from '../components/CouponSelector';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/types/cart';
import { useLanguage } from '@/i18n/LanguageContext';

// 模拟购物车数据
const cartItems: CartItem[] = [
  {
    id: '1',
    name: {
      th: 'ไอโฟน 15 โปร',
      zh: 'iPhone 15 Pro',
      en: 'iPhone 15 Pro'
    },
    price: 299,
    quantity: 2,
    image: '/images/mangosteen.jpg',
    category: '手机数码',
    tags: ['新品', '热销']
  },
  {
    id: '2',
    name: {
      th: 'เสื้อกันหนาวบาง',
      zh: '轻薄羽绒服',
      en: 'Light Down Jacket'
    },
    price: 89,
    quantity: 3,
    image: '/images/coconut.jpg',
    category: '服装配饰',
    tags: ['热销', '特惠']
  }
];

export default function Checkout() {
  const router = useRouter();
  const { t, language } = useLanguage();
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
      <h1 className="text-2xl font-bold mb-8">{t.common.confirmOrder}</h1>

      {/* 商品列表 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">{t.common.itemList}</h2>
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center">
              <img
                src={item.image}
                alt={item.name[language]}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <div className="font-medium">{item.name[language]}</div>
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
            <h2 className="text-lg font-medium">{t.common.coupon}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {selectedCoupon
                ? `${t.common.selected}：${selectedCoupon.description}`
                : t.common.selectCoupon}
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
        <h2 className="text-lg font-medium mb-4">{t.common.amountDetails}</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">{t.common.subtotal}</span>
            <span>฿{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t.common.discount}</span>
            <span className="text-green-600">-฿{discount}</span>
          </div>
          <div className="flex justify-between text-lg font-medium">
            <span>{t.common.total}</span>
            <span className="text-red-600">฿{total}</span>
          </div>
        </div>
      </div>

      {/* 提交订单按钮 */}
      <button
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700"
        onClick={() => router.push('/payment/123')}
      >
        {t.common.submitOrder}
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