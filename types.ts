
export enum Category {
  MAKEUP = 'Makeup',
  SKINCARE = 'Skincare',
  FRAGRANCE = 'Fragrance',
  TOOLS = 'Tools',
  MENS = 'Mens Grooming',
  KIDS = 'Kids Section'
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: Category;
  description: string;
  ingredients: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  onSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  points: number;
  wishlist: string[];
}
