
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, Heart, ShoppingBag, ArrowLeft, Plus, Minus, Camera, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { analyzeIngredients } from '../services/gemini';

interface Props {
  addToCart: (p: Product) => void;
}

const ProductDetail: React.FC<Props> = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'ingredients' | 'reviews'>('info');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAR, setShowAR] = useState(false);

  useEffect(() => {
    const found = MOCK_PRODUCTS.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  const handleAnalyze = async () => {
    if (!product) return;
    setIsAnalyzing(true);
    const result = await analyzeIngredients(product.ingredients);
    setAnalysis(result);
    setIsAnalyzing(false);
    setActiveTab('ingredients');
  };

  if (!product) return <div className="p-24 text-center">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-pink-500 mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Gallery */}
        <div className="flex-1 space-y-4">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-lg border border-pink-50">
            {showAR ? (
              <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center text-white text-center p-8">
                <div className="w-24 h-24 rounded-full border-4 border-white/20 border-t-pink-500 animate-spin mb-4" />
                <h3 className="text-xl font-bold mb-2">Simulating Augmented Reality...</h3>
                <p className="text-sm opacity-60 max-w-xs">Initializing camera feed to visualize {product.name} on your skin tone.</p>
                <button onClick={() => setShowAR(false)} className="mt-8 bg-white text-gray-900 px-6 py-2 rounded-full font-bold">Exit AR</button>
              </div>
            ) : (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            )}
            {!showAR && (
              <button 
                onClick={() => setShowAR(true)}
                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md text-gray-900 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition-all"
              >
                <Camera size={18} /> Try on Virtually
              </button>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="aspect-square rounded-xl overflow-hidden border border-pink-50 hover:border-pink-300 transition-colors cursor-pointer bg-white">
                <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover opacity-50" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2 block">{product.brand}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < Math.floor(product.rating) ? "fill-gold-accent text-gold-accent" : "text-gray-200"} />
                ))}
                <span className="text-sm font-bold ml-1">{product.rating}</span>
              </div>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-gray-400 text-sm">{product.reviewsCount} verified reviews</span>
            </div>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-8">${product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-200 rounded-full h-14 bg-white">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-12 h-full flex items-center justify-center hover:text-pink-500 transition-colors">
                <Minus size={18} />
              </button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-12 h-full flex items-center justify-center hover:text-pink-500 transition-colors">
                <Plus size={18} />
              </button>
            </div>
            <button 
              onClick={() => addToCart(product)}
              className="flex-grow bg-gray-900 text-white h-14 rounded-full font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95"
            >
              <ShoppingBag size={20} /> Add to Bag
            </button>
            <button className="h-14 w-14 border border-gray-200 rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors">
              <Heart size={20} className="text-gray-400 hover:text-pink-500" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-white border border-pink-50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Sourcing</p>
                <p className="text-sm font-bold">100% Ethical</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-pink-50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Safety</p>
                <p className="text-sm font-bold">Non-Comedogenic</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex-grow">
            <div className="flex border-b border-gray-100 mb-6">
              <button 
                onClick={() => setActiveTab('info')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest relative ${activeTab === 'info' ? 'text-gray-900' : 'text-gray-400'}`}
              >
                Description
                {activeTab === 'info' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />}
              </button>
              <button 
                onClick={() => setActiveTab('ingredients')}
                className={`ml-8 pb-4 text-sm font-bold uppercase tracking-widest relative ${activeTab === 'ingredients' ? 'text-gray-900' : 'text-gray-400'}`}
              >
                Ingredients
                {activeTab === 'ingredients' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />}
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`ml-8 pb-4 text-sm font-bold uppercase tracking-widest relative ${activeTab === 'reviews' ? 'text-gray-900' : 'text-gray-400'}`}
              >
                Reviews
                {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />}
              </button>
            </div>

            <div className="text-gray-600 text-sm leading-relaxed min-h-[150px]">
              {activeTab === 'info' && <p>{product.description}</p>}
              {activeTab === 'ingredients' && (
                <div className="space-y-6">
                  <p className="text-xs text-gray-400 uppercase font-bold">Full INCI List:</p>
                  <p>{product.ingredients.join(", ")}</p>
                  <div className="pt-4 border-t border-gray-50">
                    {analysis ? (
                      <div className="bg-pink-50 p-4 rounded-2xl text-pink-900 italic text-xs leading-relaxed">
                        <p className="font-bold mb-1 not-italic flex items-center gap-1">
                          <Sparkles size={12} /> AI Ingredient Analysis:
                        </p>
                        {analysis}
                      </div>
                    ) : (
                      <button 
                        onClick={handleAnalyze} 
                        disabled={isAnalyzing}
                        className="text-pink-500 font-bold flex items-center gap-2 hover:gap-3 transition-all disabled:opacity-50"
                      >
                        {isAnalyzing ? "Analyzing formula..." : "Analyze with AI Beauty Expert"} <ArrowLeft size={16} className="rotate-180" />
                      </button>
                    )}
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="text-center py-12">
                  <p className="font-bold text-gray-900 mb-1">Excellent (4.8/5)</p>
                  <p className="text-gray-400">Join {product.reviewsCount} other happy customers.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
