import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Star, ShoppingBag, Truck, RotateCcw, ShieldCheck, MapPin, Lock, Share2, ArrowLeft, Home } from 'lucide-react';
import { MOCK_PRODUCTS } from '../services/mockData';
import { useStore } from '../store/useStore';
import { Header } from '../components/Header';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const CLOTHING_SIZES = ['S', 'M', 'L', 'XL'];

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const isLiked = product ? wishlist.includes(product.id) : false;
  
  // Determine if product should have sizes
  const isClothing = product ? ['Swimwear', 'T-Shirts'].includes(product.category) : false;
  const availableSizes = isClothing ? CLOTHING_SIZES : ['One Size'];
  
  const [selectedSize, setSelectedSize] = useState<string>(isClothing ? 'M' : 'One Size');
  const [isAdded, setIsAdded] = useState(false);
  const [mainImage, setMainImage] = useState(product?.image);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  // Reset size and added state when product changes
  useEffect(() => {
    setSelectedSize(isClothing ? 'M' : 'One Size');
    setIsAdded(false);
    setMainImage(product?.image);
  }, [id, isClothing, product]);

  if (!product) {
    return <div className="p-8 text-center mt-10">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isLiked) {
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 800);
    }
  };

  const handleSearch = (query: string) => {
    // Navigate to Home with search query
    navigate('/', { state: { searchQuery: query } });
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const dateString = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-12">
      {/* Include Header for Desktop Consistency */}
      <div className="hidden md:block">
        <Header onSearch={handleSearch} onFilterClick={() => navigate('/', { state: { openFilter: true } })} />
      </div>

      {/* Mobile Navbar Overlay */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-md mx-auto md:hidden pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors pointer-events-auto"
        >
          <ChevronLeft size={24} className="text-text-main" />
        </button>
        <button 
          onClick={handleToggleWishlist}
          className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors pointer-events-auto relative"
        >
           <AnimatePresence>
            {showHeartAnim && (
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center text-red-500"
              >
                <Heart size={20} className="fill-current" />
              </motion.div>
            )}
          </AnimatePresence>
          <Heart size={20} className={clsx("transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-text-main")} />
        </button>
      </div>
      
      {/* Desktop Breadcrumbs & Back Bar */}
      <div className="hidden md:block border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 font-bold text-text-main hover:text-primary transition-colors pr-6 border-r border-gray-300"
            >
              <ArrowLeft size={18} />
              Back to results
            </button>
            
            <div className="flex items-center gap-2 text-text-muted">
              <span onClick={() => navigate('/')} className="cursor-pointer hover:underline hover:text-primary flex items-center gap-1">
                <Home size={14} /> Home
              </span>
              <span className="text-gray-300">/</span>
              <span onClick={() => navigate('/')} className="cursor-pointer hover:underline hover:text-primary">{product.category}</span>
              <span className="text-gray-300">/</span>
              <span className="text-text-main font-medium truncate max-w-[300px]">{product.title}</span>
            </div>
          </div>
          
          <div className="flex gap-4">
             <button className="text-xs font-bold text-primary hover:underline">Share</button>
             <button className="text-xs font-bold text-primary hover:underline">Report incorrect product information</button>
          </div>
        </div>
      </div>

      <div className="md:grid md:grid-cols-12 md:gap-8 md:px-6 md:items-start relative max-w-screen-2xl mx-auto mt-6 md:mt-8">
        
        {/* Column 1: Image Gallery (Span 5) */}
        <div className="md:col-span-5 relative">
          <div className="h-[50vh] w-full bg-white relative md:h-[500px] md:rounded-2xl md:overflow-hidden md:border md:border-gray-100 flex items-center justify-center group">
            <img 
              src={mainImage} 
              alt={product.title} 
              className="w-full h-full object-cover rounded-b-[3rem] md:rounded-none shadow-soft md:shadow-none transition-all duration-300"
            />
            
            {/* Desktop Wishlist & Share Buttons */}
            <div className="hidden md:flex absolute top-4 right-4 flex-col gap-3">
              <button 
                onClick={handleToggleWishlist}
                className="w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-50 flex items-center justify-center transition-transform hover:scale-105 relative"
                title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                 <AnimatePresence>
                  {showHeartAnim && (
                    <motion.div
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center text-red-500 pointer-events-none"
                    >
                      <Heart size={20} className="fill-current" />
                    </motion.div>
                  )}
                </AnimatePresence>
                 <Heart size={20} className={clsx("transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500")} />
              </button>
              <button className="w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary transition-transform hover:scale-105">
                 <Share2 size={20} />
              </button>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="hidden md:flex gap-3 mt-4 justify-center">
             {[product.image, `https://picsum.photos/400/500?random=${product.id}1`, `https://picsum.photos/400/500?random=${product.id}2`].map((img, i) => (
               <div 
                  key={i} 
                  onMouseEnter={() => setMainImage(img)}
                  className={clsx(
                    "w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
                    mainImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'
                  )}
               >
                 <img src={img} className="w-full h-full object-cover" alt="" />
               </div>
             ))}
          </div>
        </div>

        {/* Column 2: Product Info (Span 4) */}
        <div className="px-6 pt-6 md:px-0 md:pt-0 md:col-span-4">
          <div className="border-b border-gray-100 pb-4 mb-4">
             <a href="#" className="text-primary text-sm font-bold hover:underline mb-1 block">{product.brand} Store</a>
             <h1 className="text-2xl font-bold text-text-main mb-2 md:text-3xl leading-tight">{product.title}</h1>
             <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                    <div className="flex text-accent">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className={clsx(star <= Math.round(product.rating) ? "fill-current" : "text-gray-200 fill-gray-200")} />
                        ))}
                    </div>
                    <span className="text-primary hover:underline cursor-pointer">{product.reviewsCount} ratings</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-text-muted">Search this page</span>
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-baseline gap-2">
                <span className="text-red-600 text-lg">-30%</span>
                <span className="text-3xl font-bold text-text-main">${product.price.toFixed(2)}</span>
             </div>
             <p className="text-sm text-text-muted">List Price: <span className="line-through">${(product.price * 1.3).toFixed(2)}</span></p>

             {/* Size Selector Inline for Desktop */}
             <div className="my-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-text-muted">Size: <span className="text-text-main">{selectedSize}</span></span>
                  {isClothing && <span className="text-xs text-primary font-bold cursor-pointer hover:underline">Size Chart</span>}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={clsx(
                        "h-10 px-4 rounded-lg text-sm font-bold transition-all border",
                        selectedSize === size
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-white border-gray-200 text-text-main hover:bg-gray-50"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
             </div>

             {/* Description Bullets */}
             <div className="prose prose-sm text-text-main">
                <h3 className="font-bold text-sm mb-2">About this item</h3>
                <ul className="list-disc pl-4 space-y-1 text-sm marker:text-gray-400">
                   <li>Professional grade material designed for durability.</li>
                   <li>Chlorine resistant fabric ensures longevity.</li>
                   <li>Ergonomic fit for maximum comfort and speed.</li>
                   <li>{product.description}</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Column 3: Buy Box (Span 3) - Sticky */}
        <div className="hidden md:block md:col-span-3 sticky top-36">
           <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
              <div className="mb-4">
                 <span className="text-2xl font-bold block">${product.price.toFixed(2)}</span>
                 <div className="text-sm text-text-muted mt-2">
                    Free Returns
                 </div>
                 <div className="text-sm mt-2">
                    Free delivery <span className="font-bold text-text-main">{dateString}</span>. 
                    <br/>Order within <span className="text-green-600">4 hrs 2 mins</span>
                 </div>
                 <div className="flex items-center gap-1 text-sm mt-2 text-primary cursor-pointer hover:underline">
                    <MapPin size={14} /> Deliver to Miami 33139
                 </div>
              </div>

              <div className="text-lg font-bold text-green-600 mb-4">
                 {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </div>

              <div className="space-y-3">
                 <button 
                    onClick={handleAddToCart}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 rounded-full shadow-sm transition-colors text-sm"
                 >
                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                 </button>
                 <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 rounded-full shadow-sm transition-colors text-sm">
                    Buy Now
                 </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                  <button 
                    onClick={handleToggleWishlist}
                    className="w-full py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors mb-4 flex items-center justify-center gap-2"
                  >
                    {isLiked ? 'Remove from List' : 'Add to List'}
                  </button>

                  <div className="text-xs text-text-muted space-y-1">
                    <div className="flex gap-2">
                        <span className="w-20">Ships from</span>
                        <span className="text-text-main">BlueModa</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-20">Sold by</span>
                        <span className="text-text-main">BlueModa</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-primary cursor-pointer hover:underline mt-4">
                     <Lock size={14} /> Secure transaction
                  </div>
              </div>
           </div>
        </div>

        {/* Mobile Fixed Buy Button (Keep for Mobile) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 rounded-t-3xl shadow-lg z-40">
           <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
              <span className="text-xs text-green-600 font-bold">In Stock</span>
           </div>
           <button 
              onClick={handleAddToCart}
              className="w-full bg-primary text-white font-bold py-3 rounded-full flex items-center justify-center gap-2"
           >
              <ShoppingBag size={18} /> {isAdded ? 'Added' : 'Add to Cart'}
           </button>
        </div>
      </div>

      {/* Additional Sections below fold */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-6 mt-12 md:mt-16">
         <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold mb-6">Product specifications</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="flex py-2 border-b border-gray-100">
                   <span className="w-1/3 text-text-muted text-sm">Brand</span>
                   <span className="text-sm font-medium">{product.brand}</span>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                   <span className="w-1/3 text-text-muted text-sm">Material</span>
                   <span className="text-sm font-medium">Polyester Blend</span>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                   <span className="w-1/3 text-text-muted text-sm">Fit Type</span>
                   <span className="text-sm font-medium">Athletic</span>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                   <span className="w-1/3 text-text-muted text-sm">Care Instructions</span>
                   <span className="text-sm font-medium">Hand Wash Only</span>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};