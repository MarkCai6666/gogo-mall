'use client';

import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-hot-toast';
import { CartItem } from '@/types/cart';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    setIsLoading(true);
    try {
      const cartItem: CartItem = {
        ...product,
        quantity: 1, // 默认数量为1
      };
      addToCart(cartItem);
      toast.success('已添加到购物车', {
        duration: 2000,
        position: 'top-center',
        icon: '🛒',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error('添加失败，请重试', {
        duration: 2000,
        position: 'top-center',
      });
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`flex-1 py-3 rounded-lg font-medium text-white ${
        isLoading
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isLoading ? '添加中...' : '加入购物车'}
    </button>
  );
} 