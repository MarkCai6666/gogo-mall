'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useLanguage } from '@/i18n/LanguageContext';

// 支付方式类型
type PaymentMethod = 'promptpay' | 'credit_card' | 'bank_transfer';

// 模拟获取订单数据
const fetchOrderData = async (orderId: string) => {
  // 模拟 API 请求延迟
  const response = await new Promise(resolve => setTimeout(() => {
    resolve({
      id: orderId,
      total: 35900,
      items: [
        {
          id: '1',
          name: 'iPhone 15 Pro Max 256GB 原色钛金属',
          price: 35900,
          quantity: 1,
          image: '/images/products/iphone15.jpg'
        }
      ]
    });
  }, 500));
  return response;
};

export default function PaymentClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('promptpay');
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 支付方式配置
  const paymentMethods = [
    {
      id: 'promptpay' as PaymentMethod,
      name: t.payment.methods.promptpay.name,
      description: t.payment.methods.promptpay.description,
      icon: '/images/payment/promptpay.png'
    },
    {
      id: 'credit_card' as PaymentMethod,
      name: t.payment.methods.creditCard.name,
      description: t.payment.methods.creditCard.description,
      icon: '/images/payment/credit-card.png'
    },
    {
      id: 'bank_transfer' as PaymentMethod,
      name: t.payment.methods.bankTransfer.name,
      description: t.payment.methods.bankTransfer.description,
      icon: '/images/payment/bank-transfer.png'
    }
  ];

  // 获取订单数据
  useEffect(() => {
    const loadOrderData = async () => {
      try {
        const data = await fetchOrderData(orderId);
        setOrderData(data);
      } catch (error) {
        console.error('Failed to fetch order data:', error);
        toast.error(t.payment.messages.loadError);
      }
    };
    loadOrderData();
  }, [orderId, t.payment.messages.loadError]);

  // 处理支付
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // 模拟支付处理
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(t.payment.messages.success);
      router.push('/payment/success');
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error(t.payment.messages.error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4 flex items-center">
            <Link href="/cart" className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="ml-4 text-lg font-medium">{t.payment.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* 订单信息 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="text-sm text-gray-500 mb-2">{t.payment.orderNumber}：{orderData.id}</div>
          <div className="text-xl font-medium">฿{orderData.total.toLocaleString()}</div>
        </div>

        {/* 支付方式选择 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-medium mb-4">{t.payment.selectPayment}</h2>
          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-600'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image
                    src={method.icon}
                    alt={method.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="ml-4">
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-gray-500">{method.description}</div>
                </div>
                <div className="ml-auto">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 确认支付按钮 */}
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className={`w-full py-4 rounded-lg text-white font-medium text-lg ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {t.payment.processing}
            </div>
          ) : (
            t.payment.confirmPayment
          )}
        </button>
      </div>
    </div>
  );
} 