'use client';

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Coupon {
  id: string;
  code: string;
  type: 'fixed' | 'percentage';
  value: number;
  minAmount: number;
  validFrom: string;
  validUntil: string;
  description: string;
}

interface CouponSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (coupon: Coupon | null) => void;
  totalAmount: number;
  selectedCoupon: Coupon | null;
}

// 模拟可用优惠券数据
const availableCoupons: Coupon[] = [
  {
    id: '1',
    code: 'NEW100',
    type: 'fixed',
    value: 100,
    minAmount: 500,
    validFrom: '2024-03-01',
    validUntil: '2024-04-30',
    description: '新用户专享优惠券'
  },
  {
    id: '2',
    code: 'FRUIT20',
    type: 'percentage',
    value: 20,
    minAmount: 200,
    validFrom: '2024-03-15',
    validUntil: '2024-03-31',
    description: '水果品类8折优惠'
  }
];

export default function CouponSelector({
  isOpen,
  onClose,
  onSelect,
  totalAmount,
  selectedCoupon
}: CouponSelectorProps) {
  // 格式化优惠金额显示
  const formatValue = (coupon: Coupon) => {
    if (coupon.type === 'fixed') {
      return `฿${coupon.value}`;
    } else {
      return `${coupon.value}%`;
    }
  };

  // 计算优惠金额
  const calculateDiscount = (coupon: Coupon) => {
    if (coupon.type === 'fixed') {
      return coupon.value;
    } else {
      return Math.round(totalAmount * (coupon.value / 100));
    }
  };

  // 检查优惠券是否可用
  const isCouponAvailable = (coupon: Coupon) => {
    return totalAmount >= coupon.minAmount;
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="border-b px-4 py-3 flex items-center justify-between"
                >
                  <h3 className="text-lg font-medium">选择优惠券</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </Dialog.Title>

                <div className="px-4 py-4">
                  {/* 不使用优惠券选项 */}
                  <div
                    className={`p-3 border rounded-lg mb-3 cursor-pointer ${
                      selectedCoupon === null
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                    onClick={() => onSelect(null)}
                  >
                    <div className="font-medium">不使用优惠券</div>
                  </div>

                  {/* 优惠券列表 */}
                  <div className="space-y-3">
                    {availableCoupons.map(coupon => {
                      const isAvailable = isCouponAvailable(coupon);
                      return (
                        <div
                          key={coupon.id}
                          className={`p-3 border rounded-lg cursor-pointer ${
                            !isAvailable
                              ? 'opacity-50 cursor-not-allowed'
                              : selectedCoupon?.id === coupon.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-500'
                          }`}
                          onClick={() => isAvailable && onSelect(coupon)}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">{coupon.description}</div>
                            <div className="text-blue-600 font-medium">
                              {formatValue(coupon)}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            满{coupon.minAmount}可用
                            {isAvailable && (
                              <span className="ml-2">
                                可减{calculateDiscount(coupon)}泰铢
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {coupon.validFrom} 至 {coupon.validUntil}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {availableCoupons.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      暂无可用优惠券
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 