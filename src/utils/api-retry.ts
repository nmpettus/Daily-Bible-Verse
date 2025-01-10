import type { APIError } from './api-types';

const RETRY_DELAYS = [1000, 2000, 3000]; // Delays in milliseconds

export async function withRetry<T>(
  operation: () => Promise<T>,
  retries = RETRY_DELAYS.length
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries === 0) throw error;

    const delay = RETRY_DELAYS[RETRY_DELAYS.length - retries];
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return withRetry(operation, retries - 1);
  }
}
