
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, Search, Heart, User, Menu, X, Star, Bot, Camera, LayoutDashboard } from 'lucide-react';
import { MOCK_PRODUCTS } from './constants';
import { Category, Product, CartItem } from './types';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(wid => wid !== id) : [...prev, id]);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col soft-bg">
        {/* Navigation */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-primary-pink flex items-center justify-center transition-transform group-hover:scale-110">
                <Star className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Glow<span className="text-pink-400">Cart</span>
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
              <Link to="/shop" className="hover:text-pink-500 transition-colors">Shop All</Link>
              <div className="relative group">
                <button className="hover:text-pink-500 transition-colors flex items-center gap-1">
                  Categories
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-pink-50 shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2">
                  {Object.values(Category).map(cat => (
                    <Link key={cat} to={`/shop?category=${cat}`} className="block px-4 py-2 hover:bg-pink-50 transition-colors">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/admin" className="text-gold-accent hover:brightness-90 transition-all flex items-center gap-1">
                <LayoutDashboard size={18} /> Admin
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3 md:gap-5">
              <button className="p-2 hover:bg-pink-50 rounded-full transition-colors hidden sm:block">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/cart" className="p-2 hover:bg-pink-50 rounded-full transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsAssistantOpen(true)} className="p-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors">
                <Bot className="w-5 h-5" />
              </button>
              <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white pt-24 px-4 flex flex-col gap-6 md:hidden">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold border-b pb-2">Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold border-b pb-2">Shop All</Link>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold border-b pb-2">My Bag ({cartCount})</Link>
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold text-gold-accent">Admin Dashboard</Link>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/shop" element={<Shop addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart items={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-pink-50 py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Star className="text-pink-400 w-5 h-5" />
                <h3 className="text-xl font-bold">GlowCart</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Elevating your natural beauty with ethically sourced, premium products. Experience personalized care like never before.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li><Link to="/shop" className="hover:text-pink-400">All Products</Link></li>
                <li><Link to="/shop?category=Makeup" className="hover:text-pink-400">Makeup</Link></li>
                <li><Link to="/shop?category=Skincare" className="hover:text-pink-400">Skincare</Link></li>
                <li><Link to="/shop?category=Fragrance" className="hover:text-pink-400">Fragrances</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li className="hover:text-pink-400 cursor-pointer">Shipping & Returns</li>
                <li className="hover:text-pink-400 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-pink-400 cursor-pointer">Terms of Service</li>
                <li className="hover:text-pink-400 cursor-pointer">Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-500 text-sm mb-4">Sign up for exclusive beauty tips and 10% off your first order.</p>
              <div className="flex">
                <input type="email" placeholder="Email" className="bg-pink-50 border-none px-4 py-2 rounded-l-lg focus:ring-2 focus:ring-pink-200 w-full" />
                <button className="bg-primary-pink text-white px-4 py-2 rounded-r-lg hover:brightness-95 transition-all">Join</button>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-12 pt-8 border-t border-pink-50 text-center text-gray-400 text-xs">
            © 2024 GlowCart Inc. All rights reserved.
          </div>
        </footer>

        {/* AI Assistant FAB / Modal */}
        <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      </div>
    </HashRouter>
  );
};

export default App;
