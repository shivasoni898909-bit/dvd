
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, ShoppingCart, Users, Activity, TrendingUp, Star } from 'lucide-react';

const DATA = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 2000, orders: 15 },
  { name: 'Thu', sales: 2780, orders: 20 },
  { name: 'Fri', sales: 1890, orders: 12 },
  { name: 'Sat', sales: 2390, orders: 16 },
  { name: 'Sun', sales: 3490, orders: 22 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold">Business Overview</h1>
          <p className="text-gray-500">Tracking GlowCart's performance in real-time.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2 text-xs font-bold">
          <Activity size={14} className="text-green-500" />
          SYSTEMS ACTIVE
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
              <DollarSign size={20} />
            </div>
            <span className="text-sm font-bold text-gray-400">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold">$24,450</p>
          <div className="flex items-center gap-1 text-green-500 text-xs font-bold mt-2">
            <TrendingUp size={12} /> +12.5% vs last week
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <ShoppingCart size={20} />
            </div>
            <span className="text-sm font-bold text-gray-400">Orders</span>
          </div>
          <p className="text-2xl font-bold">127</p>
          <div className="flex items-center gap-1 text-green-500 text-xs font-bold mt-2">
            <TrendingUp size={12} /> +4.2% vs last week
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <Users size={20} />
            </div>
            <span className="text-sm font-bold text-gray-400">Visitors</span>
          </div>
          <p className="text-2xl font-bold">1,894</p>
          <div className="flex items-center gap-1 text-red-400 text-xs font-bold mt-2">
            <TrendingUp size={12} className="rotate-180" /> -2.1% vs last week
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold-accent/10 text-gold-accent flex items-center justify-center">
              <Star size={20} />
            </div>
            <span className="text-sm font-bold text-gray-400">Avg. Rating</span>
          </div>
          <p className="text-2xl font-bold">4.82</p>
          <div className="flex items-center gap-1 text-green-500 text-xs font-bold mt-2">
            <TrendingUp size={12} /> +0.1% vs last week
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="font-bold mb-8">Revenue Analytics (7D)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#fff0f3'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="sales" fill="#FFD1DC" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="font-bold mb-8">Order Volume (7D)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="orders" stroke="#FF6B9D" strokeWidth={4} dot={{r: 6, fill: '#FF6B9D'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
