// frontend/src/data/products.js

export const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop',
    rating: 4.8,
    reviews: 256,
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    category: 'Electronics',
    inStock: true,
    quantity: 2,
    discount: 15 // 15% off
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop',
    rating: 4.5,
    reviews: 189,
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    category: 'Electronics',
    inStock: true,
    quantity: 1,
    discount: 10 // 10% off
  },
  {
    id: '3',
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
    rating: 4.6,
    reviews: 124,
    description: 'Modern LED desk lamp with adjustable brightness and sleek design.',
    category: 'Home & Garden',
    inStock: true,
    quantity: 2,
    discount: 25
  },
  {
    id: '4',
    name: 'Organic Coffee Beans',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=300&fit=crop',
    rating: 4.9,
    reviews: 342,
    description: 'Premium organic coffee beans sourced from sustainable farms.',
    category: 'Food & Beverages',
    inStock: true,
    quantity: 3,
    discount: 5 // 5% off
  },
  {
    id: '5',
    name: 'Designer Backpack',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=300&fit=crop',
    rating: 4.4,
    reviews: 98,
    description: 'Stylish and functional backpack perfect for work and travel.',
    category: 'Fashion',
    inStock: false,
    quantity: 1,
    discount: 20 // 20% off
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=300&fit=crop',
    rating: 4.3,
    reviews: 167,
    description: 'Portable wireless speaker with rich bass and long battery life.',
    category: 'Electronics',
    inStock: true,
    quantity: 1
  },
  {
    id: '7',
    name: 'Skincare Set',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=300&fit=crop',
    rating: 4.7,
    reviews: 203,
    description: 'Complete skincare routine with natural and organic ingredients.',
    category: 'Beauty',
    inStock: true,
    quantity: 2
  },
  {
    id: '8',
    name: 'Gaming Mouse',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=300&fit=crop',
    rating: 4.5,
    reviews: 145,
    description: 'High-precision gaming mouse with customizable RGB lighting.',
    category: 'Electronics',
    inStock: true,
    quantity: 2
  },
  {
    id: '9',
    name: 'Organic Coffee Beans',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=300&fit=crop',
    rating: 4.9,
    reviews: 342,
    description: 'Premium organic coffee beans sourced from sustainable farms.',
    category: 'Food & Beverages',
    inStock: true,
    quantity: 3,
   
  },
];

export const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Beauty',
  'Food & Beverages',
  'Sports'
];

export function getProductsByCategory(category) {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
}

export function getProductById(id) {
  return products.find(product => product.id === id);
}