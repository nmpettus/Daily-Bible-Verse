interface CacheEntry {
  content: string;
  timestamp: number;
}

interface VerseCache {
  [key: string]: CacheEntry;
}

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache duration

class VerseCacheManager {
  private cache: VerseCache = {};

  getKey(bibleId: string, reference: string): string {
    return `${bibleId}:${reference}`;
  }

  get(bibleId: string, reference: string): string | null {
    const key = this.getKey(bibleId, reference);
    const entry = this.cache[key];
    
    if (!entry) return null;
    
    // Check if cache entry has expired
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      delete this.cache[key];
      return null;
    }
    
    return entry.content;
  }

  set(bibleId: string, reference: string, content: string): void {
    const key = this.getKey(bibleId, reference);
    this.cache[key] = {
      content,
      timestamp: Date.now()
    };
  }

  clear(): void {
    this.cache = {};
  }
}

export const verseCache = new VerseCacheManager();
