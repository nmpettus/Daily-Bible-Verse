import type { TranslationInfo } from '../types';

export const TRANSLATIONS: TranslationInfo[] = [
  { 
    id: 'KJV',
    name: 'KJV',
    fullName: 'King James Version',
    bibleId: 'de4e12af7f28f599-02'
  },
  { 
    id: 'ESV',
    name: 'ESV',
    fullName: 'English Standard Version',
    // Using the correct ESV Bible ID
    bibleId: '9879dbb7cfe39e4d-02'
  },
  { 
    id: 'NLT',
    name: 'NLT',
    fullName: 'New Living Translation',
    bibleId: '65eec8e0b60e656b-01'
  },
  {
    id: 'ASV',
    name: 'ASV',
    fullName: 'American Standard Version',
    bibleId: '06125adad2d5898a-01'
  }
];
