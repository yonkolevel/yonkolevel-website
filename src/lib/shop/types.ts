export type ProductType = 'physical' | 'digital';

export type ProductCategory = 'collectibles' | 'wallpapers';

export interface ClientProduct {
  id: string;
  stripeProductId: string;
  name: string;
  description: string;
  price: number; // in smallest currency unit (pence)
  currency: string;
  type: ProductType;
  category: ProductCategory;
  image: string;
  series?: string;
  soldOut: boolean;
}

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
}

export interface LocalProductConfig {
  image: string;
  category: ProductCategory;
  displayOrder: number;
}
