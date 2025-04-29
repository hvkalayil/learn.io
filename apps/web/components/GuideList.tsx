import { Guide } from "../lib/models/Guide.ts";
import { GuideCard } from "./GuideCard.tsx";

export function GuideList({ guides }: { guides: Guide[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
      {guides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
    </div>
  );
}
