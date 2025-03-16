export interface CartItem {
  id: string;
  name: {
    th: string;
    zh: string;
    en: string;
  };
  price: number;
  image: string;
  quantity: number;
} 