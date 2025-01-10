// Safely remove HTML tags from text while preserving content
export function stripHtmlTags(html: string): string {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

// Remove verse numbers and paragraph marks from Bible verses
export function cleanVerseText(text: string): string {
  return text
    // Remove chapter introductions that end with a number and period (e.g., "The Word Became Flesh 1.")
    .replace(/^[^.]+\s\d+\.\s*/, '')
    // Remove verse numbers at the start of text
    .replace(/^\d+\s*/, '')
    // Remove verse numbers after quotes
    .replace(/^["']?\d+\s*/, '')
    // Remove verse numbers mid-text (for multi-verse quotes)
    .replace(/\s+\d+\s+/g, ' ')
    // Remove paragraph marks (¶)
    .replace(/[¶\u00B6]/g, '')
    // Ensure proper spacing between sentences
    .replace(/\.(?=\S)/g, '. ')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}
