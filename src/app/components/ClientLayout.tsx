'use client';

import { CartProvider } from '../contexts/CartContext';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '../../i18n/LanguageContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <CartProvider>
        {children}
        <Toaster position="top-center" />
      </CartProvider>
    </LanguageProvider>
  );
} 