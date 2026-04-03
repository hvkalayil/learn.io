import { useState } from "preact/hooks";
import { YourLearning } from "./homepage/YourLearning.tsx";
import { TeacherDashboard } from "./homepage/TeacherDasboard.tsx";
import { YourLearningIcon } from "../components/icons/YourLearningIcon.tsx";
import { TeacherDashboardIcon } from "../components/icons/TeacherDashboardIcon.tsx";
import { AllGuides } from "./homepage/AllGuides.tsx";
import { AllGuidesIcon } from "../components/icons/AllGuidesIcon.tsx";

export function Tabs() {
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
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="flex justify-center mb-12">
        <div className="glass p-1.5 rounded-[2rem] flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              aria-selected={activeTab === tab.label}
              className={`relative flex items-center gap-2 py-3 px-6 rounded-[1.8rem] transition-all duration-300 ease-out group overflow-hidden ${
                activeTab === tab.label
                  ? "text-primary shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.label)}
            >
              {activeTab === tab.label && (
                <span className="absolute inset-0 bg-white shadow-xl transition-all duration-500 ease-out -z-0" />
              )}

              <span
                className={`relative z-10 flex items-center transition-transform group-hover:scale-105 duration-300 ${
                  activeTab === tab.label ? "scale-105" : ""
                }`}
              >
                <div
                  className={`transition-colors duration-300 ${
                    activeTab === tab.label ? "text-primary" : "text-white/40"
                  }`}
                >
                  {tab.icon}
                </div>
                <span className="ml-2 font-semibold text-sm tracking-tight hidden sm:inline">
                  {tab.label}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
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
  );
}
