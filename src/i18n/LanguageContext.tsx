'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { zh } from './locales/zh';
import { en } from './locales/en';
import { th } from './locales/th';

type Language = 'zh' | 'en' | 'th';

// 定义翻译类型
interface Translations {
  common: {
    back: string;
    loading: string;
    confirm: string;
    cancel: string;
    mall: string;
    searchPlaceholder: string;
    soldCount: string;
    addToCart: string;
    buyNow: string;
    productDetails: string;
    description: string;
    noDescription: string;
    quantity: string;
    productNotFound: string;
    backToHome: string;
    confirmOrder: string;
    itemList: string;
    coupon: string;
    selected: string;
    selectCoupon: string;
    amountDetails: string;
    subtotal: string;
    discount: string;
    total: string;
    submitOrder: string;
  };
  nav: {
    home: string;
    cart: string;
    orders: string;
    profile: string;
    categories: string;
  };
  payment: {
    title: string;
    orderNumber: string;
    selectPayment: string;
    confirmPayment: string;
    processing: string;
    methods: {
      promptpay: {
        name: string;
        description: string;
      };
      creditCard: {
        name: string;
        description: string;
      };
      bankTransfer: {
        name: string;
        description: string;
      };
    };
    messages: {
      success: string;
      error: string;
      loadError: string;
    };
    success: {
      title: string;
      message: string;
      viewOrder: string;
      continueShopping: string;
    };
  };
  home: {
    popularCategories: string;
    popularProducts: string;
    newProducts: string;
    specialOffers: string;
  };
  categories: {
    [key: string]: string;
  };
  banners: {
    [key: string]: string;
  };
  tags: {
    [key: string]: string;
  };
  footer: {
    customerService: string;
    helpCenter: string;
    contactUs: string;
    complaints: string;
    aboutUs: string;
    aboutGogo: string;
    privacyPolicy: string;
    terms: string;
    business: string;
    sellerCenter: string;
    affiliate: string;
    advertise: string;
    contact: string;
    allRightsReserved: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations: Record<Language, Translations> = {
  zh,
  en,
  th
};

const DEFAULT_LANGUAGE: Language = 'th';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'zh' || savedLang === 'en' || savedLang === 'th')) {
      setLanguage(savedLang as Language);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('language', language);
    }
  }, [language, isClient]);

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 