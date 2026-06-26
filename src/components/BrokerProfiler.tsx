import React, { useState, useMemo } from "react";
import { BROKER_DATA, KPI_LIST, BrokerCompany, KPIDefinition } from "../data";
import { TrendingUp, TrendingDown, Users, ChevronRight, DollarSign, Activity, Briefcase, Award } from "lucide-react";

export default function BrokerProfiler() {
  const [selectedBrokerAId, setSelectedBrokerAId] = useState<string>("groww");

  const company = useMemo(() => {
    return BROKER_DATA.find((b) => b.id === selectedBrokerAId) || BROKER_DATA[0];
  }, [selectedBrokerAId]);

  // Calculate customized financial ratios
  const financialRatios = useMemo(() => {
    const kpis = company.kpis;
    const patFY25 = kpis.pat?.fy25Val;
    const patFY26 = kpis.pat?.fy26Val;
    const incomeFY25 = kpis.total_income?.fy25Val;
    const incomeFY26 = kpis.total_income?.fy26Val;
    const expenseFY25 = kpis.total_expense?.fy25Val;
    const expenseFY26 = kpis.total_expense?.fy26Val;

    let patMarginFY25 = 0;
    let patMarginFY26 = 0;
    let costIncomeFY25 = 0;
    let costIncomeFY26 = 0;

    if (patFY25 && incomeFY25) patMarginFY25 = (patFY25 / incomeFY25) * 100;
    if (patFY26 && incomeFY26) patMarginFY26 = (patFY26 / incomeFY26) * 100;

    if (expenseFY25 && incomeFY25) costIncomeFY25 = (expenseFY25 / incomeFY25) * 100;
    if (expenseFY26 && incomeFY26) costIncomeFY26 = (expenseFY26 / incomeFY26) * 100;

    return {
      patMarginFY25,
      patMarginFY26,
      costIncomeFY25,
      costIncomeFY26,
      patMarginDelta: patMarginFY26 - patMarginFY25,
      costIncomeDelta: costIncomeFY26 - costIncomeFY25,
    };
  }, [company]);

  // Group KPIs into logical sections
  const kpiCategories = [
    { name: "Financial Revenues (Inflow)", keys: ["total_income", "broking_income", "mtf_income", "distribution_income"] },
    { name: "Operational Expenses (Outflow)", keys: ["total_expense", "employee_cost", "franchisee_expense", "marketing_expense"] },
    { name: "Profitability Metrics", keys: ["pbt", "pat", "brokerage_yield"] },
    { name: "Market Volumes & Demat Shares", keys: ["turnover_cash", "turnover_derivatives", "market_share_cash", "market_share_derivatives"] },
    { name: "Margin Books & Funding", keys: ["mtf_portfolio", "t5_portfolio", "esop_portfolio", "networth", "borrowing", "cost_of_borrowing"] },
    { name: "Client Aggregation Profiles", keys: ["total_clients", "active_clients", "new_customers", "cac", "revenue_per_new", "key_business_drivers"] },
  ];

  const getYoYStr = (kpiKey: string) => {
    const kpiData = company.kpis[kpiKey];
    if (!kpiData || kpiData.fy25Val === null || kpiData.fy26Val === null || kpiData.fy25Val === 0) return null;
    const diff = ((kpiData.fy26Val - kpiData.fy25Val) / kpiData.fy25Val) * 100;
    const isGrowth = diff >= 0;
    return {
      pct: `${isGrowth ? "+" : ""}${diff.toFixed(1)}%`,
      isGrowth,
    };
  };

  return (
    <div className="space-y-8">
      {/* Brand Tabs Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {BROKER_DATA.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBrokerAId(b.id)}
            className={`px-4 py-3 rounded-xl border transition-all text-xs font-bold text-nowrap flex items-center gap-2.5 ${
              selectedBrokerAId === b.id
                ? "bg-[#0f172a] text-white border-slate-900 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${b.logoColor}`} />
            {b.name}
          </button>
        ))}
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Strategic Overview & Gauges (Unified Card Sticky to Prevent Empty Space) */}
        <div className="lg:col-span-1 lg:sticky lg:top-[160px] self-start">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden space-y-6">
            <div className="space-y-6">
              {/* Brand Background Section */}
              <div className="relative">
                <div className={`absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br ${company.logoColor} opacity-5 blur-xl`} />
                <span className="inline-block text-[10px] font-extrabold bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md mb-2 uppercase tracking-wider font-mono">
                  {company.type} model
                </span>
                <h3 className="font-display font-black text-2xl text-slate-950 mt-1">
                  {company.name}
                </h3>
                <span className="text-xs font-mono font-medium text-slate-400 mt-0.5 block">
                  {company.fullName}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100">
                  {company.background}
                </p>
              </div>

              <hr className="border-slate-100" />

              {/* Ratios Gauges Section */}
              <div className="space-y-6">
                <h4 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
                  <Activity size={16} className="text-emerald-600" />
                  Operational Efficiency Ratios
                </h4>

                {/* Gauge 1: PAT margin */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-150 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                        NPM of Total Income
                      </span>
                      <span className="font-display font-extrabold text-sm text-slate-800">
                        Net Profit Margin (PAT)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-base font-black text-emerald-600">
                        {financialRatios.patMarginFY26.toFixed(1)}%
                      </span>
                      <span className={`text-[10px] font-bold block ${
                        financialRatios.patMarginDelta >= 0 ? "text-emerald-600" : "text-rose-600"
                      }`}>
                        {financialRatios.patMarginDelta >= 0 ? "▲" : "▼"}{Math.abs(financialRatios.patMarginDelta).toFixed(1)}% YoY
                      </span>
                    </div>
                  </div>

                  {/* Progress visual bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 bg-emerald-600`}
                      style={{ width: `${Math.min(100, Math.max(0, financialRatios.patMarginFY26))}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    FY25 Margin stood at {financialRatios.patMarginFY25.toFixed(1)}%. Shows effective profit retention.
                  </p>
                </div>

                {/* Gauge 2: Cost-to-Income */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-150 space-y-4 font-sans">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                        Cost-To-Income Ratio
                      </span>
                      <span className="font-display font-extrabold text-sm text-slate-800">
                        Opex Efficiency
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-base font-black text-slate-800">
                        {financialRatios.costIncomeFY26.toFixed(1)}%
                      </span>
                      <span className={`text-[10px] font-bold block ${
                        financialRatios.costIncomeDelta <= 0 ? "text-emerald-600" : "text-rose-600"
                      }`}>
                        {financialRatios.costIncomeDelta <= 0 ? "▼ Improve" : "▲ Inflated"}
                      </span>
                    </div>
                  </div>

                  {/* Progress visual bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-slate-700 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, financialRatios.costIncomeFY26))}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    Cost to earn 1 Rupee. Perfect index of operating leverage post scale.
                  </p>
                </div>
              </div>
            </div>

            {/* Analyst Outlook (rendered inline at bottom) */}
            <div className="p-4.5 bg-emerald-50 border border-emerald-100 rounded-xl space-y-2 pt-2.5">
              <span className="text-[10px] font-extrabold text-emerald-700 block uppercase tracking-wider font-sans flex items-center gap-1">
                <Award size={10} />
                Analyst Outlook (FY26)
              </span>
              <p className="text-[11px] text-emerald-900 leading-normal font-sans">
                {company.type === "Discount" ? (
                  "High volume, low margins per transaction. High reliance on F&O volatility and MTF funding books to bolster PAT ratios against SEBI's true-to-label exchange fee adjustments."
                ) : (
                  "Insulated from retail trading velocity. Driven by recurring MF distribution SIP assets and premium HNI relationship advisory tables, maintaining highly stable, predictable profit margins."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Categorized KPI lists */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col" style={{maxHeight: '82vh'}}>
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50 shrink-0">
              <h3 className="font-display font-extrabold text-slate-900 text-base">
                Operational & Balance-Sheet Auditing
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">
                Review exhaustive parameters categorised across corporate divisions as of standard public disclosures
              </p>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
              {kpiCategories.map((cat, idx) => (
                <div key={idx} className="p-6 sm:p-8 space-y-4.5">
                  <h4 className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-widest font-sans flex items-center gap-1.5 matches-category">
                    <ChevronRight size={12} strokeWidth={3} />
                    {cat.name}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {cat.keys.map((key) => {
                      const kpiDef = KPI_LIST.find((k) => k.key === key);
                      const kpiVal = company.kpis[key];
                      if (!kpiDef || !kpiVal) return null;

                      const yoy = getYoYStr(key);

                      return (
                        <div 
                          key={key} 
                          className="p-4 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/50 rounded-xl space-y-3 transition-all group cursor-help"
                          title={`${kpiDef.label}: ${kpiDef.description}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-semibold text-xs text-slate-800 block group-hover:text-emerald-600 transition-colors">
                                {kpiDef.label}
                              </span>
                            </div>

                            {/* YoY badge */}
                            {yoy && (
                              <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                                yoy.isGrowth ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : "text-rose-600 bg-rose-50 border border-rose-100"
                              }`}>
                                {yoy.isGrowth ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
                                {yoy.pct}
                              </span>
                            )}
                          </div>

                          {/* Dual values display */}
                          <div className="flex items-center gap-5 bg-white/80 p-2.5 border border-slate-150 rounded-lg font-sans">
                            <div>
                              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">FY25</span>
                              <span className={`font-mono text-xs font-bold ${
                                (kpiVal.fy25 && typeof kpiVal.fy25 === "string" && kpiVal.fy25.includes("NSD")) ? "text-slate-400 font-sans italic" : "text-slate-800"
                              }`}>
                                {kpiVal.fy25}
                              </span>
                            </div>
                            <div className="h-6 w-px bg-slate-200" />
                            <div>
                              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">FY26</span>
                              <span className={`font-mono text-xs font-bold ${
                                (kpiVal.fy26 && typeof kpiVal.fy26 === "string" && kpiVal.fy26.includes("NSD")) ? "text-slate-400 font-sans italic" : "text-slate-900"
                              }`}>
                                {kpiVal.fy26}
                              </span>
                            </div>
                          </div>

                          {/* Footnote notes full wrap */}
                          <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                            {kpiVal.notes}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
