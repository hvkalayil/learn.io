export const getSetCookieHeader = (
  url: string,
  tokens: { accessToken: string; refreshToken: string },
) => {
  const header = new Headers({
    Location: url,
  });
  header.set(
    "Set-Cookie",
    `accessToken=${tokens.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`,
  );
  header.append(
    "Set-Cookie",
    `refreshToken=${tokens.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`,
  );
  return header;
};

export const getTokenFromCookies = (req: Request) => {
  const cookieHeader = req.headers.get("cookie") || "";
  if (cookieHeader === "") return ["", ""];
  const cookies: { accessToken: string; refreshToken: string } = Object
    .fromEntries(
      cookieHeader.split("; ").map((cookie) => cookie.split("=")),
    );

  return [cookies["accessToken"] ?? "", cookies["refreshToken"] ?? ""];
};
