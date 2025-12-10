import React, { useState } from 'react';
import { X, Star, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../types';
import clsx from 'clsx';

interface FilterState {
  category: Category;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  size: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

const CATEGORIES: Category[] = ['All', 'Swimwear', 'Goggles', 'T-Shirts', 'Accessories'];
const RATINGS = [4.5, 4.0, 3.0, 0];
const SIZES = ['S', 'M', 'L', 'XL'];

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, initialFilters }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    const defaultFilters = {
      category: 'All' as Category,
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0,
      size: ''
    };
    setFilters(defaultFilters);
    onApply(defaultFilters);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed bottom-0 left-0 right-0 z-[60] bg-background rounded-t-[2.5rem] p-6 max-h-[85vh] overflow-y-auto max-w-md mx-auto shadow-2xl no-scrollbar md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto md:translate-x-[-50%] md:translate-y-[-50%] md:w-[500px] md:max-w-[90vw] md:h-auto md:max-h-[85vh] md:rounded-[2rem] md:transform-none"
            style={{ 
              // Framer motion overrides transform, so we handle centering via flex or margin if this conflicts, 
              // but fixed positioning with negative margins works well.
              // For desktop centering with Framer Motion, we often use a different animation variant.
              // Simplified here: relying on fixed positioning + responsive classes.
            }}
          >
             {/* Desktop Centering Fix for Framer Motion: Overriding style if needed by classNames */}
             {/* Note: The md:translate... classes might conflict with `animate={{ y: 0 }}`. 
                 A cleaner approach for responsive animation is conditional variants, but CSS layout is robust. */}
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-background z-10 pb-2">
              <h2 className="text-xl font-bold text-text-main">Filter Products</h2>
              <button 
                onClick={onClose}
                className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-text-main" />
              </button>
            </div>

            <div className="space-y-8 pb-4">
              {/* Category Section */}
              <section>
                <h3 className="font-bold text-text-main mb-3 text-sm">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat })}
                      className={clsx(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                        filters.category === cat
                          ? "bg-primary text-white border-primary shadow-lg shadow-blue-500/20"
                          : "bg-white text-text-muted border-gray-100 hover:border-gray-200"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>

              {/* Price Range Section */}
              <section>
                <div className="flex justify-between mb-3">
                  <h3 className="font-bold text-text-main text-sm">Price Range</h3>
                  <span className="text-sm font-bold text-primary">
                    ${filters.minPrice} - ${filters.maxPrice > 500 ? '500+' : filters.maxPrice}
                  </span>
                </div>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between mt-2 text-xs text-text-muted font-medium">
                    <span>$0</span>
                    <span>$250</span>
                    <span>$500+</span>
                  </div>
                </div>
              </section>

              {/* Size Section */}
              <section>
                <h3 className="font-bold text-text-main mb-3 text-sm">Size</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setFilters({ ...filters, size: '' })}
                    className={clsx(
                      "h-12 px-5 rounded-full flex items-center justify-center text-sm font-bold transition-all border",
                      filters.size === ''
                        ? "bg-primary text-white border-primary shadow-lg shadow-blue-500/20"
                        : "bg-white text-text-muted border-gray-100 hover:border-gray-200"
                    )}
                  >
                    Any
                  </button>
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setFilters({ ...filters, size: filters.size === size ? '' : size })}
                      className={clsx(
                        "h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold transition-all border",
                        filters.size === size
                          ? "bg-primary text-white border-primary shadow-lg shadow-blue-500/20"
                          : "bg-white text-text-muted border-gray-100 hover:border-gray-200"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </section>

              {/* Rating Section */}
              <section>
                <h3 className="font-bold text-text-main mb-3 text-sm">Minimum Rating</h3>
                <div className="flex flex-col gap-2">
                  {RATINGS.map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ ...filters, minRating: rating })}
                      className={clsx(
                        "flex items-center justify-between p-3 rounded-2xl border transition-all",
                        filters.minRating === rating
                          ? "bg-blue-50 border-primary/30"
                          : "bg-white border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {rating === 0 ? (
                          <span className="text-sm font-medium text-text-main">Any Rating</span>
                        ) : (
                          <>
                             <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={16}
                                  className={clsx(
                                    star <= rating 
                                      ? "fill-accent text-accent" 
                                      : "fill-gray-200 text-gray-200"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-text-main ml-2">& Up</span>
                          </>
                        )}
                      </div>
                      {filters.minRating === rating && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleClear}
                className="flex-1 py-4 rounded-full font-bold text-text-muted bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleApply}
                className="flex-[2] py-4 rounded-full font-bold text-white bg-primary shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
              >
                Show Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};