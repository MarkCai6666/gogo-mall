'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { thailandRegions } from '../../../data/thailand-regions';

interface AddressFormData {
  name: string;
  phone: string;
  province: string;
  district: string;
  address: string;
  isDefault: boolean;
}

// 模拟从API获取地址数据
const mockFetchAddress = async (id: string): Promise<AddressFormData> => {
  // 这里模拟API调用
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    name: 'Mark',
    phone: '0812345678',
    province: 'Bangkok',
    district: 'Watthana',
    address: 'Sukhumvit 71, 10110',
    isDefault: true
  };
};

export default function EditAddressClient({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AddressFormData>({
    name: '',
    phone: '',
    province: '',
    district: '',
    address: '',
    isDefault: false
  });

  // 获取地址数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mockFetchAddress(id);
        setFormData(data);
      } catch (error) {
        alert('获取地址信息失败');
        router.push('/address');
      }
    };

    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 这里模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 保存成功后返回地址列表
      router.push('/address');
    } catch (error) {
      alert('保存失败，请重试');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      };

      // 如果更改了省份，清空地区
      if (name === 'province') {
        newData.district = '';
      }

      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4 flex items-center">
            <Link href="/address" className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="ml-4 text-lg font-medium">编辑地址</h1>
          </div>
        </div>
      </div>

      {/* 表单 */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                收货人
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入收货人姓名"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                手机号码
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入10位手机号码"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                省份
              </label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">请选择省份</option>
                {Object.entries(thailandRegions).map(([key, { name }]) => (
                  <option key={key} value={key}>
                    {key} - {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                地区
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                disabled={!formData.province}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">请选择地区</option>
                {formData.province && thailandRegions[formData.province]?.districts.map(district => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                详细地址
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入详细地址"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                设为默认地址
              </label>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-medium ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 