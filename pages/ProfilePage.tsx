import React from 'react';
import { useStore } from '../store/useStore';
import { User, Settings, Package, Heart, CreditCard, Shield, FileText, HelpCircle, LogOut, ChevronRight, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, logout, login } = useStore();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Package, label: 'My Orders', path: '/orders' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: CreditCard, label: 'Payment Methods', path: '/payment-methods' },
    { icon: User, label: 'About Us', path: '/info/about' },
    { icon: HelpCircle, label: 'Contact Support', path: '/info/contact' },
    { icon: Shield, label: 'Privacy Policy', path: '/info/privacy-policy' },
    { icon: FileText, label: 'Terms of Service', path: '/info/terms-of-service' },
    { icon: Package, label: 'Shipping Policy', path: '/info/shipping-policy' },
    { icon: FileText, label: 'Return Policy', path: '/info/return-policy' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center pb-32">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-primary">
          <User size={48} />
        </div>
        <h1 className="text-2xl font-bold text-text-main mb-2">Welcome Guest</h1>
        <p className="text-text-muted mb-8">Sign in to manage your orders and wishlist.</p>
        <button 
          onClick={login}
          className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <LogIn size={20} />
          Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-12">
      <div className="max-w-2xl mx-auto md:mt-10 md:bg-white md:rounded-3xl md:shadow-lg md:overflow-hidden md:border md:border-gray-100">
        
        {/* Header Profile Card */}
        <div className="p-6 pt-12 bg-surface md:bg-blue-50/50 rounded-b-[3rem] md:rounded-none shadow-soft md:shadow-none mb-6 text-center border-b border-gray-100">
          <div className="relative w-24 h-24 mx-auto mb-4 group cursor-pointer">
            <img 
              src={user.avatar || "https://i.pravatar.cc/150"} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform"
            />
            <button 
              onClick={() => navigate('/settings')}
              className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-2 border-white hover:bg-primary-dark transition-colors shadow-sm"
            >
              <Settings size={14} />
            </button>
          </div>
          <h1 className="text-xl font-bold text-text-main">{user.name}</h1>
          <p className="text-sm text-text-muted">{user.email}</p>
        </div>

        {/* Menu List */}
        <div className="px-6 space-y-3 md:pb-8">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full bg-white md:bg-gray-50 p-4 rounded-2xl flex items-center justify-between shadow-sm md:shadow-none hover:bg-blue-50 md:hover:bg-blue-100 transition-colors group border border-transparent hover:border-blue-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 md:bg-white flex items-center justify-center text-primary shadow-sm">
                  <item.icon size={20} />
                </div>
                <span className="font-medium text-text-main">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
            </button>
          ))}

          <button 
            onClick={logout}
            className="w-full bg-white md:bg-red-50 p-4 rounded-2xl flex items-center justify-between shadow-sm md:shadow-none hover:bg-red-50 md:hover:bg-red-100 transition-colors group mt-6 border border-transparent hover:border-red-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-50 md:bg-white flex items-center justify-center text-red-500 shadow-sm">
                <LogOut size={20} />
              </div>
              <span className="font-medium text-red-500">Log Out</span>
            </div>
          </button>
        </div>
      </div>
      
      <div className="text-center mt-8 pb-4">
        <p className="text-xs text-text-muted">App Version 1.0.0</p>
      </div>
    </div>
  );
};