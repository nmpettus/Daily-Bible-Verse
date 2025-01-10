import type { VerseInfo } from '../types';

class VerseTracker {
  private seenVerses: Map<string | null, Set<string>> = new Map();

  reset(category: string | null): void {
    if (category) {
      this.seenVerses.delete(category);
    } else {
      this.seenVerses.clear();
    }
  }

  markAsSeen(category: string | null, reference: string): void {
    if (!this.seenVerses.has(category)) {
      this.seenVerses.set(category, new Set());
    }
    this.seenVerses.get(category)!.add(reference);
  }

  getRemainingVerses(category: string | null, allVerses: VerseInfo[]): VerseInfo[] {
    if (!this.seenVerses.has(category)) {
      return allVerses;
    }
    const seenSet = this.seenVerses.get(category)!;
    return allVerses.filter(verse => !seenSet.has(verse.reference));
  }

  isExhausted(category: string | null, allVerses: VerseInfo[]): boolean {
    return this.getRemainingVerses(category, allVerses).length === 0;
  }
}

export const verseTracker = new VerseTracker();
