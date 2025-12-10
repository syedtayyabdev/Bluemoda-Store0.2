import React from 'react';
import { Category } from '../types';
import clsx from 'clsx';

interface CategoryRailProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

const CATEGORIES: Category[] = ['All', 'Swimwear', 'Goggles', 'T-Shirts', 'Accessories'];

export const CategoryRail: React.FC<CategoryRailProps> = ({ selected, onSelect }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar pl-6 pr-2 mb-6">
      <div className="flex gap-3 w-max">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={clsx(
              "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
              selected === cat 
                ? "bg-primary text-white shadow-lg shadow-blue-500/25" 
                : "bg-white text-text-muted hover:bg-gray-50 shadow-sm"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};