'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {/* 客服支持 */}
          <div>
            <h3 className="text-base font-medium mb-3">{t.footer.customerService}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-500 hover:text-gray-800 text-sm">
                  {t.footer.helpCenter}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-gray-800 text-sm">
                  {t.footer.contactUs}
                </Link>
              </li>
              <li>
                <Link href="/complaint" className="text-gray-500 hover:text-gray-800 text-sm">
                  {t.footer.complaints}
                </Link>
              </li>
            </ul>
          </div>

          {/* 关于我们 */}
          <div>
            <h3 className="text-base font-medium mb-3">{t.footer.aboutUs}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-800 text-sm">
                  {t.footer.aboutGogo}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-gray-800 text-sm">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-gray-800 text-sm">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* 商务合作 */}
          <div>
            <h3 className="text-base font-medium mb-3">{t.footer.business}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/seller" className="text-gray-500 hover:text-gray-800 text-sm">
                  {t.footer.sellerCenter}
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-gray-500 hover:text-gray-800 text-sm">
                  {t.footer.affiliate}
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-gray-500 hover:text-gray-800 text-sm">
                  {t.footer.advertise}
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-base font-medium mb-3">{t.footer.contact}</h3>
            <ul className="space-y-2">
              <li className="text-gray-500 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +66 2-000-0000
              </li>
              <li className="text-gray-500 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@gogomall.com
              </li>
              <li className="text-gray-500 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bangkok, Thailand
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} GOGO Mall. {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
} 