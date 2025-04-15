import { useState } from "preact/hooks";
import { YourLearning } from "../components/homepage/YourLearning.tsx";
import { TeacherDashboard } from "../components/homepage/TeacherDasboard.tsx";
import { YourLearningIcon } from "../components/icons/YourLearningIcon.tsx";
import { TeacherDashboardIcon } from "../components/icons/TeacherDashboardIcon.tsx";
import { AllGuides } from "../components/homepage/AllGuides.tsx";
import { AllGuidesIcon } from "../components/icons/AllGuidesIcon.tsx";
import { HomePageProvider } from "../context/homepage/provider.tsx";
import { HomePageData } from "../context/homepage/types.ts";

export function Tabs({ data }: { data: HomePageData }) {
  const [activeTab, setActiveTab] = useState("All Guides");

  const tabs = [
    {
      label: "All Guides",
      icon: <AllGuidesIcon />,
    },
    {
      label: "Your Learning",
      icon: <YourLearningIcon />,
    },
    {
      label: "Teacher Dashboard",
      icon: <TeacherDashboardIcon />,
    },
  ];

  return (
    <HomePageProvider data={data}>
      <div className="w-full p-6">
        <div className="flex mb-8 relative">
          <div className="absolute h-12 w-full subtle-gradient rounded-full" />

          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              aria-selected={activeTab === tab.label}
              className={`relative z-10 flex-1 flex items-center justify-center py-3 px-4 transition-all duration-300 ease-out ${
                activeTab === tab.label
                  ? "font-medium"
                  : "text-gray-100 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab(tab.label)}
            >
              {activeTab === tab.label && (
                <span className="absolute inset-0 subtle-gradient-reverse rounded-full shadow-md transition-all duration-300 ease-out" />
              )}

              <span className="relative flex items-center">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Content Area with Animation */}
        <div className="p-6 min-h-64">
          {activeTab === "All Guides" && (
            <div className="animate-fadeIn">
              <AllGuides />
            </div>
          )}
          {activeTab === "Your Learning" && (
            <div className="animate-fadeIn">
              <YourLearning />
            </div>
          )}
          {activeTab === "Teacher Dashboard" && (
            <div className="animate-fadeIn">
              <TeacherDashboard />
            </div>
          )}
        </div>
      </div>
    </HomePageProvider>
  );
}
