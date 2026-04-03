import { useEffect, useState } from "preact/hooks";
import { marked } from "https://esm.sh/marked@16.1.2";
import { fetchAPI } from "../lib/fetchHttp.ts";
import { PageList } from "../lib/models/Page.ts";

interface GuidePageIslandProps {
  guideId: string;
  pageNumber: number;
}

interface GuideData {
  content: string;
  maxPage: number;
  title: string;
}

export function GuidePageIsland({ guideId, pageNumber }: GuidePageIslandProps) {
  const [data, setData] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await fetchAPI<PageList>({
          url: `/page/guide/${guideId}/${pageNumber}`,
          method: "GET",
        });

        if (result.pages.length === 0) {
          setError("No Pages added for this guide");
          setLoading(false);
          return;
        }

        const currentPage = result.pages.at(0);
        const res = await fetch(currentPage?.mdx_url ?? "");
        if (!res.ok) {
          setError("Content not found");
          setLoading(false);
          return;
        }

        const raw = await res.text();
        const html = await marked(raw);

        setData({
          content: html,
          maxPage: result.maxPage,
          title: currentPage?.title ?? "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load guide page");
        setLoading(false);
      }
    }

    fetchData();
  }, [guideId, pageNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white">
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-xl text-red-400">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto subtle-gradient shadow-xl rounded-2xl overflow-hidden">
      <div class="flex items-center justify-between px-6 py-4 subtle-gradient-reverse">
        <a
          href={pageNumber === 1
            ? "/"
            : `/guides/${guideId}/pages/${pageNumber - 1}`}
          class="text-sm font-medium text-white"
        >
          {pageNumber === 1 && <span>← Home</span>}
          {pageNumber !== 1 && <span>← Previous</span>}
        </a>
        <h3 className="text-xl font-bold leading-tight !m-2 flex-1 text-center">
          {data.title}
        </h3>
        {pageNumber < data.maxPage
          ? (
            <a
              href={`/guides/${guideId}/pages/${pageNumber + 1}`}
              class="text-sm font-medium text-white"
            >
              <span>→ Next</span>
            </a>
          )
          : <div className="w-12"></div>}
      </div>

      <div class="prose lg:prose-lg px-6 py-8">
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </div>
  );
}
