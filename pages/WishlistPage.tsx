import React from 'react';
import { useStore } from '../store/useStore';
import { MOCK_PRODUCTS } from '../services/mockData';
import { ProductCard } from '../components/ProductCard';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WishlistPage: React.FC = () => {
  const wishlistIds = useStore(state => state.wishlist);
  const navigate = useNavigate();
  
  const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-12">
      {/* Desktop Header */}
      <div className="hidden md:block border-b border-gray-200 bg-white mb-8">
        <div className="max-w-screen-xl mx-auto px-8 py-6">
           <div className="flex items-center gap-2 mb-4 text-sm text-text-muted">
             <span onClick={() => navigate('/profile')} className="cursor-pointer hover:underline">Your Account</span>
             <span>›</span>
             <span className="text-primary font-bold">Your Wishlist</span>
           </div>
           <h1 className="text-3xl font-bold">Your Wishlist</h1>
        </div>
      </div>

      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4 md:hidden">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">My Wishlist</h1>
      </div>

      <div className="px-6 md:px-8 max-w-screen-xl mx-auto">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted">No items saved yet.</p>
            <button 
              onClick={() => navigate('/')} 
              className="mt-4 text-primary font-bold hover:underline"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};