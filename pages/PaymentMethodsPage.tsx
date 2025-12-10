import React from 'react';
import { ChevronLeft, CreditCard, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const PaymentMethodsPage: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    { id: 1, type: 'Visa', number: '4242', exp: '12/25', color: 'bg-slate-800' },
    { id: 2, type: 'Mastercard', number: '8888', exp: '09/24', color: 'bg-primary' },
  ];

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-12">
      <div className="hidden md:block border-b border-gray-200 bg-white mb-8">
        <div className="max-w-screen-xl mx-auto px-8 py-6">
           <div className="flex items-center gap-2 mb-4 text-sm text-text-muted">
             <span onClick={() => navigate('/profile')} className="cursor-pointer hover:underline">Your Account</span>
             <span>›</span>
             <span className="text-primary font-bold">Your Wallet</span>
           </div>
           <h1 className="text-3xl font-bold">Payment Methods</h1>
        </div>
      </div>

      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4 md:hidden">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Payment Methods</h1>
      </div>

      <div className="px-6 md:px-8 max-w-screen-xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <motion.div 
            key={card.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-3xl shadow-sm border border-transparent hover:border-primary/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-8 ${card.color} rounded-md flex items-center justify-center`}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/50"></div>
                  <div className="w-2 h-2 rounded-full bg-white/80"></div>
                </div>
              </div>
              <button className="text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="mb-2">
              <p className="text-sm text-text-muted">Card Number</p>
              <p className="font-bold text-lg tracking-widest">•••• •••• •••• {card.number}</p>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-text-muted">Expiry</p>
                <p className="font-medium text-sm">{card.exp}</p>
              </div>
              {card.id === 1 && (
                <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-full">Default</span>
              )}
            </div>
          </motion.div>
        ))}

        <button className="w-full h-full min-h-[160px] py-4 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 text-text-muted hover:border-primary hover:text-primary hover:bg-blue-50 transition-all">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white">
            <Plus size={24} />
          </div>
          <span className="font-medium">Add New Card</span>
        </button>
      </div>
    </div>
  );
};