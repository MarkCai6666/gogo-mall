'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// 订单状态类型
type OrderStatus = 'all' | 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';

// 订单类型
interface Order {
  id: string;
  status: OrderStatus;
  date: string;
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

// 模拟订单数据
const mockOrders: Order[] = [
  {
    id: 'ORD001',
    status: 'pending',
    date: '2024-03-15',
    total: 35900,
    items: [
      {
        id: 'ITEM001',
        name: 'iPhone 15 Pro',
        price: 35900,
        quantity: 1,
        image: '/images/iphone15.png'
      }
    ]
  },
  {
    id: 'ORD002',
    status: 'shipped',
    date: '2024-03-14',
    total: 398,
    items: [
      {
        id: 'ITEM002',
        name: '泰国空运草莓 1盒',
        price: 199,
        quantity: 2,
        image: '/images/strawberry.png'
      }
    ]
  }
];

// 状态标签样式映射
const statusStyles: Record<OrderStatus, { text: string; className: string }> = {
  all: { text: '全部', className: 'bg-gray-100 text-gray-800' },
  pending: { text: '待付款', className: 'bg-yellow-100 text-yellow-800' },
  processing: { text: '处理中', className: 'bg-blue-100 text-blue-800' },
  shipped: { text: '已发货', className: 'bg-purple-100 text-purple-800' },
  completed: { text: '已完成', className: 'bg-green-100 text-green-800' },
  cancelled: { text: '已取消', className: 'bg-red-100 text-red-800' }
};

export default function Orders() {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<OrderStatus>('all');

  // 过滤订单
  const filteredOrders = activeStatus === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === activeStatus);

  // 处理支付按钮点击
  const handlePayment = (orderId: string) => {
    router.push(`/payment/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-4 flex items-center">
            <Link href="/profile" className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="ml-4 text-lg font-medium">我的订单</h1>
          </div>
        </div>
      </div>

      {/* 状态分类 */}
      <div className="bg-white mb-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-3 flex space-x-4 overflow-x-auto scrollbar-hide">
            {Object.entries(statusStyles).map(([status, { text }]) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status as OrderStatus)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">暂无订单</div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  {/* 订单头部 */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-600">订单号：{order.id}</div>
                    <div className={`px-2 py-1 rounded-full text-xs ${statusStyles[order.status].className}`}>
                      {statusStyles[order.status].text}
                    </div>
                  </div>

                  {/* 订单商品 */}
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center py-2">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 ml-4">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="mt-1 text-sm text-gray-500">
                          数量：{item.quantity}
                        </div>
                        <div className="mt-1 text-sm text-gray-900">
                          ฿{item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* 订单底部 */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {order.date}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">总计：</span>
                        <span className="text-blue-600 font-medium">฿{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      {order.status === 'pending' && (
                        <>
                          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                            取消订单
                          </button>
                          <button 
                            onClick={() => handlePayment(order.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                          >
                            立即付款
                          </button>
                        </>
                      )}
                      {order.status === 'shipped' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                          确认收货
                        </button>
                      )}
                      {order.status === 'completed' && (
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                          再次购买
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 