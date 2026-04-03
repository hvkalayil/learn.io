import { useEffect, useState } from "preact/hooks";
import { GuideList } from "../../components/GuideList.tsx";
import { fetchAPI } from "../../lib/fetchHttp.ts";
import { HomePageGuides } from "../../lib/models/Guide.ts";
import { GuideCardSkeleton } from "../../components/GuideCardSkeleton.tsx";

export function AllGuides() {
  const [data, setData] = useState<HomePageGuides>({ featured: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const result = await fetchAPI<HomePageGuides>({
          url: "/home",
          method: "GET",
        });
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(
          "Unable to load featured guides. Please check your connection.",
        );
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  return (
    <div className="space-y-8">
      {error && (
        <div className="glass p-8 rounded-3xl text-center border-rose-500/20">
          <p className="text-rose-400 font-medium">{error}</p>
        </div>
      )}
      {!error && (
        <div>
          <div className="flex items-end gap-3 mb-10">
            <h2 className="text-3xl font-bold tracking-tight">
              Handpicked{" "}
              <span className="text-accent underline decoration-accent/20 underline-offset-8">
                Guides
              </span>
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-accent/20 to-transparent mb-3" />
          </div>
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => <GuideCardSkeleton key={i} />)}
            </div>
          )}
          {data.featured.length != 0 && <GuideList guides={data.featured} />}
        </div>
      )}
    </div>
  );
}
