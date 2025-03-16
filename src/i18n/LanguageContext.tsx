'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { zh } from './locales/zh';
import { en } from './locales/en';
import { th } from './locales/th';

type Language = 'zh' | 'en' | 'th';
type Translations = typeof zh;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations = {
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