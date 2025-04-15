import { useHomePageData } from "../../hooks/useHomePageData.ts";
import { GuideList } from "../GuideList.tsx";

export function AllGuides() {
  const data = useHomePageData();

  const featuredCourses = (
    <div>
      <h2 className="text-xl font-bold mb-4">Featured Guides</h2>
      <GuideList guides={data.featured} />
    </div>
  );
  return (
    <div>
      {data.featured.length != 0 && featuredCourses}
    </div>
  );
}
