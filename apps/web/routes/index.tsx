import { FreshContext, PageProps } from "$fresh/server.ts";
import { HeaderBar } from "../components/HeaderBar.tsx";
import { Tabs } from "../islands/Tabs.tsx";
import { TokenPersistor } from "../islands/TokenPersistor.tsx";
import { getAccessToken, RedirectError } from "../lib/auth.ts";

export async function handler(req: Request, ctx: FreshContext) {
  try {
    const token = await getAccessToken(req);
    ctx.state.token = token;
    const isLoggedIn = ctx.state.token !== "";
    ctx.state.isLoggedIn = isLoggedIn;
    return ctx.render();
  } catch (error) {
    console.error(error);
    if (error instanceof RedirectError) {
      return new Response(null, { status: 303, headers: error.headers });
    }
    ctx.state.token = "";
    ctx.state.isLoggedIn = false;
    return ctx.render();
  }
}

export default function Home({ state }: PageProps) {
  const token: string = typeof state?.token === "string" ? state.token : "";
  const isLoggedIn: boolean = typeof state?.isLoggedIn === "boolean"
    ? state.isLoggedIn
    : false;
  return (
    <>
      <TokenPersistor token={token} />
      <div className="subtle-gradient min-h-screen">
        <HeaderBar isLoggedIn={isLoggedIn} />

        <main className="p-4 flex flex-col justify-center items-center gap-2">
          <Tabs />
        </main>
      </div>
    </>
  );
}
