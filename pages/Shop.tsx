
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, SlidersHorizontal, Search } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Category, Product } from '../types';
import ProductCard from '../components/ProductCard';

interface Props {
  addToCart: (p: Product) => void;
}

const Shop: React.FC<Props> = ({ addToCart }) => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [priceRange, setPriceRange] = useState<number>(200);
  const [sortBy, setSortBy] = useState<'featured' | 'low' | 'high' | 'rating'>('featured');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = MOCK_PRODUCTS
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => p.price <= priceRange)
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-10">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Filter size={14} /> Categories
            </h3>
            <div className="space-y-2">
              {['All', ...Object.values(Category)].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                    selectedCategory === cat ? 'bg-pink-500 text-white shadow-md' : 'text-gray-600 hover:bg-pink-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <SlidersHorizontal size={14} /> Price Range
            </h3>
            <div className="space-y-4 px-2">
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="5"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-pink-500" 
              />
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>$0</span>
                <span className="text-pink-600 bg-pink-50 px-2 py-0.5 rounded">Under ${priceRange}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {selectedCategory} <span className="text-gray-400 font-normal text-sm ml-2">({filteredProducts.length} items)</span>
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold focus:outline-none cursor-pointer text-pink-500"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-bold">No matches found</h3>
              <p className="text-gray-400">Try adjusting your filters or search keywords.</p>
              <button 
                onClick={() => {setSelectedCategory('All'); setPriceRange(200);}}
                className="mt-6 text-pink-500 font-bold underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
