import { HeaderBar } from "../components/HeaderBar.tsx";
import { Tabs } from "../islands/Tabs.tsx";

export default function Home() {
  return (
    <div>
      <HeaderBar />

      <main className="p-4 flex flex-col justify-center items-center gap-2">
        <Tabs />
      </main>
    </div>
  );
}
