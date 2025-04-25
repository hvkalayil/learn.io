import { API_URL, REFRESH_TOKEN_URL } from "../config.ts";
import { getSetCookieHeader, getTokenFromCookies } from "./cookie.ts";

interface ReqParams {
  url: string;
  method: "GET" | "POST";
  body?: object;
}

export async function apiFetch<T>(
  req: Request,
  reqParams: ReqParams,
): Promise<Response> {
  const [accessToken, refreshToken] = getTokenFromCookies(req);
  const response = await sendRequest(accessToken, reqParams);

  if (!response.ok) {
    if (response.status === 401) {
      console.log("Token Expired");

      const refreshResponse = await sendRequest(accessToken, {
        method: "POST",
        url: REFRESH_TOKEN_URL,
        body: { refreshToken },
      });
      if (refreshResponse.status !== 200) {
        throw new RedirectError(
          new Headers({
            Location: "/auth/login?error=E4",
          }),
        );
      }

      const result: { accessToken: string; refreshToken: string } =
        await refreshResponse.json();
      console.log("Tokens recieved");

      const currentUrl = new URL(req.url);
      const headers = getSetCookieHeader(
        currentUrl.pathname + currentUrl.search,
        result,
      );
      throw new RedirectError(headers);
    } else {
      throw new Error(response?.statusText ?? "API Failed");
    }
  }
  return response;
}

async function sendRequest(
  accessToken: string,
  reqParams: ReqParams,
) {
  const requestHeader = new Headers({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
  });
  const options: RequestInit = {
    method: reqParams.method,
    headers: requestHeader,
    body: reqParams.body ? JSON.stringify(reqParams.body) : undefined,
  };

  return await fetch(API_URL + reqParams.url, options);
}

export class RedirectError extends Error {
  constructor(public headers: Headers) {
    super("RedirectError");
  }
}
