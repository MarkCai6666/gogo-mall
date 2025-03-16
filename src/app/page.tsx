'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import { categories, banners } from './data';
import LanguageSwitch from '@/components/LanguageSwitch';
import { useLanguage } from '@/i18n/LanguageContext';
import Footer from '@/components/Footer';
import { CartItem } from '@/types/cart';
import { Product } from '@/data/products';
import { toast } from 'react-hot-toast';

// 类型定义
type BannerType = {
  id: number;
  title: '新品上市' | '限时特惠' | '品牌专场';
};

type CategoryType = {
  id: number;
  name: '手机数码' | '服装配饰' | '食品生鲜' | '家居家装';
  icon: React.ReactNode;
};

export default function Home() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [salesCount, setSalesCount] = useState<Record<string, number>>({});
  const [isClient, setIsClient] = useState(false);

  // 设置客户端标志
  useEffect(() => {
    setIsClient(true);
    // 生成随机销量数据
    const randomSales: Record<string, number> = {};
    products.forEach(product => {
      randomSales[product.id] = Math.floor(Math.random() * 1000);
    });
    setSalesCount(randomSales);
  }, []);

  // 添加到购物车
  const addToCart = (productId: string) => {
    setCartItems(prev => {
      const product = products.find(p => p.id === productId);
      if (!product) return prev;

      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const newItem: CartItem = {
        ...product,
        quantity: 1
      };
      
      const newCart = [...prev, newItem];
      // 保存到 localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // 获取购物车商品总数
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // 从 localStorage 加载购物车数据
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 处理分类点击
  const handleCategoryClick = (categoryName: string) => {
    // 暂时使用查询参数进行过滤
    router.push(`/?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 第一行：Logo和语言切换 */}
          <div className="flex justify-between h-14 items-center border-b">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="GOGO商城"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <span className="text-xl sm:text-2xl font-bold text-blue-600 ml-2">GOGO</span>
                <span className="text-lg sm:text-xl font-medium text-gray-700 hidden sm:inline">{t.common.mall}</span>
              </Link>
            </div>
            <LanguageSwitch />
          </div>

          {/* 第二行：导航链接和搜索框 */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
            {/* 导航链接 */}
            <div className="flex items-center space-x-6 mb-2 sm:mb-0">
              <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">{t.nav.home}</Link>
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-500 transition-colors text-sm">
                  {t.nav.categories}
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-lg shadow-lg py-2 w-32">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.name)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:text-blue-500 hover:bg-gray-50 transition-colors"
                      >
                        {t.categories[category.name]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Link 
                href="/cart" 
                className="text-gray-600 hover:text-blue-500 transition-colors relative text-sm"
              >
                {t.nav.cart}
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
              <Link 
                href="/profile" 
                className="text-gray-600 hover:text-blue-500 transition-colors text-sm"
              >
                {t.nav.profile}
              </Link>
            </div>

            {/* 搜索框 */}
            <div className="relative w-full sm:w-64 md:w-80">
              <input
                type="text"
                placeholder={t.common.searchPlaceholder}
                className="w-full h-9 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 text-sm"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* 轮播图 */}
        <div className="relative rounded-xl overflow-hidden mb-12 shadow-lg">
          <div className="relative h-[200px] sm:h-[400px]">
            {banners.map((banner: BannerType, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentBanner ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className={`w-full h-full bg-gradient-to-r from-blue-500 to-blue-600`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">{t.banners[banner.title]}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 轮播图指示器 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentBanner
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </div>

        {/* 商品分类 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded-full mr-2"></span>
            {t.home.popularCategories}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categories.map((category: CategoryType) => (
              <button 
                key={category.id} 
                onClick={() => handleCategoryClick(category.name)}
                className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer group hover:shadow-md transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="w-full aspect-square mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-gray-700 text-lg font-medium group-hover:text-blue-500 transition-colors">{t.categories[category.name]}</p>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 商品列表 */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded-full mr-2"></span>
            {t.home.popularProducts}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <div className="relative h-48 bg-gray-50">
                  <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full ${
                          tag === "新品" ? "bg-blue-500 text-white" :
                          tag === "热销" ? "bg-blue-600 text-white" :
                          tag === "特惠" ? "bg-blue-400 text-white" :
                          "bg-blue-500 text-white"
                        }`}
                      >
                        {t.tags[tag]}
                      </span>
                    ))}
                  </div>
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name[language]}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-800 font-medium mb-2">{product.name[language]}</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-blue-600 font-medium">฿{product.price.toLocaleString()}</div>
                    {isClient && (
                      <div className="text-sm text-gray-500">
                        {t.common.soldCount.replace('{count}', (salesCount[product.id] || 0).toString())}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id);
                        toast.success(t.common.addToCart);
                      }}
                      className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                    >
                      {t.common.addToCart}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
