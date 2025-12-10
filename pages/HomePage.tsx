import React, { useState, useMemo, useEffect } from 'react';
import { Header } from '../components/Header';
import { CategoryRail } from '../components/CategoryRail';
import { ProductCard } from '../components/ProductCard';
import { FilterModal } from '../components/FilterModal';
import { MOCK_PRODUCTS } from '../services/mockData';
import { Category } from '../types';
import { SearchX, ArrowUpDown, Tag, Star, XCircle, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Avg. Customer Review' },
];

const CATEGORIES: Category[] = ['Swimwear', 'Goggles', 'T-Shirts', 'Accessories'];

export const HomePage: React.FC = () => {
  const location = useLocation();
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Advanced Filter State
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Sorting State
  const [sortBy, setSortBy] = useState<string>('featured');

  // Handle incoming search query from other pages (e.g. Header on Product Page)
  useEffect(() => {
    if (location.state && typeof location.state.searchQuery === 'string') {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state]);

  // Combine logic for Category Rail and Filter Modal
  const handleCategorySelect = (cat: Category | 'All') => {
    setSelectedCategory(cat);
  };

  const handleApplyFilters = (filters: { category: Category; minPrice: number; maxPrice: number; minRating: number; size: string }) => {
    setSelectedCategory(filters.category);
    setPriceRange({ min: filters.minPrice, max: filters.maxPrice });
    setMinRating(filters.minRating);
    setSelectedSize(filters.size);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setPriceRange({ min: 0, max: 1000 });
    setMinRating(0);
    setSelectedSize('');
    setSearchQuery('');
  };

  // Filtering and Sorting Logic
  const processedProducts = useMemo(() => {
    // 1. Filter
    let result = MOCK_PRODUCTS.filter((product) => {
      // Category Filter
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      // Search Filter
      const query = searchQuery.toLowerCase();
      const matchSearch = 
        product.title.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      // Price Filter
      const matchPrice = product.price >= priceRange.min && product.price <= priceRange.max;

      // Rating Filter
      const matchRating = product.rating >= minRating;

      // Size Filter
      let matchSize = true;
      if (selectedSize) {
        const isClothing = ['Swimwear', 'T-Shirts'].includes(product.category);
        matchSize = isClothing;
      }

      return matchCategory && matchSearch && matchPrice && matchRating && matchSize;
    });

    // 2. Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'featured':
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, priceRange, minRating, sortBy, selectedSize]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header 
        onSearch={setSearchQuery} 
        onFilterClick={() => setIsFilterOpen(true)}
      />
      
      <div className="md:px-0 flex flex-col md:gap-8 pt-4">
        
        {/* Desktop Hero Banner (Full Width) */}
        {!searchQuery && (
          <div className="px-6 md:px-0 mb-6 md:mb-0">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl md:rounded-xl p-6 md:p-12 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden md:min-h-[320px] flex flex-col justify-center transition-all hover:shadow-xl hover:shadow-blue-500/30">
              <div className="absolute top-0 right-0 w-32 h-32 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 md:w-64 md:h-64 bg-blue-400/20 rounded-full blur-2xl transform -translate-x-5 translate-y-5"></div>
              
              <div className="relative z-10 md:w-2/3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4 backdrop-blur-md border border-white/10">
                  <Tag size={12} className="text-yellow-300" />
                  New Season Collection
                </span>
                <h1 className="text-2xl md:text-5xl font-extrabold mb-2 tracking-tight">
                  Summer Sale <br className="hidden md:block" /> <span className="text-yellow-300">Get 30% OFF</span>
                </h1>
                <p className="text-blue-100 text-sm md:text-lg mb-6 font-medium max-w-md">
                  Upgrade your gear with professional swimwear designed for speed and comfort.
                </p>
                <button className="bg-accent text-primary font-bold px-8 py-3 rounded-full text-sm shadow-lg shadow-yellow-500/20 hover:bg-yellow-300 transition-colors w-fit">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          
          {/* Desktop Sidebar (Amazon Style) */}
          <aside className="hidden md:block w-64 sticky top-40 shrink-0 space-y-8 pl-1">
            
            {/* Department Filter */}
            <div>
              <h3 className="font-bold text-sm mb-2 text-text-main">Department</h3>
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => handleCategorySelect('All')}
                    className={clsx("text-sm hover:text-primary text-left block w-full", selectedCategory === 'All' ? "font-bold text-primary" : "text-text-main")}
                  >
                    Any Department
                  </button>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                     <button
                       onClick={() => handleCategorySelect(cat)}
                       className={clsx("text-sm hover:text-primary text-left block w-full ml-2", selectedCategory === cat ? "font-bold text-primary" : "text-text-main")}
                     >
                       {cat}
                     </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-bold text-sm mb-2 text-text-main">Avg. Customer Review</h3>
              <ul className="space-y-1">
                {[4, 3, 2, 1].map((r) => (
                  <li key={r}>
                    <button 
                      onClick={() => setMinRating(r)}
                      className="flex items-center gap-2 group w-full text-left"
                    >
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map(star => (
                           <Star 
                            key={star} 
                            size={14} 
                            className={clsx(
                              star <= r ? "fill-current" : "text-gray-200 fill-gray-200"
                            )} 
                          />
                        ))}
                      </div>
                      <span className={clsx("text-sm group-hover:text-primary", minRating === r ? "font-bold text-primary" : "text-text-main")}>& Up</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-bold text-sm mb-2 text-text-main">Price</h3>
              <ul className="space-y-1 text-sm text-text-main">
                <li><button onClick={() => setPriceRange({min: 0, max: 25})} className="hover:text-primary hover:underline text-left">Under $25</button></li>
                <li><button onClick={() => setPriceRange({min: 25, max: 50})} className="hover:text-primary hover:underline text-left">$25 to $50</button></li>
                <li><button onClick={() => setPriceRange({min: 50, max: 100})} className="hover:text-primary hover:underline text-left">$50 to $100</button></li>
                <li><button onClick={() => setPriceRange({min: 100, max: 1000})} className="hover:text-primary hover:underline text-left">$100 & Above</button></li>
              </ul>
              <div className="flex items-center gap-2 mt-2">
                 <input 
                   type="number" 
                   placeholder="$ Min" 
                   className="w-16 p-1 border rounded text-xs outline-none focus:border-primary"
                   onChange={(e) => setPriceRange(p => ({...p, min: Number(e.target.value)}))}
                 />
                 <span className="text-gray-400">-</span>
                 <input 
                   type="number" 
                   placeholder="$ Max" 
                   className="w-16 p-1 border rounded text-xs outline-none focus:border-primary"
                   value={priceRange.max === 1000 ? '' : priceRange.max}
                   onChange={(e) => setPriceRange(p => ({...p, max: Number(e.target.value)}))}
                 />
                 <button className="bg-white border border-gray-300 rounded px-2 py-1 text-xs hover:bg-gray-50">Go</button>
              </div>
            </div>
            
             {(selectedCategory !== 'All' || minRating > 0 || priceRange.max < 1000) && (
              <button 
                onClick={clearAllFilters}
                className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
              >
                <XCircle size={14} />
                Clear Filters
              </button>
             )}
          </aside>

          {/* Main Grid Area */}
          <main className="flex-1 w-full">
            {/* Mobile Category Rail */}
            <div className="md:hidden">
              <CategoryRail selected={selectedCategory as Category} onSelect={handleCategorySelect} />
            </div>

            {/* Results Bar */}
            <div className="px-6 md:px-0 mb-4 flex justify-between items-center bg-white md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none shadow-sm md:shadow-none mx-6 md:mx-0">
              <div className="flex items-center gap-2">
                 <h2 className="font-bold text-text-main">
                   {selectedCategory === 'All' ? (searchQuery ? `Results for "${searchQuery}"` : 'Featured Products') : selectedCategory}
                 </h2>
                 <span className="text-sm text-text-muted">({processedProducts.length})</span>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-text-muted hidden md:block">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-text-main outline-none cursor-pointer border-none focus:ring-0 text-right md:text-left"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="px-6 md:px-0 pb-24">
              {processedProducts.length > 0 ? (
                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                  <AnimatePresence>
                    {processedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <SearchX size={32} className="text-primary/50" />
                  </div>
                  <h3 className="font-bold text-text-main mb-1 text-lg">No products found</h3>
                  <p className="text-sm text-text-muted mb-6">Try adjusting your filters or search terms.</p>
                  <button onClick={clearAllFilters} className="text-primary font-bold text-sm hover:underline">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <FilterModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={{
          category: selectedCategory === 'All' ? 'All' : selectedCategory as Category,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          minRating: minRating,
          size: selectedSize
        }}
      />
    </div>
  );
};