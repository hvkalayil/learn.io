import { Handlers, PageProps } from "$fresh/server.ts";
import { HeaderBar } from "../components/HeaderBar.tsx";
import { HomePageData } from "../context/homepage/types.ts";
import { Tabs } from "../islands/Tabs.tsx";
import { apiFetch } from "../lib/http.ts";

export const handler: Handlers<HomePageData> = {
  async GET(_, ctx) {
    const result = await apiFetch<HomePageData>("/home", "GET");
    return ctx.render(result);
  },
};

export default function Home({ data }: PageProps<HomePageData>) {
  return (
    <div>
      <HeaderBar />

      <main className="p-4 flex flex-col justify-center items-center gap-2">
        <Tabs data={data} />
      </main>
    </div>
  );
}
