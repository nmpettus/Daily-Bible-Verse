import React from 'react';
import { Book } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import type { Translation } from '../types';

interface TranslationSelectorProps {
  currentTranslation: Translation;
  onTranslationChange: (translation: Translation) => void;
}

export function TranslationSelector({ currentTranslation, onTranslationChange }: TranslationSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full max-w-2xl">
      <div className="flex items-center gap-2">
        <Book className="w-5 h-5 text-indigo-500" />
        <span className="text-gray-700 font-medium">Translation:</span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {TRANSLATIONS.map((translation) => (
          <button
            key={translation.id}
            onClick={() => onTranslationChange(translation.id)}
            className={`
              px-4 py-2 rounded-md
              transition-all duration-300 ease-out
              shadow-sm
              ${currentTranslation === translation.id
                ? 'bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-indigo-200/50 hover:ring-4 hover:ring-indigo-200'
                : 'bg-white text-gray-700 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 hover:shadow-indigo-100/50 hover:ring-4 hover:ring-indigo-50'
              }
              hover:shadow-xl hover:scale-105 hover:transform
              motion-safe:hover:animate-pulse
            `}
            title={translation.fullName}
          >
            {translation.name}
          </button>
        ))}
      </div>
    </div>
  );
}
