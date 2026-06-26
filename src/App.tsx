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
  const containerClass = isFullWidth ? "max-w-none px-4 sm:px-6 lg:px-12" : "max-w-7xl px-4 sm:px-6 lg:px-8";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Banner Warning or Sub-header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white text-xs px-4 py-2 border-b border-slate-850 z-30">
        <div className={`${containerClass} mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 font-sans`}>
          <div className="flex items-center gap-1.5 text-slate-300">
            <ShieldAlert size={13} className="text-amber-500 animate-pulse" />
            <span className="font-semibold text-white">Regulatory Transition Note:</span>
            <span>FY26 figures incorporate SEBI's 'true-to-label' flat exchange fee guidelines.</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              Ref Local: 2026-06-22 23:39 (PST)
            </span>
            <span className="hidden sm:inline">|</span>
            <span>Broker Audit Desk</span>
          </div>
        </div>
      </div>

      {/* Main Premium Corporate Header with Slate/Emerald Polish */}
      <header className="sticky top-0 bg-[#0F172A] text-white border-b border-slate-800 z-40 shadow-lg">
        <div className={`${containerClass} mx-auto`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 lg:py-0 gap-4">
            {/* Title Identity */}
            <div className="flex items-center gap-3 py-1.5">
              <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-md">
                <Landmark size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-white text-lg leading-tight tracking-tight uppercase flex items-center gap-2">
                  Indian Brokerage KPI Suite
                  <span className="inline-block px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-emerald-400 font-extrabold text-[9px] uppercase tracking-wider font-mono">
                    FY25 vs FY26
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 font-sans tracking-wide">
                  Investor Reports, IPO Prospectuses & Credit Rationales Analysed
                </p>
              </div>
            </div>

            {/* Navigation tabs */}
            <nav className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveTab("matrix")}
                className={`flex items-center gap-1.5 px-3.5 py-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
                  activeTab === "matrix"
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <Grid3X3 size={15} />
                KPI Matrix (28 parameters)
              </button>

              <button
                onClick={() => setActiveTab("compare")}
                className={`flex items-center gap-1.5 px-3.5 py-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
                  activeTab === "compare"
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <ArrowLeftRight size={15} />
                Head-to-Head
              </button>

              <button
                onClick={() => setActiveTab("profiler")}
                className={`flex items-center gap-1.5 px-3.5 py-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
                  activeTab === "profiler"
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <BookOpen size={15} />
                Broker Profiler
              </button>

              <button
                onClick={() => setActiveTab("charts")}
                className={`flex items-center gap-1.5 px-3.5 py-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
                  activeTab === "charts"
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <BarChart3 size={15} />
                KPI Charts Plots
              </button>

              <button
                onClick={() => setActiveTab("disclosures")}
                className={`flex items-center gap-1.5 px-3.5 py-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
                  activeTab === "disclosures"
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <HelpCircle size={15} />
                Missing Disclosures
              </button>

              <button
                onClick={() => setActiveTab("projections")}
                className={`flex items-center gap-1.5 px-3.5 py-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
                  activeTab === "projections"
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <Sliders size={15} />
                Projections Model
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Primary Presentation Workspace */}
      <main className={`flex-1 w-full mx-auto py-8 ${containerClass}`}>
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

      {/* Premium Analytical Corporate Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 mt-12">
        <div className={`${containerClass} mx-auto space-y-6`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 border-b border-slate-800">
            {/* Column 1 */}
            <div className="space-y-3">
              <span className="font-display font-black text-slate-200 text-sm tracking-widest block uppercase">
                Regulatory Standards
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Financial parameters categorized as actuals or designated as <strong>NSD (Not Separately Disclosed)</strong>. All accounting methodologies are compiled strictly from official capital publications, credit rating rationales, and SEBI compliance papers.
              </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <span className="font-display font-black text-slate-200 text-sm tracking-widest block uppercase">
                Model Classification
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Our suite represents two distinct branches: low-cost automated <strong>Discount Titans</strong> transacting mainly in derivatives vs. <strong>Traditional Advisory Houses</strong> focused primarily on distribution assets (AUM) and relationship HNIs.
              </p>
            </div>

            {/* Column 3 */}
            <div className="space-y-3">
              <span className="font-display font-black text-slate-200 text-sm tracking-widest block uppercase">
                Audit Registry & Desk
              </span>
              <div className="text-xs text-slate-400 space-y-2 font-mono">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-emerald-400 shrink-0" />
                  <span>Cycle Date: June 22, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-emerald-400 shrink-0" />
                  <a href="mailto:analytics@shriramcredit.in" className="hover:text-white transition-colors underline">
                    analytics@shriramcredit.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p className="font-sans">
              &copy; 2026 Indian Stockbroker Analytics & auditing Desk. Built for regulatory research.
            </p>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="text-emerald-500 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Durable client-state online
              </span>
              <span>SEBI Class II Broker Audit Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
