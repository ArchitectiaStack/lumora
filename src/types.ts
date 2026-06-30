export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  details: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  itemCount: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}
