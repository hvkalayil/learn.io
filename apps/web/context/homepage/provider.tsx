// context/CourseContext.tsx
import { createContext } from "preact";
import { JSX } from "preact/jsx-runtime";
import { HomePageData } from "./types.ts";

export const HomePageContext = createContext<HomePageData | null>(null);

export function HomePageProvider({
  data,
  children,
}: {
  data: HomePageData;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <HomePageContext.Provider value={data}>
      {children}
    </HomePageContext.Provider>
  );
}
