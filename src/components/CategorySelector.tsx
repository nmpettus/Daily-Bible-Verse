import React from 'react';
import { BookOpen } from 'lucide-react';
import { getAllCategories } from '../utils/verses';

interface CategorySelectorProps {
  currentCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategorySelector({ currentCategory, onCategoryChange }: CategorySelectorProps) {
  const categories = getAllCategories();

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5 text-indigo-500" />
        <h2 className="text-lg font-medium text-gray-700">Select Category</h2>
      </div>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-3 py-2 rounded-full text-sm transition-colors duration-200 ${
            currentCategory === null
              ? 'bg-indigo-500 text-white'
              : 'bg-white text-gray-700 hover:bg-indigo-50'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-2 rounded-full text-sm transition-colors duration-200 ${
              currentCategory === category
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
