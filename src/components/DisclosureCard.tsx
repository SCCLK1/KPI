import React, { useState } from "react";
import { MISSING_DISCLOSURES_EXPLANATIONS } from "../data";
import { BookOpen, ShieldCheck, PieChart, Landmark, TrendingUp, Info } from "lucide-react";

export default function DisclosureCard() {
  const [activeTab, setActiveTab] = useState<"nsd" | "cac" | "models">("nsd");

  const explanations = MISSING_DISCLOSURES_EXPLANATIONS;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Welcome Title */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg text-amber-400">
            <BookOpen size={18} />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-[#ffffff] text-base">
              Regulatory Disclosure & Market Intelligence Portal
            </h3>
            <p className="text-xs text-amber-400/90">
              Structural analysis of disclosures, CAC variances, and business models in Indian Capital Markets
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 p-5 space-y-3 shrink-0">
          <button
            onClick={() => setActiveTab("nsd")}
            className={`w-full text-left px-4 py-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
              activeTab === "nsd"
                ? "bg-amber-600 text-white shadow-md font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <ShieldCheck size={16} />
            NSD Accounting Standards
          </button>

          <button
            onClick={() => setActiveTab("cac")}
            className={`w-full text-left px-4 py-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
              activeTab === "cac"
                ? "bg-amber-600 text-white shadow-md font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <PieChart size={16} />
            CAC & Revenue Analytics
          </button>

          <button
            onClick={() => setActiveTab("models")}
            className={`w-full text-left px-4 py-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
              activeTab === "models"
                ? "bg-amber-600 text-white shadow-md font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Landmark size={16} />
            Brokerage Business Models
          </button>
        </div>

        {/* Detailed Explanation View Area */}
        <div className="flex-1 p-8 sm:p-10 space-y-8">
          {activeTab === "nsd" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Landmark className="text-emerald-600" size={20} />
                <h4 className="font-display font-bold text-slate-800 text-lg leading-tight">
                  {explanations.whyT5ESOP_NSD.title}
                </h4>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                <p>
                  In Indian financial filings, most non-banking financial wings or parent entities (like 360 ONE or IIFL Wealth) split specialized margin books directly. However, standard brokerage firms are regulated under a single <strong>Client Margin Ledger</strong> standard by SEBI.
                </p>

                <div className="bg-amber-50/50 border border-amber-200/50 p-5 rounded-2xl text-amber-900 text-xs flex items-start gap-3">
                  <Info className="text-amber-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-bold uppercase tracking-wider block text-[10px] text-amber-800 mb-1">
                      Regulatory Accounting Standard
                    </span>
                    <p className="leading-normal">
                      Most standalone broker entities pool <strong>T+5 short-term margin funding</strong> and <strong>ESOP loan against securities (LAS)</strong> inside their general <strong>Margin Trading Facility (MTF) receivables book</strong>. This combines reporting parameters and explains why separate line items for these are designated as <strong>NSD (Not Separately Disclosed)</strong>.
                    </p>
                  </div>
                </div>

                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider pt-2">
                  Structural Consolidation Impact
                </h5>
                <ul className="list-disc pl-5 space-y-2 text-xs leading-normal">
                  <li>
                    <strong>Simplified Leverage Framework</strong>: Broadening client receivables under one book prevents brokers from reporting dozens of micro-portfolios, simplifying leverage tracking (Debt-to-Equity ratios) for rating agencies.
                  </li>
                  <li>
                    <strong>Collateral Security Pooling</strong>: Collaterals (dematerialized shares) are locked in a pooled margin pledge arrangement rather than designated micro-accounts.
                  </li>
                  <li>
                    <strong>Unified Bank Liquidity</strong>: Funding is sourced from commercial bank overdrafts (OD) and commercial paper (CP) which are issued against the *combined* MTF client book.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "cac" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <PieChart className="text-emerald-600" size={20} />
                <h4 className="font-display font-bold text-slate-800 text-lg leading-tight">
                  {explanations.cacVariance.title}
                </h4>
              </div>

              <div className="space-y-5 text-sm text-slate-600 leading-relaxed">
                <p>
                  Client acquisition patterns vary widely based on the core operating mechanism of the broker—resulting in a sharp contrast in how Customer Acquisition Cost (CAC) is reported, categorized, or disclosed.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {explanations.cacVariance.explanation.map((item, id) => (
                    <div key={id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col gap-3">
                      <span className="inline-flex max-w-fit items-center gap-1.5 px-2 bg-emerald-50 border border-emerald-100 rounded text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
                        {item.type.includes("Discount") ? "Digital Platform Model" : "Relationship Partner Model"}
                      </span>
                      <h5 className="font-display font-bold text-slate-900 text-sm">
                        {item.type}
                      </h5>
                      <p className="text-xs text-slate-600 leading-normal">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                    Why "Revenue per Customer" is NSD or highly variable
                  </h5>
                  <p className="text-xs text-slate-500 leading-normal">
                    Discount brokers see massive transactional spikes centered entirely on high-frequency F&O option trading volume curves. Traditional wealth houses focus on total **AUM size**, earning consistent recurring distribution commission fees (often 0.5% - 1.2% per year on asset valuations) which smooths out market volatility. Due to these differing models, a standardized industry-wide cash-yield calculation is avoided.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "models" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <BookOpen className="text-emerald-600" size={20} />
                <h4 className="font-display font-bold text-slate-800 text-lg leading-tight">
                  Comparing Digital vs. Advisory Execution Models
                </h4>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed space-y-6">
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <h5 className="font-display font-bold text-slate-900 text-sm">
                    Discount Execution Portals (Zerodha, Groww, Angel One)
                  </h5>
                  <div className="text-xs text-slate-650 leading-relaxed space-y-2">
                    <p>
                      Discount brokerages utilize direct-to-consumer digital channels (web/app UIs) to onboarding self-directed traders.
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Highly standardized ₹20 flat pricing models</li>
                      <li>Almost entirely digital client onboarding (Demat e-sign)</li>
                      <li>Extremely exposed to regulatory changes on retail option limits</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <h5 className="font-display font-bold text-slate-900 text-sm">
                    Traditional Franchisee & Wealth Houses (Motilal Oswal, Anand Rathi, Geojit)
                  </h5>
                  <div className="text-xs text-slate-650 leading-relaxed space-y-2">
                    <p>
                      Advisory-focused firms operate via Authorised Persons (franchisees), institutional research tables, and dedicated wealth advisers.
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Variable tiered percentage pricing based on volume</li>
                      <li>Driven by cross-selling third-party portfolios (SIP, mutual funds, insurance)</li>
                      <li>Insulated from transactional retail derivative churn</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
