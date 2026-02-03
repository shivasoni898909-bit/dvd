
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, HeartPulse, Bot, Instagram } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface Props {
  addToCart: (p: Product) => void;
}

const Home: React.FC<Props> = ({ addToCart }) => {
  const featured = MOCK_PRODUCTS.slice(0, 4);

  const COMMUNITY_IMAGES = [
    "https://images.unsplash.com/photo-1512496011931-a2c388278ab1?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1503236123135-0839d1bd28db?auto=format&fit=crop&q=80&w=400"
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold mb-6">
              <Sparkles size={14} /> NEW SEASON COLLECTION
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Reveal Your <br />
              <span className="text-pink-500 italic">Natural Glow</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto md:mx-0">
              Premium skincare and cosmetics curated for every skin type. Powered by AI to find your perfect match.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link to="/shop" className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all flex items-center gap-2 group">
                Shop Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 rounded-full font-bold text-gray-900 border border-gray-200 hover:bg-gray-50 transition-all">
                Our Story
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1000" 
                alt="Luxury cosmetic products" 
                className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
              />
              {/* Floating badges */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce shadow-pink-100">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Clinical Choice</p>
                  <p className="text-sm font-bold">100% Organic</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-60 -z-10"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gold-accent/10 rounded-full blur-3xl opacity-60 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Editor's Picks</h2>
              <p className="text-gray-500">Hand-selected favorites for this season.</p>
            </div>
            <Link to="/shop" className="text-pink-500 font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Integration Teaser */}
      <section className="py-24 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="flex-1 z-10">
              <div className="w-16 h-16 rounded-2xl bg-pink-500 text-white flex items-center justify-center mb-8 shadow-lg shadow-pink-200">
                <Bot size={32} />
              </div>
              <h2 className="text-4xl font-bold mb-6">Meet Your AI Beauty Expert</h2>
              <p className="text-gray-600 text-lg mb-8">
                Not sure which serum fits your skin? Our AI-powered GlowBot analyzes your concerns and recommends the perfect routine in seconds.
              </p>
              <button className="bg-pink-500 text-white px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all shadow-lg shadow-pink-100">
                Start Skin Quiz
              </button>
            </div>
            <div className="flex-1 flex gap-4">
               <div className="space-y-4 pt-12">
                  <img src="https://images.unsplash.com/photo-1570172619384-21961748b06d?auto=format&fit=crop&q=80&w=300" className="rounded-2xl shadow-lg" alt="Skin analysis" />
                  <div className="bg-white p-4 rounded-xl shadow-lg border border-pink-50">
                    <p className="text-xs font-bold text-pink-500 mb-1">SKIN ANALYSIS</p>
                    <p className="text-sm">Hydration: <span className="font-bold text-green-500">85%</span></p>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-lg border border-pink-50">
                    <p className="text-xs font-bold text-gray-400 mb-1">AI RECOMMENDATION</p>
                    <p className="text-sm font-bold">Vitamin C Serum</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1590156206657-3606f710f606?auto=format&fit=crop&q=80&w=300" className="rounded-2xl shadow-lg" alt="Skin analysis" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glow Community Gallery Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-pink-500 mb-4">
              <Instagram size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">@GlowCart_Beauty</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Glow Community</h2>
            <p className="text-gray-500">Share your beauty journey with us using #GlowCart for a chance to be featured.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
          {COMMUNITY_IMAGES.map((img, idx) => (
            <div key={idx} className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg">
              <img 
                src={img} 
                alt="Community member" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/20 transition-all flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-24 border-t border-pink-100">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-6 text-pink-500">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Dermatologist Tested</h3>
            <p className="text-gray-500 text-sm">Every formula is vetted by medical professionals to ensure safety and efficacy for all skin types.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-6 text-pink-500">
              <HeartPulse size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Cruelty Free</h3>
            <p className="text-gray-500 text-sm">We believe in beauty without harm. No products or ingredients are ever tested on animals.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-6 text-pink-500">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Eco-Friendly</h3>
            <p className="text-gray-500 text-sm">From sustainable sourcing to recyclable packaging, we strive to keep our planet as beautiful as you.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
