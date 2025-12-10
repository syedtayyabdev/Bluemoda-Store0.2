import React from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FloatingCart: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 left-4 right-4 z-40 md:left-[50%] md:ml-[-240px] md:w-[480px] md:right-auto"
      >
        <div 
          onClick={() => navigate('/cart')}
          className="bg-primary text-white rounded-full p-2 pr-6 shadow-float flex items-center justify-between cursor-pointer hover:bg-primary-dark transition-colors group backdrop-blur-md bg-opacity-95"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center relative">
              <ShoppingBag size={20} className="text-white" />
              <span className="absolute -top-1 -right-1 bg-accent text-primary font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
                {totalItems}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-blue-100 font-medium">Total</span>
              <span className="font-bold text-lg leading-none">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">View Cart</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
