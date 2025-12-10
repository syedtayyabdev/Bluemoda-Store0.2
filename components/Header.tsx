import React from 'react';
import { Bell, Search, SlidersHorizontal, ShoppingCart, Menu, User, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate, NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onFilterClick }) => {
  const { user, cart } = useStore();
  const navigate = useNavigate();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const secondaryLinks = [
    'Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell'
  ];

  return (
    <div className="bg-background sticky top-0 z-40 transition-all">
      {/* Mobile Top Bar */}
      <div className="md:hidden px-6 pt-8 pb-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
             <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg">B</div>
             <span className="font-bold text-lg">BlueModa</span>
          </div>
          
          <button 
            onClick={() => navigate('/notifications')}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm relative hover:bg-gray-50 transition-all active:scale-95"
          >
            <Bell size={20} className="text-text-main" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 h-12 bg-white rounded-2xl flex items-center px-4 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search size={20} className="text-text-muted mr-3" />
            <input 
              type="text" 
              placeholder="Search store..." 
              onChange={(e) => onSearch(e.target.value)}
              className="w-full h-full bg-transparent outline-none text-sm font-medium text-text-main placeholder:text-gray-400"
            />
          </div>
          <button 
            onClick={onFilterClick}
            className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
          >
            <SlidersHorizontal size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Desktop Professional Header */}
      <div className="hidden md:block bg-white shadow-sm border-b border-gray-100">
        {/* Top Tier */}
        <div className="flex items-center justify-between px-0 py-3 gap-8">
           {/* Logo */}
           <div 
             onClick={() => navigate('/')} 
             className="flex items-center gap-2 cursor-pointer shrink-0"
           >
             <div className="bg-primary w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">B</div>
             <span className="font-bold text-2xl tracking-tight text-text-main">BlueModa</span>
           </div>

           {/* Location (Mock) */}
           <div className="flex flex-col text-sm cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors shrink-0">
              <span className="text-gray-500 text-xs ml-5">Deliver to</span>
              <div className="flex items-center font-bold text-text-main">
                <MapPin size={16} className="mr-1 text-primary" />
                Miami 33139
              </div>
           </div>

           {/* Search Bar */}
           <div className="flex-1 max-w-3xl">
             <div className="flex h-11 bg-gray-100 rounded-full overflow-hidden border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all hover:bg-gray-50">
                <div className="bg-gray-200 px-4 flex items-center text-xs font-bold text-gray-600 border-r border-gray-300 cursor-pointer hover:bg-gray-300 transition-colors">
                  All
                </div>
                <input 
                  type="text" 
                  placeholder="Search products, brands, and more..."
                  onChange={(e) => onSearch(e.target.value)}
                  className="flex-1 bg-transparent px-4 outline-none text-sm text-text-main font-medium" 
                />
                <button className="bg-primary hover:bg-primary-dark text-white px-6 transition-colors flex items-center justify-center">
                   <Search size={20} />
                </button>
             </div>
           </div>

           {/* Right Actions */}
           <div className="flex items-center gap-6 shrink-0">
              <div className="flex flex-col text-sm cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/profile')}>
                 <span className="text-xs text-text-muted">Hello, {user ? user.name.split(' ')[0] : 'Sign in'}</span>
                 <span className="font-bold">Account & Lists</span>
              </div>
              
              <div className="flex flex-col text-sm cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/orders')}>
                 <span className="text-xs text-text-muted">Returns</span>
                 <span className="font-bold">& Orders</span>
              </div>

              <div 
                onClick={() => navigate('/cart')}
                className="flex items-center gap-1 cursor-pointer group"
              >
                 <div className="relative p-2">
                    <ShoppingCart size={28} className="text-text-main group-hover:text-primary transition-colors" />
                    <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {cartCount}
                    </span>
                 </div>
                 <span className="font-bold text-sm mt-2">Cart</span>
              </div>
           </div>
        </div>

        {/* Bottom Tier (Nav Links) */}
        <div className="bg-primary/5 border-t border-primary/10 px-0 py-2 flex items-center gap-6">
           <button className="flex items-center gap-1 text-sm font-bold text-text-main hover:bg-white/50 px-2 py-1 rounded-md transition-colors">
             <Menu size={18} />
             All
           </button>
           {secondaryLinks.map(link => (
             <a key={link} href="#" className="text-sm font-medium text-text-main hover:text-primary hover:underline transition-all">
               {link}
             </a>
           ))}
           <div className="flex-1"></div>
           <span className="text-sm font-bold text-primary cursor-pointer hover:underline">
             New Summer Launches
           </span>
        </div>
      </div>
    </div>
  );
};