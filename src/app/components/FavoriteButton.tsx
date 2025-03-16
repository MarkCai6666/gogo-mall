'use client';

import { useState, useEffect } from 'react';

interface FavoriteButtonProps {
  productId: string;
  initialState?: boolean;
  onToggle?: (isFavorite: boolean) => void;
}

export default function FavoriteButton({
  productId,
  initialState = false,
  onToggle
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialState);

  // 从本地存储加载收藏状态
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(productId));
  }, [productId]);

  // 切换收藏状态
  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);

    // 更新本地存储
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (newState) {
      localStorage.setItem('favorites', JSON.stringify([...favorites, productId]));
    } else {
      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter((id: string) => id !== productId))
      );
    }

    // 调用回调函数
    onToggle?.(newState);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isFavorite
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-400 hover:text-gray-500'
      }`}
      aria-label={isFavorite ? '取消收藏' : '收藏'}
    >
      <svg
        className="w-6 h-6"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
} 