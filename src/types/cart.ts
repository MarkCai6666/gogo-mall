export interface CartItem {
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
  quantity: number;
} 