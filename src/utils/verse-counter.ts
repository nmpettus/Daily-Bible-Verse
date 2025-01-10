import { VERSES_WITH_CATEGORIES } from './verse-data';

export function getVerseStats() {
  const totalVerses = VERSES_WITH_CATEGORIES.length;
  const categoryCounts = VERSES_WITH_CATEGORIES.reduce((acc, verse) => {
    acc[verse.category] = (acc[verse.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: totalVerses,
    byCategory: categoryCounts
  };
}
