interface FetchParams {
  url: string;
  method: "GET";
}

export const API_URL = "http://localhost:4000/v1";

export async function fetchAPI<T>(params: FetchParams) {
  const token = localStorage.getItem("token") ?? "";
  const headers = new Headers({
    "Authorization": `Bearer ${token}`,
  });
  const response = await fetch(API_URL + params.url, {
    method: params.method,
    headers,
  });
  return await response.json() as T;
}
