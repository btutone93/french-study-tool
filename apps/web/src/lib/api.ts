// Fallback for local development
let API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Fetch runtime config in production
export async function initConfig() {
  try {
    const res = await fetch('/config.json');
    const config = await res.json();
    if (config.apiUrl) {
      API_BASE_URL = config.apiUrl;
    }
  } catch {
    console.warn('Could not load /config.json, using fallback URL');
  }
}

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			...options,
	});

	if (!response.ok) {
			throw new Error(`API Error: ${response.status} ${response.statusText}`);
	}

	return response.json();
}