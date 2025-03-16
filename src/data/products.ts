export interface Product {
  id: string;
  name: {
    th: string;
    zh: string;
    en: string;
  };
  price: number;
  image: string;
  category: string;
  description?: {
    th: string;
    zh: string;
    en: string;
  };
  tags: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: {
      th: 'ไอโฟน 15 โปร',
      zh: 'iPhone 15 Pro',
      en: 'iPhone 15 Pro'
    },
    price: 7999,
    image: '/images/products/iphone15pro.png',
    category: '手机数码',
    description: {
      th: 'ดีไซน์ไทเทเนียม, ชิป A17 Pro, กล้องหลัก 48MP, พอร์ต USB-C',
      zh: '创新的钛金属设计，A17 Pro芯片，4800万像素主摄，USB-C接口',
      en: 'Titanium design, A17 Pro chip, 48MP main camera, USB-C port'
    },
    tags: ['新品', '热销']
  },
  {
    id: '2',
    name: {
      th: 'เสื้อกันหนาวบาง',
      zh: '轻薄羽绒服',
      en: 'Light Down Jacket'
    },
    price: 599,
    image: '/images/products/downjacket.png',
    category: '服装配饰',
    description: {
      th: 'เสื้อกันหนาวน้ำหนักเบา อุ่น สวมใส่สบาย',
      zh: '轻薄保暖，舒适时尚的羽绒服',
      en: 'Lightweight, warm and comfortable down jacket'
    },
    tags: ['热销', '特惠']
  },
  {
    id: '3',
    name: {
      th: 'สตรอว์เบอร์รีออร์แกนิค',
      zh: '有机草莓',
      en: 'Organic Strawberries'
    },
    price: 39.9,
    image: '/images/products/strawberry.png',
    category: '食品生鲜',
    description: {
      th: 'สตรอว์เบอร์รีออร์แกนิคสดใหม่จากฟาร์ม',
      zh: '新鲜有机草莓，农场直供',
      en: 'Fresh organic strawberries from farm'
    },
    tags: ['特惠']
  },
  {
    id: '4',
    name: {
      th: 'โซฟาสไตล์นอร์ดิก',
      zh: '北欧简约沙发',
      en: 'Nordic Style Sofa'
    },
    price: 2999,
    image: '/images/products/sofa.png',
    category: '家居家装',
    description: {
      th: 'โซฟาดีไซน์เรียบง่าย สไตล์นอร์ดิก',
      zh: '简约北欧风格，舒适优雅的沙发',
      en: 'Simple Nordic design, comfortable and elegant sofa'
    },
    tags: ['新品']
  },
  {
    id: '5',
    name: {
      th: 'คีย์บอร์ดเกมมิ่ง',
      zh: '机械键盘',
      en: 'Mechanical Keyboard'
    },
    price: 299,
    image: '/images/products/keyboard.png',
    category: '手机数码',
    description: {
      th: 'คีย์บอร์ดเกมมิ่งระดับมืออาชีพ',
      zh: '专业游戏机械键盘，RGB背光',
      en: 'Professional gaming mechanical keyboard with RGB backlight'
    },
    tags: ['热销']
  },
  {
    id: '6',
    name: {
      th: 'รองเท้ากีฬา',
      zh: '运动跑鞋',
      en: 'Sports Running Shoes'
    },
    price: 459,
    image: '/images/products/shoes.png',
    category: '服装配饰',
    description: {
      th: 'รองเท้าวิ่งน้ำหนักเบา สวมใส่สบาย',
      zh: '轻便舒适的运动跑鞋',
      en: 'Lightweight and comfortable running shoes'
    },
    tags: ['特惠']
  },
  {
    id: '7',
    name: {
      th: 'เนื้อวากิวนำเข้า',
      zh: '进口牛排',
      en: 'Imported Wagyu Steak'
    },
    price: 168,
    image: '/images/products/steak.png',
    category: '食品生鲜',
    description: {
      th: 'เนื้อวากิวคุณภาพพรีเมียม',
      zh: '顶级和牛牛排，入口即化',
      en: 'Premium Wagyu beef steak'
    },
    tags: ['新品']
  },
  {
    id: '8',
    name: {
      th: 'โคมไฟอัจฉริยะ',
      zh: '智能台灯',
      en: 'Smart Desk Lamp'
    },
    price: 159,
    image: '/images/products/lamp.png',
    category: '家居家装',
    description: {
      th: 'โคมไฟตั้งโต๊ะอัจฉริยะ ปรับแสงอัตโนมัติ',
      zh: '智能调光，护眼科技台灯',
      en: 'Smart desk lamp with auto brightness adjustment'
    },
    tags: ['新品']
  }
]; 