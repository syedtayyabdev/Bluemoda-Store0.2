import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ChevronLeft, CheckCircle2, CreditCard, MapPin, ShieldCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CheckoutPage: React.FC = () => {
  const { cart, placeOrder, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'success'>('form');

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = totalPrice > 100 ? 0 : 15;
  const total = totalPrice + shipping;

  const handlePlaceOrder = () => {
    // Simulate API call
    setTimeout(() => {
      placeOrder({
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toISOString(),
        total: total,
        status: 'PENDING',
        items: [...cart]
      });
      setStep('success');
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-2xl font-bold text-text-main mb-2">Order Placed!</h1>
        <p className="text-text-muted mb-8">Thank you for your purchase. Your order is being processed.</p>
        <button 
          onClick={() => navigate('/orders')}
          className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30 hover:bg-primary-dark transition-colors"
        >
          View Order
        </button>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-sm text-text-muted font-medium hover:text-primary transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-12">
      {/* Desktop Header */}
      <div className="hidden md:block border-b border-gray-200 bg-white mb-8">
        <div className="max-w-screen-xl mx-auto px-8 py-6 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div onClick={() => navigate('/')} className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg cursor-pointer">B</div>
             <h1 className="text-2xl font-bold">Checkout</h1>
           </div>
           <div className="flex items-center gap-2 text-text-muted">
             <Lock size={16} />
             <span className="text-sm font-medium">Secure Checkout</span>
           </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4 md:hidden">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Checkout</h1>
      </div>

      <div className="max-w-screen-xl mx-auto md:px-8 md:grid md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8 space-y-6 px-6 md:px-0">
          {/* Address Section */}
          <section>
            <div className="flex justify-between items-center mb-3">
               <h3 className="font-bold text-text-main flex items-center gap-2 text-lg">
                 1. Shipping Address
               </h3>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:border-primary/20 transition-colors cursor-pointer relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <div className="flex justify-between items-start">
                <div className="pl-2">
                  <p className="font-bold text-sm text-text-main">Alex Rivera</p>
                  <p className="text-sm text-text-muted mt-1">123 Ocean Drive, Suite 404</p>
                  <p className="text-sm text-text-muted">Miami, FL 33139</p>
                  <p className="text-sm text-text-muted mt-1">United States</p>
                </div>
                <button className="text-primary text-sm font-bold hover:underline">Change</button>
              </div>
            </div>
          </section>

          {/* Payment Section */}
          <section>
            <div className="flex justify-between items-center mb-3">
               <h3 className="font-bold text-text-main flex items-center gap-2 text-lg">
                 2. Payment Method
               </h3>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center">
                    <div className="w-6 h-4 border border-white/30 rounded-sm"></div>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Visa ending in 4242</p>
                    <p className="text-xs text-text-muted">Expires 12/25</p>
                  </div>
                </div>
                <button className="text-primary text-sm font-bold hover:underline">Change</button>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2 text-xs text-text-muted">
                 <ShieldCheck size={14} className="text-green-600" />
                 <span>Your payment information is encrypted and secure.</span>
              </div>
            </div>
          </section>

          {/* Order Items Preview */}
          <section>
            <h3 className="font-bold text-text-main mb-3 text-lg">3. Review Items</h3>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
               <div className="space-y-4">
                 {cart.map(item => (
                   <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                     <img src={item.image} className="w-20 h-20 rounded-xl object-cover bg-gray-50" />
                     <div className="flex-1">
                       <h4 className="font-bold text-sm text-text-main">{item.title}</h4>
                       <p className="text-xs text-text-muted mt-1">Size: {item.selectedSize}</p>
                       <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
                       <p className="font-bold text-primary mt-2">${item.price.toFixed(2)}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </section>
        </div>

        {/* Order Summary Sidebar */}
        <div className="md:col-span-4 mt-6 md:mt-0">
          <div className="md:sticky md:top-24 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <button 
                onClick={handlePlaceOrder}
                className="hidden md:block w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-full shadow-lg shadow-blue-500/30 transition-all mb-4"
            >
                Place Your Order
            </button>
            <p className="text-xs text-center text-text-muted mb-4 hidden md:block">
              By placing your order, you agree to BlueModa's <a href="#" className="text-primary hover:underline">privacy notice</a> and <a href="#" className="text-primary hover:underline">conditions of use</a>.
            </p>

            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-text-muted">Items ({cart.reduce((a,c)=>a+c.quantity,0)}):</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-text-muted">Shipping & Handling:</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-text-muted">Total before tax:</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-text-muted">Estimated tax to be collected:</span>
                    <span className="font-medium">$0.00</span>
                </div>
                <div className="h-px bg-gray-100 my-2"></div>
                <div className="flex justify-between text-lg text-red-700">
                    <span className="font-bold">Order Total:</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-4 rounded-xl">
               <h4 className="font-bold text-sm mb-1 text-primary">How are shipping costs calculated?</h4>
               <p className="text-xs text-text-muted">Prime members enjoy free shipping on all eligible orders.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 max-w-md mx-auto md:hidden">
        <div className="flex justify-between mb-4">
            <span className="text-text-muted">Order Total</span>
            <span className="font-bold text-xl text-red-700">${total.toFixed(2)}</span>
        </div>
        <button 
            onClick={handlePlaceOrder}
            className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
        >
            Place Order
        </button>
      </div>
    </div>
  );
};