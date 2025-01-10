import { VERSES_WITH_CATEGORIES } from './verse-data';
import { BOOK_NAMES } from './book-names';
import { verseTracker } from './verse-tracker';

export function getAllCategories(): string[] {
  return Array.from(new Set(VERSES_WITH_CATEGORIES.map(verse => verse.category))).sort();
}

export function getRandomVerseFromCategory(category: string | null): string {
  // Filter verses based on category
  const availableVerses = category
    ? VERSES_WITH_CATEGORIES.filter(verse => verse.category === category)
    : VERSES_WITH_CATEGORIES;

  if (availableVerses.length === 0) {
    throw new Error(`No verses available in ${category || 'any'} category`);
  }

  // Get remaining verses that haven't been seen
  const remainingVerses = verseTracker.getRemainingVerses(category, availableVerses);
  
  if (remainingVerses.length === 0) {
    // Reset tracking for this category when all verses have been seen
    verseTracker.reset(category);
    const verse = availableVerses[Math.floor(Math.random() * availableVerses.length)];
    verseTracker.markAsSeen(category, verse.reference);
    return verse.reference;
  }
  
  // Get a random verse from remaining verses
  const verse = remainingVerses[Math.floor(Math.random() * remainingVerses.length)];
  verseTracker.markAsSeen(category, verse.reference);
  return verse.reference;
}

export function formatVerseReference(apiReference: string): string {
  const [book, chapter, verse] = apiReference.split('.');
  const bookName = BOOK_NAMES[book] || book;
  return `${bookName} ${chapter}:${verse}`;
}

export function parseReference(reference: string): { book: string; chapter: string; verse: string } {
  const [book, chapter, verse] = reference.split('.');
  return { book, chapter, verse };
}

export function getVerseCategory(reference: string): string {
  const verse = VERSES_WITH_CATEGORIES.find(v => v.reference === reference);
  return verse?.category || 'Uncategorized';
}

export function resetVerseTracking(category: string | null): void {
  verseTracker.reset(category);
}
