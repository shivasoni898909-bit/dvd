
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { Product } from '../types';

interface Props {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all group flex flex-col">
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-pink-500 transition-colors">
          <Heart size={18} />
        </button>
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            New
          </span>
        )}
      </div>

      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-gold-accent text-gold-accent" />
            <span className="text-xs text-gray-500">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="hover:text-pink-500 transition-colors">
          <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
        </Link>
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-2 bg-pink-50 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-all transform active:scale-95"
            title="Add to cart"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
