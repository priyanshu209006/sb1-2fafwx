import { useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';
const API_KEY = import.meta.env.VITE_API_KEY || 'development_key';

interface ApiOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
}

interface ApiError {
  message: string;
  status?: number;
}

export function useApi() {
  const [error, setError] = useState<ApiError | null>(null);

  const fetchWithAuth = useCallback(async <T>({ endpoint, method = 'GET', body }: ApiOptions): Promise<T> => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: error instanceof Response ? error.status : undefined
      };
      setError(apiError);
      throw apiError;
    }
  }, []);

  return {
    fetchWithAuth,
    error,
    clearError: () => setError(null)
  };
}
