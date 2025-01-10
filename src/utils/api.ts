import { getBibleVerse } from './bible-service';
import type { BibleVerse, Translation } from '../types';

export async function fetchBibleVerse(translation: Translation, reference: string): Promise<BibleVerse> {
  return getBibleVerse(translation, reference);
}
