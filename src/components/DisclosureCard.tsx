import React, { useState } from "react";
import { MISSING_DISCLOSURES_EXPLANATIONS } from "../data";
import { BookOpen, ShieldCheck, PieChart, Landmark, TrendingUp, Info } from "lucide-react";

export default function DisclosureCard() {
  const [activeTab, setActiveTab] = useState<"nsd" | "cac" | "models" | "cfo">("nsd");

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

          <button
            onClick={() => setActiveTab("cfo")}
            className={`w-full text-left px-4 py-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
              activeTab === "cfo"
                ? "bg-amber-600 text-white shadow-md font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <TrendingUp size={16} />
            CFO Strategic Insights
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
            <div className="space-y-4 font-sans">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <TrendingUp className="text-emerald-600" size={20} />
                <h4 className="font-display font-bold text-slate-800 text-lg leading-tight">
                  {explanations.businessModels.title}
                </h4>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                <p>
                  The Indian capital market landscape is dividing into two distinct broker types: **Discount Fintech Titans** and **Traditional Advisory Houses**.
                </p>

                <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-50/20 to-slate-50 border border-emerald-100/50 rounded-2xl space-y-4">
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {explanations.businessModels.explanation}
                  </p>
                </div>

                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider pt-2">
                  Operating Model Playbook comparison
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <span className="font-extrabold text-[#0f172a] block mb-2 uppercase tracking-wider text-[10px]">
                      Discount Playbook (Groww & Angel One)
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500 leading-normal">
                      <li>Highly scalable cloud-based mobile apps</li>
                      <li>Flat subscription fee pricing (e.g. ₹20 per trade)</li>
                      <li>Driven by speculative F&O premium and margin-ledger expansion</li>
                      <li>Highly sensitive to SEBI regularisations on exchange true-to-label changes</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0f172a] block mb-1 uppercase tracking-wider text-[10px]">
                      Traditional Advisory Playbook (Anand Rathi, IIFL, Geojit)
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500 leading-normal">
                      <li>Relationship managers and localized Authorized partner networks</li>
                      <li>Variable tiered percentage pricing based on volume</li>
                      <li>Driven by cross-selling third-party portfolios (SIP, mutual funds, insurance)</li>
                      <li>Insulated from transactional retail derivative churn</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cfo" && (
            <div className="space-y-4 font-sans">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <TrendingUp className="text-emerald-600" size={20} />
                <h4 className="font-display font-bold text-slate-800 text-lg leading-tight">
                  Balance-Sheet and Operational Insights for a CFO
                </h4>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed space-y-6">
                <div className="p-5 sm:p-6 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-3">
                  <h5 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
                    <span className="font-mono text-emerald-600">01.</span> Capital Productivity: Gearing vs. Net Interest Margin (NIM)
                  </h5>
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>Zerodha</strong> operates on a debt-free model (operating with <strong>near-zero external gearing</strong> at the group level), resulting in an extremely high consolidated ROE (~31% in FY25). This requires massive cash-reserve self-funding: to power its <strong>₹7,500 Cr MTF book</strong> in FY26, Zerodha funded the entire volume on-balance-sheet using proprietary cash reserves & client collateral margins.
                  </p>
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>Motilal Oswal</strong> deploys aggressive financial leverage (<strong>1.3x gearing</strong>) to scale its margin trading ledger up to <strong>₹6,094 Cr</strong>. Higher borrowing cost adjustments (<strong>8.65%</strong> in FY26) compress core NIMs on third-party bank funded volumes, but MOFSL successfully offsets margin dilution through high-margin AMC and wealth management fees, maintaining a solid <strong>24% ROE</strong>.
                  </p>
                </div>

                <div className="p-5 sm:p-6 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-3">
                  <h5 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
                    <span className="font-mono text-emerald-600">02.</span> Cost Structure Analysis: Sourcing & Technology Investments
                  </h5>
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>Direct Digital-First Model (Zerodha)</strong> operates with nearly zero client acquisition marketing bills (CAC is effectively zero). This structural cost shelter allows Zerodha to absorb regulatory margin compression or trading volume downturns far more robustly than VC-funded counterparts.
                  </p>
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>Bank-Backed Conglom Model (HDFC Securities)</strong> enjoys the capital market's cheapest bank-channel borrowing cost (<strong>7.80%</strong>). However, HSL faces heavy operational cost structures; launching and scaling the <strong>HDFC Sky</strong> platform demanded massive front-loaded technology capex. Combined with retail volume moderations, these factors led to a <strong>17% decline in net PAT to ₹929.00 Cr in FY26</strong>.
                  </p>
                </div>

                 <div className="p-5 sm:p-6 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-3">
                  <h5 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
                    <span className="font-mono text-emerald-600">03.</span> Earnings Volatility: Statutory vs. Core Operating Performance
                  </h5>
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>Motilal Oswal</strong> highlights why CFOs look beyond statutory headline figures. Although statutory consolidated PAT slid 18% YoY to <strong>₹2,043.42 Cr</strong> in FY26 due to treasury-book mark-to-market (MTM) non-cash valuation adjustments, MOFSL's **core operating profit (ex-corporate treasury fluctuations) surged by 16% YoY to a record ₹2,360.00 Cr**, proving the deep capital-market resilience of recurring wealth-management and asset advisory branches.
                  </p>
                </div>

                <div className="p-5 sm:p-6 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-3">
                  <h5 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
                    <span className="font-mono text-emerald-600">04.</span> Strategic Shift from Transactional to Annuity Revenue
                  </h5>
                  <p className="text-xs text-slate-600 leading-normal">
                    Traditional and wealth-focused players have successfully scaled non-broking businesses to buffer cyclical hits. <strong>Anand Rathi (ARSSBL)</strong> grew its non-broking revenue (distribution & MTF interest) to <strong>44.1% of its overall topline</strong> in FY26, helping expand its PAT by <strong>24.8%</strong> despite the derivatives industry slowdown.
                  </p>
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>Geojit</strong> is executing a similar strategic pivot. Although its core transactional broking income contracted, its mutual fund equity AUM expanded to <strong>₹17,092 Cr</strong>, with monthly SIP collections reaching a record <strong>₹151 Cr</strong> by March 2026.
                  </p>
                </div>

                <div className="p-5 sm:p-6 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-3">
                  <h5 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
                    <span className="font-mono text-emerald-600">05.</span> Gearing & Gearing Limits: Impact of Leverage on NIM
                  </h5>
                  <p className="text-xs text-slate-600 leading-normal">
                    Discount brokers are facing a margin squeeze. Due to SEBI's regulatory tightening on derivatives (true-to-label and weekly expiries), <strong>Angel One</strong>'s PAT margins contracted. In response, they raised their borrowing limits to <strong>₹20,000 Cr</strong> to expand client margin lending, which carries a higher cost of debt (<strong>8.1%</strong> in FY26).
                  </p>
                  <p className="text-xs text-slate-600 leading-normal">
                    Conversely, bank-backed <strong>HDFC Securities</strong> continues to enjoy the lowest cost of funds (<strong>7.80%</strong>), allowing them to generate a healthier net interest margin (NIM) on their <strong>₹2,200 Cr</strong> client funding book, even while experiencing retail trading churn.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
