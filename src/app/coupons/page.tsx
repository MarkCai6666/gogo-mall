'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Coupon {
  id: string;
  code: string;
  type: 'fixed' | 'percentage';
  value: number;
  minAmount: number;
  validFrom: string;
  validUntil: string;
  description: string;
  isUsed: boolean;
  isExpired: boolean;
}

// 模拟优惠券数据
const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'NEW100',
    type: 'fixed',
    value: 100,
    minAmount: 500,
    validFrom: '2024-03-01',
    validUntil: '2024-04-30',
    description: '新用户专享优惠券',
    isUsed: false,
    isExpired: false
  },
  {
    id: '2',
    code: 'FRUIT20',
    type: 'percentage',
    value: 20,
    minAmount: 200,
    validFrom: '2024-03-15',
    validUntil: '2024-03-31',
    description: '水果品类8折优惠',
    isUsed: false,
    isExpired: false
  },
  {
    id: '3',
    code: 'MARCH50',
    type: 'fixed',
    value: 50,
    minAmount: 300,
    validFrom: '2024-03-01',
    validUntil: '2024-03-31',
    description: '三月特惠券',
    isUsed: true,
    isExpired: false
  }
];

export default function Coupons() {
  const [activeTab, setActiveTab] = useState<'available' | 'used' | 'expired'>('available');

  // 过滤优惠券
  const filteredCoupons = mockCoupons.filter(coupon => {
    switch (activeTab) {
      case 'available':
        return !coupon.isUsed && !coupon.isExpired;
      case 'used':
        return coupon.isUsed;
      case 'expired':
        return coupon.isExpired;
      default:
        return true;
    }
  });

  // 格式化金额显示
  const formatValue = (coupon: Coupon) => {
    if (coupon.type === 'fixed') {
      return `฿${coupon.value}`;
    } else {
      return `${coupon.value}%`;
    }
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
            <h1 className="ml-4 text-lg font-medium">我的优惠券</h1>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white mb-2">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('available')}
              className={`py-3 px-6 text-sm font-medium ${
                activeTab === 'available'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
            >
              可使用
            </button>
            <button
              onClick={() => setActiveTab('used')}
              className={`py-3 px-6 text-sm font-medium ${
                activeTab === 'used'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
            >
              已使用
            </button>
            <button
              onClick={() => setActiveTab('expired')}
              className={`py-3 px-6 text-sm font-medium ${
                activeTab === 'expired'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
            >
              已过期
            </button>
          </div>
        </div>
      </div>

      {/* 优惠券列表 */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {filteredCoupons.map(coupon => (
            <div
              key={coupon.id}
              className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                coupon.isUsed || coupon.isExpired ? 'opacity-60' : ''
              }`}
            >
              <div className="flex">
                {/* 左侧金额 */}
                <div className="w-32 bg-blue-600 text-white p-4 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold">
                    {formatValue(coupon)}
                  </div>
                  <div className="text-sm mt-1">
                    满{coupon.minAmount}可用
                  </div>
                </div>

                {/* 右侧信息 */}
                <div className="flex-1 p-4">
                  <div className="text-sm font-medium mb-1">
                    {coupon.description}
                  </div>
                  <div className="text-xs text-gray-500">
                    {coupon.validFrom} 至 {coupon.validUntil}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    优惠码：{coupon.code}
                  </div>
                </div>

                {/* 使用状态 */}
                {(coupon.isUsed || coupon.isExpired) && (
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div className="absolute transform rotate-45 bg-gray-500 text-white text-xs py-1 right-[-35px] top-[12px] w-[100px] text-center">
                      {coupon.isUsed ? '已使用' : '已过期'}
                    </div>
                  </div>
                )}
              </div>

              {/* 使用规则 */}
              <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">
                使用规则：满{coupon.minAmount}泰铢可用，不可与其他优惠同时使用
              </div>
            </div>
          ))}
        </div>

        {filteredCoupons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">暂无优惠券</div>
          </div>
        )}
      </div>
    </div>
  );
} 