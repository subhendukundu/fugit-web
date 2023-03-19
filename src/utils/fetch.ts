
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: { [key: string]: any };
  };
  status: number;
}

interface ApiOptions {
  endpoint: string;
  method: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
}

export async function callApi<T>(
  options: ApiOptions,
  baseUrl: string,
): Promise<T> {
  const { endpoint, method, headers, body } = options;
  const apiUrl = `${baseUrl}${endpoint}`;

  const response = await fetch(apiUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as T;
  return data;
}
