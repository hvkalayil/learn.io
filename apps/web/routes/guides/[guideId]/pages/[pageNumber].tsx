// deno-lint-ignore-file react-no-danger
import { Handlers, PageProps } from "$fresh/server.ts";
import { marked } from "https://esm.sh/marked@16.1.2";
import { HeaderBar } from "../../../../components/HeaderBar.tsx";
import { getAccessToken, RedirectError } from "../../../../lib/auth.ts";
import { fetchAPI } from "../../../../lib/fetchHttp.ts";
import { PageList } from "../../../../lib/models/Page.ts";

interface GuidePage {
  content: string;
  isLoggedIn: boolean;
  currentPage: number;
  maxPage: number;
  title: string;
}

export const handler: Handlers<GuidePage> = {
  async GET(req, ctx) {
    try {
      const token = await getAccessToken(req);
      ctx.state.token = token;
      const isLoggedIn = ctx.state.token !== "";
      ctx.state.isLoggedIn = isLoggedIn;

      const { guideId, pageNumber } = ctx.params;

      const page = parseInt(pageNumber);

      const result = await fetchAPI<PageList>({
        url: `/page/guide/${guideId}/${page}`,
        method: "GET",
      });
      if (result.pages.length === 0) {
        throw new Response("No Pages added for this guide", { status: 403 });
      }

      const currentPage = result.pages.at(0);

      const res = await fetch(currentPage?.mdx_url ?? "");
      if (!res.ok) {
        return new Response("Not found", { status: 404 });
      }

      const raw = await res.text();
      const html = await marked(raw);

      return ctx.render({
        content: html,
        isLoggedIn,
        currentPage: page,
        maxPage: result.maxPage,
        title: currentPage?.title ?? "",
      });
    } catch (error) {
      console.error(error);
      if (error instanceof RedirectError) {
        return new Response(null, { status: 303, headers: error.headers });
      }
      ctx.state.token = "";
      ctx.state.isLoggedIn = false;
      return new Response("Not found", { status: 404 });
    }
  },
};

export default function GuidePage({ data }: PageProps<GuidePage>) {
  return (
    <div className="subtle-gradient min-h-screen">
      <HeaderBar isLoggedIn={data.isLoggedIn} />
      <main className="min-h-screen p-6 sm:p-10 markdown-body">
        <div className="max-w-4xl mx-auto subtle-gradient shadow-xl rounded-2xl overflow-hidden">
          <div class="flex items-center justify-between px-6 py-4 subtle-gradient-reverse">
            <a
              href="/"
              class="text-sm font-medium text-white"
            >
              {data.currentPage === 1 && <span>← Home</span>}
              {data.currentPage !== 1 && data.currentPage !== data.maxPage && (
                <span>← Previous</span>
              )}
            </a>
            <h3 className="text-xl font-bold leading-tight !m-2 flex-1 text-center">
              {data.title}
            </h3>
            <a
              href="/"
              class="text-sm font-medium text-white"
            >
              {data.currentPage !== data.maxPage && <span>→ Next</span>}
            </a>
          </div>

          <div class="prose lg:prose-lg px-6 py-8">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </div>
      </main>
    </div>
  );
}
