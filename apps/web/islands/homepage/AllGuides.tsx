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
        setError("Unable to data. Please try again.");
      }
    };
    fetchGuides();
  }, []);

  return (
    <>
      {error && <p className="text-center">{error}</p>}
      {!error && (
        <div>
          <h2 className="text-xl font-bold mb-4">Featured Guides</h2>
          {loading && <GuideCardSkeleton />}
          {data.featured.length != 0 && <GuideList guides={data.featured} />}
        </div>
      )}
    </>
  );
}
