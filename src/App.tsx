import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Grid3X3, 
  BarChart3, 
  ArrowLeftRight, 
  Landmark, 
  BookOpen, 
  Sliders, 
  TrendingUp, 
  Menu, 
  X 
} from "lucide-react";
import KPIMatrix from "./components/KPIMatrix";
import BrokerProfiler from "./components/BrokerProfiler";
import HeadToHead from "./components/HeadToHead";
import KPICharts from "./components/KPICharts";

import ProjectionsModel from "./components/ProjectionsModel";
import CfoInsights from "./components/CfoInsights";

type ActiveTab = "matrix" | "profiler" | "compare" | "charts" | "projections" | "cfo";

const navItems = [
  { id: "matrix", label: "Interactive KPI Matrix", icon: Grid3X3 },
  { id: "compare", label: "Partner Benchmarking", icon: ArrowLeftRight },
  { id: "profiler", label: "Strategic Partner Profiles", icon: BookOpen },
  { id: "charts", label: "Visual Performance Analytics", icon: BarChart3 },

  { id: "cfo", label: "CFO Strategic Insights", icon: TrendingUp },
  { id: "projections", label: "Scenario Projections Model", icon: Sliders },
] as const;

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("matrix");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isFullWidth = activeTab === "matrix";
  const contentWidthClass = isFullWidth 
    ? "w-full max-w-none px-4 sm:px-6 lg:px-8" 
    : "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col lg:flex-row font-sans selection:bg-amber-600 selection:text-white">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-5 py-4 bg-[#0F172A] text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-600 rounded-lg text-white shadow-md">
            <Landmark size={18} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-white text-xs leading-tight uppercase tracking-tight flex items-center gap-1.5">
              Broking Business Intel
              <span className="inline-block px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400 font-extrabold text-[8px] uppercase tracking-wider font-mono">
                FY25-26
              </span>
            </h1>

          </div>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile Drawer (Responsive Sidebar Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-[#0F172A] border-r border-slate-800 z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-600 rounded-lg text-white shadow-md">
                    <Landmark size={18} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h1 className="font-display font-extrabold text-white text-xs leading-tight uppercase tracking-tight">
                      Broking Business Intel
                    </h1>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                        isActive
                          ? "bg-amber-600/10 text-amber-400 border border-amber-500/20 shadow-inner"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent"
                      }`}
                    >
                      <Icon size={16} className={isActive ? "text-amber-500" : "text-slate-400"} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Persistent, static) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:inset-y-0 bg-[#0F172A] border-r border-slate-800 shadow-xl">
        <div className="flex items-center gap-3.5 px-6 py-6 border-b border-slate-800/80 bg-slate-950/20">
          <div className="p-2.5 bg-amber-600 rounded-xl text-white shadow-lg shrink-0">
            <Landmark size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-white text-sm leading-tight tracking-tight uppercase flex items-center gap-1.5">
              Broking Business Intel
              <span className="inline-block px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400 font-extrabold text-[8px] uppercase tracking-wider font-mono">
                FY25-26
              </span>
            </h1>

          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-xs font-bold rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-amber-600/10 text-amber-400 border border-amber-500/20 shadow-inner"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent"
                }`}
              >
                <Icon size={16} className={isActive ? "text-amber-500" : "text-slate-400"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-1 lg:pl-80 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
        <main className="flex-1 w-full py-8 sm:py-10 bg-slate-50 min-w-0">
          <div className={contentWidthClass}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {activeTab === "matrix" && <KPIMatrix />}
                {activeTab === "compare" && <HeadToHead />}
                {activeTab === "profiler" && <BrokerProfiler />}
                {activeTab === "charts" && <KPICharts />}

                {activeTab === "cfo" && <CfoInsights />}
                {activeTab === "projections" && <ProjectionsModel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
