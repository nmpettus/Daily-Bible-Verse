export const API_CONFIG = {
  baseUrl: 'https://api.scripture.api.bible/v1',
  headers: {
    'api-key': import.meta.env.VITE_BIBLE_API_KEY || '',
    'accept': 'application/json'
  }
};

export function validateApiKey(): void {
  if (!import.meta.env.VITE_BIBLE_API_KEY) {
    throw new Error(
      'Bible API key is not configured. Please add your API key to the .env file:\n' +
      'VITE_BIBLE_API_KEY=your-api-key-here'
    );
  }
}
