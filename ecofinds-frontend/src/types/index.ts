// types/index.ts
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
  seller: { _id: string; username: string };
  createdAt: string;
}

export interface Review {
  _id: string;
  user: { _id: string; username: string };
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Order {
  _id: string;
  product: Product;
  quantity: number;
  address: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
}