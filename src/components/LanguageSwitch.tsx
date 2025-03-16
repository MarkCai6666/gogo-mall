'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { Fragment } from 'react';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'th', name: 'ไทย' },
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'EN' }
  ];

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang, index) => (
        <Fragment key={lang.code}>
          <button
            onClick={() => setLanguage(lang.code as 'th' | 'zh' | 'en')}
            className={`text-sm ${
              language === lang.code
                ? 'text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {lang.name}
          </button>
          {index < languages.length - 1 && (
            <span className="text-gray-300">|</span>
          )}
        </Fragment>
      ))}
    </div>
  );
} 