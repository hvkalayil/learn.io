interface FetchParams {
  url: string;
  method: "GET";
}

export async function fetchAPI<T>(params: FetchParams) {
  const token = localStorage.getItem("token") ?? "";
  const API_URL = localStorage.getItem("API_URL") ?? "";
  const headers = new Headers({
    "Authorization": `Bearer ${token}`,
  });
  const response = await fetch(API_URL + params.url, {
    method: params.method,
    headers,
  });
  return await response.json() as T;
}
