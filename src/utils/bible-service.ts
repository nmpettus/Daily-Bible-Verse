import { API_CONFIG } from './api-config';
import { fetchFromAPI } from './api-client';
import { TRANSLATIONS } from './translations';
import { formatVerseReference, getVerseCategory, parseReference } from './verses';
import { stripHtmlTags, cleanVerseText } from './text-utils';
import { API_BOOK_CODES } from './book-names';
import { verseCache } from './verse-cache';
import type { BibleVerse, Translation } from '../types';

interface VerseResponse {
  data: {
    content: string;
  };
}

async function fetchVerseContent(bibleId: string, reference: string, translation: Translation): Promise<string> {
  try {
    // Generate a translation-specific cache key
    const cacheKey = `${translation}:${reference}`;
    const cachedVerse = verseCache.get(bibleId, cacheKey);
    if (cachedVerse) {
      return cachedVerse;
    }

    const { book, chapter, verse } = parseReference(reference);
    const apiBook = API_BOOK_CODES[book];
    if (!apiBook) {
      throw new Error(`Invalid book code: ${book}`);
    }
    
    const apiReference = `${apiBook}.${chapter}.${verse}`;
    const response = await fetchFromAPI<VerseResponse>(`/bibles/${bibleId}/verses/${apiReference}`);
    const verseText = cleanVerseText(stripHtmlTags(response.data.content));
    
    // Cache with translation-specific key
    verseCache.set(bibleId, cacheKey, verseText);
    
    return verseText;
  } catch (error) {
    throw error;
  }
}

export async function getBibleVerse(translation: Translation, reference: string): Promise<BibleVerse> {
  const translationInfo = TRANSLATIONS.find(t => t.id === translation);
  
  if (!translationInfo) {
    throw new Error(`Invalid translation: ${translation}`);
  }

  try {
    const { book, chapter, verse } = parseReference(reference);
    const apiBook = API_BOOK_CODES[book];
    if (!apiBook) {
      throw new Error(`Invalid book code: ${book}`);
    }

    // Fetch main verse
    const verseText = await fetchVerseContent(translationInfo.bibleId, reference, translation);
    
    // Initialize context object
    const context: { before?: string; after?: string } = {};
    
    // Get previous verse if not first verse
    if (parseInt(verse) > 1) {
      try {
        const beforeRef = `${book}.${chapter}.${parseInt(verse) - 1}`;
        context.before = await fetchVerseContent(translationInfo.bibleId, beforeRef, translation);
      } catch (error) {
        // Silently handle context verse errors
      }
    }
    
    // Get next verse
    try {
      const afterRef = `${book}.${chapter}.${parseInt(verse) + 1}`;
      context.after = await fetchVerseContent(translationInfo.bibleId, afterRef, translation);
    } catch (error) {
      // Silently handle context verse errors
    }
    
    return {
      reference: formatVerseReference(reference),
      text: verseText,
      translation_id: translation,
      translation_name: translationInfo.fullName,
      category: getVerseCategory(reference),
      context
    };
  } catch (error) {
    const errorMessage = `Error fetching verse ${reference}: ${error instanceof Error ? error.message : 'Unknown error'}`;
    throw new Error(errorMessage);
  }
}
