import React, { useEffect, useState } from 'react';
import { VerseCard } from './components/VerseCard';
import { TranslationSelector } from './components/TranslationSelector';
import { CategorySelector } from './components/CategorySelector';
import { fetchBibleVerse } from './utils/api';
import { getRandomVerseFromCategory, resetVerseTracking } from './utils/verses';
import type { BibleVerse, Translation } from './types';

export default function App() {
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExhausted, setIsExhausted] = useState(false);
  const [translation, setTranslation] = useState<Translation>('KJV');
  const [category, setCategory] = useState<string | null>(null);
  const [currentReference, setCurrentReference] = useState<string>(getRandomVerseFromCategory(null));

  const getVerse = async (reference: string) => {
    setIsLoading(true);
    setError(null);
    setIsExhausted(false);
    try {
      const data = await fetchBibleVerse(translation, reference);
      setVerse(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(message);
      setVerse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewVerse = () => {
    try {
      const newReference = getRandomVerseFromCategory(category);
      setCurrentReference(newReference);
      getVerse(newReference);
    } catch (error) {
      if (error instanceof Error && error.message.includes('No more verses available')) {
        setIsExhausted(true);
        setError(null);
      } else {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    }
  };

  const handleCategoryChange = (newCategory: string | null) => {
    setCategory(newCategory);
    setIsExhausted(false);
    resetVerseTracking(newCategory);
    try {
      const newReference = getRandomVerseFromCategory(newCategory);
      setCurrentReference(newReference);
      getVerse(newReference);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleReset = () => {
    resetVerseTracking(category);
    setIsExhausted(false);
    handleNewVerse();
  };

  useEffect(() => {
    if (currentReference) {
      getVerse(currentReference);
    }
  }, [translation, currentReference]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-indigo-900 mb-8">Daily Bible Verse</h1>
      
      <TranslationSelector
        currentTranslation={translation}
        onTranslationChange={setTranslation}
      />
      
      <VerseCard
        verse={verse}
        isLoading={isLoading}
        error={error}
        isExhausted={isExhausted}
        onRefresh={handleNewVerse}
        onReset={handleReset}
        onCategoryChange={() => handleCategoryChange(null)}
      />
      
      <div className="mt-8 w-full max-w-2xl">
        <CategorySelector
          currentCategory={category}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        Refresh for a new verse of inspiration
      </p>
    </div>
  );
}
