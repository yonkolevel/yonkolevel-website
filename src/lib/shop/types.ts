export type ProductType = 'physical' | 'digital';

export type ProductCategory = 'collectibles' | 'wallpapers';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in pence
  currency: string;
  type: ProductType;
  category: ProductCategory;
  image: string;
  stripePriceId: string;
  series?: string;
  variant?: string;
}

export interface ClientProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: ProductType;
  category: ProductCategory;
  image: string;
  series?: string;
  variant?: string;
}

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
}
