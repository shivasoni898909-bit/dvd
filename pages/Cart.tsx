
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
}

const Cart: React.FC<Props> = ({ items, updateQuantity, removeFromCart }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-300">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Bag is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-12">Shopping Bag</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Item List */}
        <div className="flex-grow space-y-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50 flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-pink-50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.brand}</span>
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-pink-500 font-bold">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-100 rounded-full h-10 bg-gray-50">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-3 hover:text-pink-500">
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-3 hover:text-pink-500">
                    <Plus size={14} />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-pink-50">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-gray-900 font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-pink-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white h-14 rounded-full font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95">
              Secure Checkout <ArrowRight size={20} />
            </button>
            
            <p className="text-[10px] text-gray-400 text-center mt-6 uppercase font-bold tracking-widest">
              30-Day Happiness Guarantee Included
            </p>
          </div>

          <div className="p-6 bg-gold-accent/10 rounded-2xl border border-gold-accent/20">
            <h4 className="font-bold text-gold-accent text-sm mb-2 flex items-center gap-2">
              <Plus size={14} /> VIP Rewards
            </h4>
            <p className="text-xs text-gold-accent leading-relaxed">
              Earn <span className="font-bold">{(subtotal * 2).toFixed(0)} points</span> with this order. Redeem for exclusive discounts on your next glow-up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
