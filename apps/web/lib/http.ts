import { API_URL } from "../config.ts";

export async function apiFetch<T>(
  url: string,
  method: "GET",
  body?: object,
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(API_URL + url, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}
