import React, { useState, useEffect } from 'react';
import { Quote, Book, AlertCircle, Tag, RefreshCw, ListFilter, ChevronUp, ChevronDown } from 'lucide-react';
import type { BibleVerse } from '../types';

interface VerseCardProps {
  verse: BibleVerse | null;
  isLoading: boolean;
  error: string | null;
  isExhausted?: boolean;
  onRefresh: () => void;
  onReset: () => void;
  onCategoryChange: () => void;
}

export function VerseCard({ 
  verse, 
  isLoading, 
  error, 
  isExhausted, 
  onRefresh, 
  onReset,
  onCategoryChange 
}: VerseCardProps) {
  const [showPrevious, setShowPrevious] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    setShowPrevious(false);
    setShowNext(false);
  }, [verse?.reference]);

  const handleRefresh = () => {
    setShowPrevious(false);
    setShowNext(false);
    onRefresh();
  };

  if (isLoading) {
    return (
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex flex-col items-center text-center gap-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <div>
            <p className="text-gray-700 font-medium mb-2">Error loading verse</p>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
          </div>
          <button
            onClick={onRefresh}
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isExhausted) {
    return (
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex flex-col items-center text-center gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Category Completed!</h3>
            <p className="text-gray-600">You've seen all verses in this category.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onReset}
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-200 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Category
            </button>
            <button
              onClick={onCategoryChange}
              className="bg-white text-indigo-600 border border-indigo-500 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2"
            >
              <ListFilter className="w-4 h-4" />
              Change Category
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!verse) {
    return null;
  }

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-2xl w-full">
      <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
        <Quote className="w-8 h-8 text-indigo-500 flex-shrink-0 mb-4 sm:mb-0" />
        <div className="flex-1">
          {verse.context?.before && (
            <div className="mb-4">
              <button
                onClick={() => setShowPrevious(!showPrevious)}
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
              >
                <ChevronUp className={`w-4 h-4 transform transition-transform duration-200 ${showPrevious ? 'rotate-180' : ''}`} />
                <span className="text-sm font-medium">Previous Verse</span>
              </button>
              {showPrevious && (
                <div className="mt-2 pl-4 border-l-2 border-gray-200">
                  <p className="text-gray-600 font-serif">{verse.context.before}</p>
                </div>
              )}
            </div>
          )}
          
          <p className="text-xl leading-relaxed text-gray-700 mb-4 font-serif">"{verse.text}"</p>
          
          {verse.context?.after && (
            <div className="mt-4">
              <button
                onClick={() => setShowNext(!showNext)}
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
              >
                <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${showNext ? 'rotate-180' : ''}`} />
                <span className="text-sm font-medium">Next Verse</span>
              </button>
              {showNext && (
                <div className="mt-2 pl-4 border-l-2 border-gray-200">
                  <p className="text-gray-600 font-serif">{verse.context.after}</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between flex-wrap gap-2 mt-6">
            <div className="flex items-center space-x-2">
              <Book className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 font-medium">{verse.reference}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-600 text-sm">{verse.category}</span>
            </div>
            <span className="text-sm text-gray-500">{verse.translation_name}</span>
          </div>
        </div>
      </div>
      <button
        onClick={handleRefresh}
        className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-200"
      >
        Get New Verse
      </button>
    </div>
  );
}
