'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    // 检查登录状态
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
  }, []);

  // 处理头像加载错误
  const handleAvatarError = () => {
    setAvatarError(true);
  };

  // 处理登录点击
  const handleLoginClick = () => {
    router.push('/login');
  };

  // 处理退出登录
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/login');
  };

  // 获取头像显示组件
  const getAvatarDisplay = () => {
    if (!avatarError) {
      return (
        <Image
          src="/images/avatar.png"
          alt="用户头像"
          width={80}
          height={80}
          className="w-full h-full object-cover"
          onError={handleAvatarError}
        />
      );
    }

    // 如果图片加载失败，显示首字母头像
    return (
      <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
        {isLoggedIn ? "U" : "?"}
      </div>
    );
  };

  const menuItems = [
    {
      id: 1,
      title: '我的订单',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      link: '/orders'
    },
    {
      id: 2,
      title: '收货地址',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: '/address'
    },
    {
      id: 3,
      title: '优惠券',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
      link: '/coupons'
    },
    {
      id: 4,
      title: '收藏夹',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      link: '/favorites'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-gray-600 hover:text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <span className="text-lg font-medium">个人中心</span>
            <div className="w-6"></div>
          </div>
        </div>
      </nav>

      {/* 用户信息卡片 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoggedIn ? (
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden ring-2 ring-blue-100">
                  {getAvatarDisplay()}
                </div>
                <div className="ml-5">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    用户名
                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-500 rounded-full">普通会员</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                    <span>ID: 10001</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>注册于 2024年</span>
                  </p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-4 text-center">
                <div className="hover:bg-gray-50 rounded-lg p-3 cursor-pointer transition-colors">
                  <div className="text-xl font-semibold text-gray-800">0</div>
                  <div className="text-sm text-gray-500">优惠券</div>
                </div>
                <div className="hover:bg-gray-50 rounded-lg p-3 cursor-pointer transition-colors">
                  <div className="text-xl font-semibold text-gray-800">0</div>
                  <div className="text-sm text-gray-500">收藏</div>
                </div>
                <div className="hover:bg-gray-50 rounded-lg p-3 cursor-pointer transition-colors">
                  <div className="text-xl font-semibold text-gray-800">0</div>
                  <div className="text-sm text-gray-500">足迹</div>
                </div>
                <div className="hover:bg-gray-50 rounded-lg p-3 cursor-pointer transition-colors">
                  <div className="text-xl font-semibold text-gray-800">0</div>
                  <div className="text-sm text-gray-500">积分</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden ring-2 ring-blue-100">
                {getAvatarDisplay()}
              </div>
              <p className="text-gray-500 mb-4">登录后查看更多信息</p>
              <button 
                onClick={handleLoginClick}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                立即登录
              </button>
            </div>
          )}
        </div>

        {/* 功能菜单 */}
        <div className="mt-6 bg-white rounded-xl shadow-sm">
          <div className="grid grid-cols-2 gap-px bg-gray-200">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="bg-white p-6 flex items-center space-x-3 hover:bg-gray-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:text-blue-600 transition-colors">
                  {item.icon}
                </div>
                <span className="text-gray-700 group-hover:text-blue-500 transition-colors">{item.title}</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* 退出登录按钮 */}
        {isLoggedIn && (
          <button 
            onClick={handleLogout}
            className="w-full mt-6 p-4 text-center text-gray-600 hover:text-blue-500 transition-colors bg-white rounded-xl shadow-sm"
          >
            退出登录
          </button>
        )}
      </div>
    </div>
  );
} 