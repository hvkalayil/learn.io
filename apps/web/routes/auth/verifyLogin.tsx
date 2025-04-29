import { Handlers } from "$fresh/server.ts";
import { LOGIN_URL } from "../../config.ts";
import { getSetCookieHeader } from "../../lib/cookie.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const form = await req.formData();
      const email = form.get("email")?.toString() ?? "";
      const password = form.get("password")?.toString() ?? "";

      if (!email || !password) {
        return Response.redirect("/auth/login?error=E1", 303);
      }

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status !== 200) {
        return Response.redirect("/auth/login?error=E2", 303);
      }

      const result: { accessToken: string; refreshToken: string } =
        await response.json();

      const redirectHeader = getSetCookieHeader("/", result);
      return new Response(null, {
        status: 303,
        headers: redirectHeader,
      });
    } catch (error) {
      console.log(error);
      return new Response(null, {
        status: 303,
        headers: new Headers({
          Location: "/auth/login?error=E3",
        }),
      });
    }
  },
};
