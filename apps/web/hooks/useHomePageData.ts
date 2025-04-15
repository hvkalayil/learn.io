// hooks/useCourseData.ts
import { useContext } from "preact/hooks";
import { HomePageData } from "../context/homepage/types.ts";
import { HomePageContext } from "../context/homepage/provider.tsx";

export function useHomePageData(): HomePageData {
  const context = useContext(HomePageContext);

  if (context === null) {
    throw new Error("useHomePageData must be used within a HomePageProvider");
  }

  return context;
}
