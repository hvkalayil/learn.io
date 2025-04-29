import { REFRESH_TOKEN_URL } from "../config.ts";
import { getSetCookieHeader, getTokenFromCookies } from "./cookie.ts";

export async function getAccessToken(req: Request): Promise<string> {
  const [accessToken, refreshToken] = getTokenFromCookies(req);
  if (accessToken !== "") {
    const isExpired = isTokenExpired(accessToken);
    if (!isExpired) return accessToken;
  } else {
    if (refreshToken === "") return "";
  }

  const response = await fetch(REFRESH_TOKEN_URL, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    }),
    body: JSON.stringify({ refreshToken }),
  });

  if (response.status === 200) {
    // Refresh flow
    const result: { accessToken: string; refreshToken: string } = await response
      .json();
    const currentUrl = new URL(req.url);
    const headers = getSetCookieHeader(
      currentUrl.pathname + currentUrl.search,
      result,
    );
    throw new RedirectError(headers);
  }

  // Expired tokens flow
  throw new RedirectError(
    new Headers({
      Location: "/auth/login?error=E4",
    }),
  );
}

export class RedirectError extends Error {
  constructor(public headers: Headers) {
    super("RedirectError");
  }
}

function isTokenExpired(token: string): boolean {
  const payloadBase64 = token.split(".")[1];
  const padded = payloadBase64.padEnd(
    payloadBase64.length + (4 - payloadBase64.length % 4) % 4,
    "=",
  );
  const payloadJson = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  const payload = JSON.parse(payloadJson);

  return Date.now() >= (payload.exp * 1000);
}
