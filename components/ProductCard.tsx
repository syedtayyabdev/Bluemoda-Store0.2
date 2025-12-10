import React from 'react';
import { Product } from '../types';
import { Heart, Star, ShoppingBag, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addToCart = useStore((state) => state.addToCart);
  const wishlist = useStore((state) => state.wishlist);
  const isLiked = wishlist.includes(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'One Size'); // Default size for quick add
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const dateString = deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <motion.div 
      layout
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white rounded-xl md:rounded-lg p-3 relative shadow-sm border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
    >
      {/* Wishlist Icon */}
      <button 
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 z-20 p-1.5 bg-white/80 backdrop-blur-md rounded-full hover:bg-white shadow-sm transition-all"
      >
        <Heart 
          size={16} 
          className={clsx(
            "transition-colors",
            isLiked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
          )} 
        />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full mb-3 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Desktop Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-white/90 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:flex flex-col gap-2">
           <button 
             onClick={handleAddToCart}
             className="w-full bg-primary text-white text-xs font-bold py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center gap-1"
           >
             <ShoppingBag size={14} /> Add to Cart
           </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-text-main text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-1">
          <div className="flex text-accent">
             {[1,2,3,4,5].map(s => <Star key={s} size={10} className={clsx(s <= Math.round(product.rating) ? "fill-current" : "text-gray-200 fill-gray-200")} />)}
          </div>
          <span className="text-xs text-text-muted">{product.reviewsCount}</span>
        </div>

        <div className="mt-1">
          <span className="text-lg font-bold text-text-main">${product.price.toFixed(0)}</span>
          <span className="text-xs align-top">99</span>
        </div>

        <div className="text-[10px] text-text-muted mt-1 leading-tight">
          Get it by <span className="font-bold text-text-main">{dateString}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
           <span className="text-[10px] text-blue-600 bg-blue-50 px-1 rounded font-bold">Express</span>
           {product.stock < 10 && <span className="text-[10px] text-red-600 font-medium">Only {product.stock} left</span>}
        </div>
      </div>
    </motion.div>
  );
};