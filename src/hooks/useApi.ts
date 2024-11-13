import { env } from '../config/env';
import { validateKey } from '../config/security';

interface ApiOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
}

export function useApi() {
  const fetchWithAuth = async <T>({ endpoint, method = 'GET', body }: ApiOptions): Promise<T> => {
    try {
      // Validate API key against public key before making request
      const isValidKey = await validateKey(env.apiKey);
      if (!isValidKey) {
        throw new Error('Invalid API key');
      }

      const response = await fetch(`${env.apiUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.apiKey}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  };

  return { fetchWithAuth };
}