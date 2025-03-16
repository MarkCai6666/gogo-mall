'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/types/cart';

// 定义购物车上下文类型
interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalAmount: number;
  totalItems: number;
}

// 创建初始状态
const initialState: CartContextType = {
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  totalAmount: 0,
  totalItems: 0,
};

// 创建购物车上下文
export const CartContext = createContext<CartContextType>(initialState);

// 购物车提供者组件
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 首次加载时从 localStorage 获取数据
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('cartItems');
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        // 确保所有项目都符合 CartItem 类型
        const validItems = parsedItems.filter((item: any) => 
          typeof item.id === 'string' &&
          typeof item.name === 'object' &&
          typeof item.name.th === 'string' &&
          typeof item.name.zh === 'string' &&
          typeof item.name.en === 'string' &&
          typeof item.price === 'number' &&
          typeof item.image === 'string' &&
          typeof item.category === 'string' &&
          (!item.description || (
            typeof item.description === 'object' &&
            typeof item.description.th === 'string' &&
            typeof item.description.zh === 'string' &&
            typeof item.description.en === 'string'
          )) &&
          Array.isArray(item.tags) &&
          item.tags.every((tag: any) => typeof tag === 'string') &&
          typeof item.quantity === 'number'
        );
        setItems(validItems);
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
    setIsInitialized(true);
  }, []);

  // 当购物车内容变化时保存到 localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cartItems', JSON.stringify(items));
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

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalAmount,
    totalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// 使用购物车的 Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 