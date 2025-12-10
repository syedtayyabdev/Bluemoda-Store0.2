export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type Category = 'All' | 'Swimwear' | 'Goggles' | 'T-Shirts' | 'Accessories';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';

export interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: CartItem[];
}

export interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}
