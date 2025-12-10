import React from 'react';
import { useLocation } from 'react-router-dom';
import { FloatingCart } from './FloatingCart';
import { BottomNav } from './BottomNav';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Hide BottomNav on Product Details, Cart, and Checkout pages on MOBILE
  // On Desktop, BottomNav is always hidden via CSS (md:hidden)
  const hideBottomNavMobile = 
    location.pathname.includes('/product/') || 
    location.pathname.includes('/cart') || 
    location.pathname.includes('/checkout');

  // Floating cart should not appear on Cart or Checkout pages
  const showFloatingCart = !location.pathname.includes('/cart') && !location.pathname.includes('/checkout');

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-primary/20 pb-20 md:pb-0">
      <div className="w-full mx-auto min-h-screen bg-background relative md:max-w-[1600px] md:shadow-none shadow-2xl pb-16 md:pb-0">
        <div className="md:px-8 lg:px-12">
          {children}
        </div>
        
        {showFloatingCart && <FloatingCart />}
        
        {!hideBottomNavMobile && (
          <div className="md:hidden">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
};