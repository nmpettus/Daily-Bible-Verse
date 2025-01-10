export interface APIError extends Error {
  status?: number;
  endpoint?: string;
}

export interface APIResponse<T> {
  data: T;
}
