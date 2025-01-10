export interface BibleVerse {
  reference: string;
  text: string;
  translation_id: Translation;
  translation_name: string;
  category?: string;
  context?: {
    before?: string;
    after?: string;
  };
}

export type Translation = 'KJV' | 'ESV' | 'NLT' | 'ASV';

export interface TranslationInfo {
  id: Translation;
  name: string;
  fullName: string;
  bibleId: string;
}

export interface VerseInfo {
  reference: string;
  category: string;
}
