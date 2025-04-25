import { Handlers, PageProps } from "$fresh/server.ts";
import { HeaderBar } from "../components/HeaderBar.tsx";
import { HomePageData } from "../context/homepage/types.ts";
import { Tabs } from "../islands/Tabs.tsx";
import { apiFetch, RedirectError } from "../lib/http.ts";

export const handler: Handlers<HomePageData> = {
  async GET(req, ctx) {
    try {
      const response = await apiFetch(req, { url: "/home", method: "GET" });
      const result: HomePageData = await response.json();
      return ctx.render(result);
    } catch (error) {
      console.error(error);
      if (error instanceof RedirectError) {
        return new Response(null, { status: 303, headers: error.headers });
      }
      return ctx.render();
    }
  },
};

export default function Home({ data }: PageProps<HomePageData | undefined>) {
  return (
    <div className="subtle-gradient min-h-screen">
      <HeaderBar />

      <main className="p-4 flex flex-col justify-center items-center gap-2">
        {data ? <Tabs data={data} /> : <h1>Sorry could'nt retrieve guides</h1>}
      </main>
    </div>
  );
}
