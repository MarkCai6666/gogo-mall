'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// 定义购物车项目类型
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// 定义购物车上下文类型
interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalAmount: number;
  totalItems: number;
}

// 创建购物车上下文
const CartContext = createContext<CartContextType | undefined>(undefined);

// 示例商品数据
const sampleItems: CartItem[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB 原色钛金属',
    price: 49900,
    quantity: 1,
    image: '/images/products/iphone15.jpg'
  },
  {
    id: '2',
    name: '轻薄羽绒服 90%白鸭绒 保暖外套',
    price: 1299,
    quantity: 2,
    image: '/images/products/down-jacket.jpg'
  }
];

// 购物车提供者组件
export function CartProvider({ children }: { children: React.ReactNode }) {
  // 初始化状态，从 localStorage 加载或使用示例数据
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 首次加载时从 localStorage 获取数据
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('cartItems');
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setItems(parsedItems);
        } else {
          // 如果购物车为空，使用示例数据
          setItems(sampleItems);
        }
      } else {
        // 如果没有保存的数据，使用示例数据
        setItems(sampleItems);
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
      setItems(sampleItems);
    }
    setIsInitialized(true);
  }, []);

  // 当购物车内容变化时保存到 localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('cartItems', JSON.stringify(items));
        console.log('Cart items saved:', items);
      } catch (error) {
        console.error('Error saving cart items:', error);
      }
    }
  }, [items, isInitialized]);

  // 添加商品到购物车
  const addToCart = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...currentItems, newItem];
    });
  };

  // 从购物车移除商品
  const removeFromCart = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  // 更新商品数量
  const updateQuantity = (id: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // 计算总金额
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 计算总商品数量
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      totalAmount,
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
}

// 使用购物车的 Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 