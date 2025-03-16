'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  district: string;
  address: string;
  isDefault: boolean;
}

// 模拟地址数据
const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Mark',
    phone: '0812345678',
    province: 'Bangkok',
    district: 'Watthana',
    address: 'Sukhumvit 71, 10110',
    isDefault: true
  },
  {
    id: '2',
    name: 'Mark',
    phone: '0823456789',
    province: 'Bangkok',
    district: 'Pathum Wan',
    address: 'Siam Square, 10330',
    isDefault: false
  }
];

export default function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个地址吗？')) {
      setAddresses(addresses.filter(address => address.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/profile" className="text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="ml-4 text-lg font-medium">收货地址</h1>
            </div>
            <Link
              href="/address/new"
              className="text-blue-600 text-sm font-medium"
            >
              新增地址
            </Link>
          </div>
        </div>
      </div>

      {/* 地址列表 */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {addresses.map(address => (
            <div key={address.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="font-medium">{address.name}</span>
                    <span className="ml-4 text-gray-600">{address.phone}</span>
                    {address.isDefault && (
                      <span className="ml-2 px-2 py-0.5 text-xs text-blue-600 bg-blue-50 rounded">
                        默认
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600">
                    {address.province} {address.district}
                  </div>
                  <div className="text-gray-600">
                    {address.address}
                  </div>
                </div>
                <div className="flex space-x-4 ml-4">
                  <Link
                    href={`/address/edit/${address.id}`}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    编辑
                  </Link>
                  {!address.isDefault && (
                    <>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="text-sm text-gray-600 hover:text-red-600"
                      >
                        删除
                      </button>
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="text-sm text-gray-600 hover:text-blue-600"
                      >
                        设为默认
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {addresses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">暂无收货地址</div>
            <Link
              href="/address/new"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              添加新地址
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 