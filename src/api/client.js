const BASE_URL = 'http://localhost:5000/api';
 
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
 
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Can't reach the server. Check your connection and try again.");
  }
 
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;
 
  if (!response.ok) {
    throw new Error(data?.message || 'Something went wrong. Please try again.');
  }
 
  return data;
}
