import { Handlers, PageProps } from "$fresh/server.ts";
import { HeaderBar } from "../../../../components/HeaderBar.tsx";
import { GuidePageIsland } from "../../../../islands/GuidePageIsland.tsx";
import { TokenPersistor } from "../../../../islands/TokenPersistor.tsx";
import { getAccessToken, RedirectError } from "../../../../lib/auth.ts";

interface GuidePageData {
  isLoggedIn: boolean;
  token: string;
  guideId: string;
  pageNumber: number;
}

export const handler: Handlers<GuidePageData> = {
  async GET(req, ctx) {
    try {
      const token = await getAccessToken(req);
      const isLoggedIn = token !== "";

      const { guideId, pageNumber } = ctx.params;
      const page = parseInt(pageNumber);

      return ctx.render({
        isLoggedIn,
        token,
        guideId,
        pageNumber: page,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof RedirectError) {
        return new Response(null, { status: 303, headers: error.headers });
      }
      return new Response("Not found", { status: 404 });
    }
  },
};

export default function GuidePage({ data }: PageProps<GuidePageData>) {
  return (
    <div className="subtle-gradient min-h-screen">
      <TokenPersistor token={data.token} />
      <HeaderBar isLoggedIn={data.isLoggedIn} />
      <main className="min-h-screen p-6 sm:p-10 markdown-body">
        <GuidePageIsland
          guideId={data.guideId}
          pageNumber={data.pageNumber}
        />
      </main>
    </div>
  );
}
