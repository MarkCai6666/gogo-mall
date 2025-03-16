'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

export type BannerType = {
  id: number;
  title: '新品上市' | '限时特惠' | '品牌专场';
};

export type CategoryType = {
  id: number;
  name: '手机数码' | '服装配饰' | '食品生鲜' | '家居家装';
  icon: ReactNode;
};

export type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: CategoryType['name'];
  tags: Array<'新品' | '热销' | '特惠'>;
  description?: string;
};

// 轮播图数据
export const banners: BannerType[] = [
  {
    id: 1,
    title: '新品上市'
  },
  {
    id: 2,
    title: '限时特惠'
  },
  {
    id: 3,
    title: '品牌专场'
  }
];

// 分类数据
export const categories: CategoryType[] = [
  {
    id: 1,
    name: "手机数码",
    icon: (
      <Image
        src="/images/categories/digital.png"
        alt="手机数码"
        width={288}
        height={288}
        className="object-cover hover:scale-105 transition-transform duration-200"
      />
    )
  },
  {
    id: 2,
    name: "服装配饰",
    icon: (
      <Image
        src="/images/categories/fashion.png"
        alt="服装配饰"
        width={288}
        height={288}
        className="object-cover hover:scale-105 transition-transform duration-200"
      />
    )
  },
  {
    id: 3,
    name: "食品生鲜",
    icon: (
      <Image
        src="/images/categories/food.png"
        alt="食品生鲜"
        width={288}
        height={288}
        className="object-cover hover:scale-105 transition-transform duration-200"
      />
    )
  },
  {
    id: 4,
    name: "家居家装",
    icon: (
      <Image
        src="/images/categories/home.png"
        alt="家居家装"
        width={288}
        height={288}
        className="object-cover hover:scale-105 transition-transform duration-200"
      />
    )
  }
];

// 商品数据
export const products: ProductType[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 7999,
    image: "/images/products/phone.png",
    category: "手机数码",
    tags: ["新品", "热销"],
    description: "搭载 A17 Pro 芯片，配备 48MP 主摄，支持 USB-C 接口。"
  },
  {
    id: 2,
    name: "轻薄羽绒服",
    price: 599,
    image: "/images/products/jacket.png",
    category: "服装配饰",
    tags: ["特惠"],
    description: "90%白鸭绒，轻盈保暖，防风防水。"
  },
  {
    id: 3,
    name: "有机草莓",
    price: 39.9,
    image: "/images/products/strawberry.png",
    category: "食品生鲜",
    tags: ["新品"],
    description: "精选优质草莓，酸甜可口，新鲜直达。"
  },
  {
    id: 4,
    name: "北欧简约沙发",
    price: 2999,
    image: "/images/products/sofa.png",
    category: "家居家装",
    tags: ["新品"],
    description: "进口实木框架，高弹海绵，舒适耐用。"
  },
  {
    id: 5,
    name: "机械键盘",
    price: 299,
    image: "/images/products/keyboard.png",
    category: "手机数码",
    tags: ["热销"],
    description: "原厂轴体，PBT键帽，RGB背光。"
  },
  {
    id: 6,
    name: "运动跑鞋",
    price: 459,
    image: "/images/products/shoes.png",
    category: "服装配饰",
    tags: ["特惠"],
    description: "轻量缓震，透气网面，舒适贴合。"
  },
  {
    id: 7,
    name: "进口牛排",
    price: 168,
    image: "/images/products/steak.png",
    category: "食品生鲜",
    tags: ["新品"],
    description: "澳洲进口和牛，雪花均匀，鲜嫩多汁。"
  },
  {
    id: 8,
    name: "智能台灯",
    price: 159,
    image: "/images/products/lamp.png",
    category: "家居家装",
    tags: ["新品"],
    description: "无极调光，色温可调，智能控制。"
  }
]; 