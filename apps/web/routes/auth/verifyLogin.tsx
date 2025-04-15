import { Handlers } from "$fresh/server.ts";
import { apiFetch } from "../../lib/http.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const form = await req.formData();
      const email = form.get("email")?.toString() ?? "";
      const password = form.get("password")?.toString() ?? "";

      if (!email || !password) {
        return Response.redirect("/auth/login?error=E1", 303);
      }

      const result = await apiFetch<{
        status: string;
      }>("/auth/login", "POST", {
        email,
        password,
      });

      if (result.status !== "OK") {
        return Response.redirect("/auth/login?error=E2", 303);
      }

      return new Response(null, {
        status: 303,
        headers: new Headers({
          Location: "/",
        }),
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
