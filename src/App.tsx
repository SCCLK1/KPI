import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Grid3X3, BarChart3, HelpCircle, ArrowLeftRight, Landmark, Mail, Clock, ShieldAlert, BookOpen, Sliders } from "lucide-react";
import KPIMatrix from "./components/KPIMatrix";
import BrokerProfiler from "./components/BrokerProfiler";
import HeadToHead from "./components/HeadToHead";
import KPICharts from "./components/KPICharts";
import DisclosureCard from "./components/DisclosureCard";
import ProjectionsModel from "./components/ProjectionsModel";

type ActiveTab = "matrix" | "profiler" | "compare" | "charts" | "disclosures" | "projections";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("matrix");

  const isFullWidth = activeTab === "matrix";
  const containerClass = isFullWidth ? "max-w-none px-6 sm:px-8 lg:px-16" : "max-w-7xl px-6 sm:px-8 lg:px-12";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Main Premium Corporate Header with Slate/Amber Polish */}
      <header className="sticky top-0 bg-[#0F172A] text-white border-b border-slate-800 z-40 shadow-lg">
        <div className={`${containerClass} mx-auto py-4`}>
          <div className="flex flex-col gap-4">
            {/* Title Identity */}
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-amber-600 rounded-xl text-white shadow-md shrink-0">
                <Landmark size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-white text-sm sm:text-base md:text-lg leading-tight tracking-tight uppercase flex items-center gap-2 flex-wrap">
                  Shriram Group — Brokerage Intelligence Suite
                  <span className="inline-block px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-amber-400 font-extrabold text-[9px] uppercase tracking-wider font-mono">
                    FY25 vs FY26
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 font-sans tracking-wide">
                  Strategic Benchmarking, Operational Audits & Projections of Distribution Partners
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-800/80 w-full" />

            {/* Navigation tabs */}
            <nav className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
              <button
                onClick={() => setActiveTab("matrix")}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all shrink-0 whitespace-nowrap ${
                  activeTab === "matrix"
                    ? "border-amber-500 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <Grid3X3 size={15} />
                Interactive KPI Matrix
              </button>
 
              <button
                onClick={() => setActiveTab("compare")}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all shrink-0 whitespace-nowrap ${
                  activeTab === "compare"
                    ? "border-amber-500 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <ArrowLeftRight size={15} />
                Partner Benchmarking
              </button>
 
              <button
                onClick={() => setActiveTab("profiler")}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all shrink-0 whitespace-nowrap ${
                  activeTab === "profiler"
                    ? "border-amber-500 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <BookOpen size={15} />
                Strategic Partner Profiles
              </button>
 
              <button
                onClick={() => setActiveTab("charts")}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all shrink-0 whitespace-nowrap ${
                  activeTab === "charts"
                    ? "border-amber-500 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <BarChart3 size={15} />
                Visual Performance Analytics
              </button>
 
              <button
                onClick={() => setActiveTab("disclosures")}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all shrink-0 whitespace-nowrap ${
                  activeTab === "disclosures"
                    ? "border-amber-500 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <HelpCircle size={15} />
                Disclosure Analytics
              </button>
 
              <button
                onClick={() => setActiveTab("projections")}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all shrink-0 whitespace-nowrap ${
                  activeTab === "projections"
                    ? "border-amber-500 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <Sliders size={15} />
                Scenario Projections Model
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Primary Presentation Workspace */}
      <main className={`flex-1 w-full mx-auto py-12 sm:py-16 ${containerClass}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {activeTab === "matrix" && (
              <KPIMatrix onSelectNsdExplanation={() => setActiveTab("disclosures")} />
            )}
            {activeTab === "compare" && <HeadToHead />}
            {activeTab === "profiler" && <BrokerProfiler />}
            {activeTab === "charts" && <KPICharts />}
            {activeTab === "disclosures" && <DisclosureCard />}
            {activeTab === "projections" && <ProjectionsModel />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
