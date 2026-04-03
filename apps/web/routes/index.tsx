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
      <HeaderBar isLoggedIn={isLoggedIn} />
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12">
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tightest mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Unlock Your Potential
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium">
            Join a community of lifelong learners and expert educators. Master
            any skill with our curated, high-quality guides.
          </p>
        </div>
        <Tabs />
      </main>
    </>
  );
}
