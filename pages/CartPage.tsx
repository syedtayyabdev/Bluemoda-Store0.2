import React from 'react';
import { useStore } from '../store/useStore';
import { ChevronLeft, Trash2, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, addToCart, decrementCartItem } = useStore();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = totalPrice > 100 ? 0 : 15;
  const total = totalPrice + shipping;
  
  const isBelowMinimum = total < 50;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <Trash2 size={40} className="text-primary opacity-50" />
        </div>
        <h2 className="text-2xl font-bold text-text-main mb-2">Your Cart is Empty</h2>
        <p className="text-text-muted mb-8">Looks like you haven't added anything yet.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-12">
      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4 md:static md:p-6 md:mb-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">My Cart</h1>
      </div>

      <div className="md:flex md:gap-8 md:px-6 md:items-start">
        {/* Cart Items List */}
        <div className="px-6 space-y-4 md:px-0 md:flex-1">
          {cart.map((item) => (
            <motion.div 
              layout
              key={`${item.id}-${item.selectedSize}`}
              className="bg-white p-4 rounded-3xl shadow-sm flex gap-4"
            >
              <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-xl bg-gray-50" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-text-main line-clamp-1">{item.title}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-text-muted">Size: {item.selectedSize} • {item.brand}</p>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
                    <button 
                      onClick={() => decrementCartItem(item.id, item.selectedSize)}
                      className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold active:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={12} className={item.quantity <= 1 ? "text-gray-300" : "text-text-main"} />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item, item.selectedSize)}
                      className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold active:bg-gray-100"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary & Checkout - Mobile: Fixed Bottom, Desktop: Sticky Sidebar */}
        <div className="md:w-96 md:sticky md:top-24">
          <div className="px-6 mt-8 mb-4 md:px-0 md:mt-0">
            <div className="bg-white p-6 rounded-3xl shadow-sm space-y-3">
              <h3 className="font-bold text-lg mb-2">Order Summary</h3>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-bold text-text-main">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Shipping</span>
                <span className="font-bold text-text-main">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="h-px bg-gray-100 my-2"></div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-text-main">Total</span>
                <span className="font-bold text-primary">${total.toFixed(2)}</span>
              </div>
              
              {/* Desktop Checkout Button */}
              <div className="hidden md:block mt-6">
                <button 
                  onClick={() => !isBelowMinimum && navigate('/checkout')}
                  disabled={isBelowMinimum}
                  className={clsx(
                    "w-full font-bold py-4 rounded-full shadow-lg transition-all",
                    isBelowMinimum
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                      : "bg-primary text-white shadow-blue-500/30 active:scale-95 hover:bg-primary-dark"
                  )}
                >
                  {isBelowMinimum ? 'Add more items' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 max-w-md mx-auto md:hidden">
        <button 
            onClick={() => !isBelowMinimum && navigate('/checkout')}
            disabled={isBelowMinimum}
            className={clsx(
              "w-full font-bold py-4 rounded-full shadow-lg transition-all",
              isBelowMinimum
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-primary text-white shadow-blue-500/30 active:scale-95"
            )}
        >
            {isBelowMinimum ? 'Add more items' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
};