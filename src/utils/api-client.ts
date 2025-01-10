import { API_CONFIG, validateApiKey } from './api-config';
import type { APIError, APIResponse } from './api-types';

export async function fetchFromAPI<T>(endpoint: string): Promise<APIResponse<T>> {
  validateApiKey();
  
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      headers: API_CONFIG.headers,
      cache: 'no-cache'
    });
    
    if (!response.ok) {
      const error: APIError = new Error(
        `API error: ${response.status} ${response.statusText}`
      );
      error.status = response.status;
      error.endpoint = endpoint;
      throw error;
    }
    
    return response.json();
  } catch (error) {
    const enhancedError: APIError = new Error(
      'Unable to connect to the Bible API. Please check your internet connection.'
    );
    enhancedError.endpoint = endpoint;
    throw enhancedError;
  }
}
