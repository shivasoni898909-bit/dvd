
import { Category, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Rose Glow Serum',
    brand: 'Luminous',
    price: 45.00,
    category: Category.SKINCARE,
    description: 'A deeply hydrating serum infused with Bulgarian rose extracts and Vitamin C for an instant glow.',
    ingredients: ['Aqua', 'Rosa Damascena Flower Water', 'Ascorbic Acid', 'Hyaluronic Acid'],
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 124,
    isNew: true
  },
  {
    id: '2',
    name: 'Matte Velvet Lipstick',
    brand: 'Enchant',
    price: 28.00,
    category: Category.MAKEUP,
    description: 'Long-wearing matte lipstick that provides a rich, velvety finish without drying your lips.',
    ingredients: ['Octyldodecanol', 'Polyethylene', 'Silica', 'Titanium Dioxide'],
    image: 'https://images.unsplash.com/photo-1586773860418-d319a398557b?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviewsCount: 89,
    onSale: true
  },
  {
    id: '3',
    name: 'Charcoal Purifying Mask',
    brand: 'Natura',
    price: 32.00,
    category: Category.SKINCARE,
    description: 'Deep-pore cleansing mask with activated charcoal and bentonite clay to extract impurities.',
    ingredients: ['Activated Charcoal', 'Bentonite Clay', 'Kaolin', 'Salicylic Acid'],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 210
  },
  {
    id: '4',
    name: 'Midnight Bloom Parfum',
    brand: 'Flora',
    price: 110.00,
    category: Category.FRAGRANCE,
    description: 'A sophisticated floral scent with notes of jasmine, patchouli, and vanilla bean.',
    ingredients: ['Alcohol Denat', 'Parfum', 'Linalool', 'Coumarin'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewsCount: 56
  },
  {
    id: '5',
    name: 'Grooming Beard Balm',
    brand: 'Urban Gent',
    price: 22.00,
    category: Category.MENS,
    description: 'Nourishing beard balm with cedarwood and sandalwood for a well-maintained, healthy beard.',
    ingredients: ['Beeswax', 'Shea Butter', 'Jojoba Oil', 'Cedarwood Oil'],
    image: 'https://images.unsplash.com/photo-1626453004313-5a043537e20a?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviewsCount: 34
  },
  {
    id: '6',
    name: 'Gentle Baby Wash',
    brand: 'SafeCloud',
    price: 18.00,
    category: Category.KIDS,
    description: 'Tear-free, hypoallergenic formula designed for sensitive baby skin and hair.',
    ingredients: ['Aqua', 'Coco-Glucoside', 'Glycerin', 'Aloe Barbadensis Leaf Juice'],
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviewsCount: 45
  }
];
