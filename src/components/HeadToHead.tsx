import React, { useState, useMemo } from "react";
import { BROKER_DATA, KPI_LIST, BrokerCompany, KPIDefinition } from "../data";
import { ArrowLeftRight, Check, AlertCircle, TrendingUp, HelpCircle } from "lucide-react";

export default function HeadToHead() {
  const [brokerAId, setBrokerAId] = useState<string>("groww");
  const [brokerBId, setBrokerBId] = useState<string>("angel_one");
  const [selectedYear, setSelectedYear] = useState<"FY25" | "FY26">("FY26");
  const [searchQuery, setSearchQuery] = useState("");

  const brokerA = useMemo(() => {
    return BROKER_DATA.find((b) => b.id === brokerAId) || BROKER_DATA[0];
  }, [brokerAId]);

  const brokerB = useMemo(() => {
    return BROKER_DATA.find((b) => b.id === brokerBId) || BROKER_DATA[1];
  }, [brokerBId]);

  // Handle alternate selections to prevent comparing the same broker
  const handleSelectBrokerA = (id: string) => {
    setBrokerAId(id);
    if (id === brokerBId) {
      const nextAvailable = BROKER_DATA.find((b) => b.id !== id);
      if (nextAvailable) setBrokerBId(nextAvailable.id);
    }
  };

  const handleSelectBrokerB = (id: string) => {
    setBrokerBId(id);
    if (id === brokerAId) {
      const nextAvailable = BROKER_DATA.find((b) => b.id !== id);
      if (nextAvailable) setBrokerAId(nextAvailable.id);
    }
  };

  // Filter KPI elements
  const filteredKPIs = useMemo(() => {
    return KPI_LIST.filter((kpi) => {
      const labelMatch = kpi.label.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = kpi.description.toLowerCase().includes(searchQuery.toLowerCase());
      return labelMatch || descMatch;
    });
  }, [searchQuery]);

  // Business Logic to find who wins/leads on a financial line item
  const getLeaderText = (kpi: KPIDefinition) => {
    const valA = selectedYear === "FY26" ? brokerA.kpis[kpi.key]?.fy26Val : brokerA.kpis[kpi.key]?.fy25Val;
    const valB = selectedYear === "FY26" ? brokerB.kpis[kpi.key]?.fy26Val : brokerB.kpis[kpi.key]?.fy25Val;

    if (valA === null || valB === null) return null;

    // Expenses/Borrowing: Lower is better
    const isExpenseType =
      kpi.key.includes("expense") ||
      kpi.key.includes("cost") ||
      kpi.key === "borrowing" ||
      kpi.key === "cac";

    if (isExpenseType) {
      if (valA < valB) return "A";
      if (valB < valA) return "B";
      return "Tie";
    }

    // Other KPI types (revenue, profits, margins, clients): Higher is better
    if (valA > valB) return "A";
    if (valB > valA) return "B";
    return "Tie";
  };

  // Custom YoY calculate
  const getYoYPercentage = (company: BrokerCompany, kpiKey: string) => {
    const data = company.kpis[kpiKey];
    if (!data || data.fy25Val === null || data.fy26Val === null || data.fy25Val === 0) return null;
    const p = ((data.fy26Val - data.fy25Val) / data.fy25Val) * 100;
    return `${p >= 0 ? "+" : ""}${p.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Selector Panels Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <ArrowLeftRight size={18} />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-[#0f172a] text-base">
                Head-to-Head Broker Comparer
              </h3>
              <p className="text-xs text-slate-500">
                Contrast two Indian brokers, side-by-side on any KPI line item
              </p>
            </div>
          </div>

          {/* Fiscal year picker */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedYear("FY26")}
              className={`text-xs font-semibold px-4.5 py-1.5 rounded-lg transition-all ${
                selectedYear === "FY26" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              FY26 Focus
            </button>
            <button
              onClick={() => setSelectedYear("FY25")}
              className={`text-xs font-semibold px-4.5 py-1.5 rounded-lg transition-all ${
                selectedYear === "FY25" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              FY25 Focus
            </button>
          </div>
        </div>

        {/* Picker Dropdowns Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          {/* Broker A Selector */}
          <div className={`p-4 rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50/10 border border-slate-200`}>
            <label className="block text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest mb-1.5 font-sans">
              Primary Broker (A)
            </label>
            <select
              value={brokerAId}
              onChange={(e) => handleSelectBrokerA(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold text-slate-800 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {BROKER_DATA.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.type})
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
              {brokerA.background}
            </p>
          </div>

          {/* Broker B Selector */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50/10 border border-slate-200">
            <label className="block text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest mb-1.5 font-sans">
              Comparative Broker (B)
            </label>
            <select
              value={brokerBId}
              onChange={(e) => handleSelectBrokerB(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold text-slate-800 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {BROKER_DATA.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.type})
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
              {brokerB.background}
            </p>
          </div>
        </div>

        {/* Search bar inside Head-to-Head */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search specific KPIs for side-by-side analysis (e.g. revenue, PAT, clients)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-sans"
          />
        </div>
      </div>

      {/* Comparison Grid Results */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 w-[240px] text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 border-r border-slate-200 z-10">
                  KPI Parameter
                </th>
                <th className="p-4 text-center border-r border-slate-200/60">
                  <div className="inline-block text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-md mb-1 uppercase tracking-wide">
                    {brokerA.type}
                  </div>
                  <div className="font-display font-extrabold text-sm text-slate-900">
                    {brokerA.name}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase font-mono mt-0.5">
                    {selectedYear} Actual
                  </span>
                </th>
                <th className="p-4 w-[110px] text-center text-xs font-bold text-slate-400 border-r border-slate-200/60">
                  Leader
                </th>
                <th className="p-4 text-center">
                  <div className="inline-block text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-md mb-1 uppercase tracking-wide">
                    {brokerB.type}
                  </div>
                  <div className="font-display font-extrabold text-sm text-slate-900">
                    {brokerB.name}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase font-mono mt-0.5">
                    {selectedYear} Actual
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredKPIs.map((kpi) => {
                const valA = (selectedYear === "FY26" ? brokerA.kpis[kpi.key]?.fy26 : brokerA.kpis[kpi.key]?.fy25) || "N/A";
                const valB = (selectedYear === "FY26" ? brokerB.kpis[kpi.key]?.fy26 : brokerB.kpis[kpi.key]?.fy25) || "N/A";
                const leader = getLeaderText(kpi);

                const yoyA = getYoYPercentage(brokerA, kpi.key);
                const yoyB = getYoYPercentage(brokerB, kpi.key);

                return (
                  <tr key={kpi.key} className="hover:bg-slate-50/50 transition-colors">
                    {/* KPI Name & Hover Tooltip info */}
                    <td className="p-4 sticky left-0 bg-white group hover:bg-slate-50 z-10 border-r border-slate-200 shadow-xs">
                      <div>
                        <span className="font-semibold text-slate-800 text-xs block leading-tight">
                          {kpi.label}
                        </span>
                        <p className="text-[9px] text-slate-400 font-medium block truncate mt-0.5 font-mono">
                          {kpi.category.toUpperCase()}
                        </p>
                      </div>
                    </td>

                    {/* Broker A Value row */}
                    <td className={`p-4 text-center border-r border-slate-100/60 ${leader === "A" ? "bg-emerald-50/30" : ""}`}>
                      <div className="flex flex-col items-center justify-center">
                        <span className={`font-mono text-xs font-bold ${
                          (typeof valA === "string" && valA.includes("NSD")) ? "text-slate-400 italic font-sans" : "text-slate-800"
                        }`}>
                          {valA}
                        </span>
                        {/* YoY Indicator */}
                        {yoyA && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] text-slate-500 font-mono font-medium mt-1">
                            <TrendingUp size={8} />
                            YoY: {yoyA}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Win/Loss Middle column */}
                    <td className="p-4 text-center border-r border-slate-100/60">
                      {leader === "A" ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          <Check size={9} strokeWidth={4} />
                          {brokerA.name}
                        </span>
                      ) : leader === "B" ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          <Check size={9} strokeWidth={4} />
                          {brokerB.name}
                        </span>
                      ) : leader === "Tie" ? (
                        <span className="inline-flex bg-slate-100 text-slate-500 font-bold text-[9px] px-2 py-0.5 rounded-full">
                          DRAW
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-slate-400 text-[10px] font-medium" title="Footnote holds context">
                          <AlertCircle size={10} />
                          Notes
                        </span>
                      )}
                    </td>

                    {/* Broker B Value row */}
                    <td className={`p-4 text-center ${leader === "B" ? "bg-emerald-50/30" : ""}`}>
                      <div className="flex flex-col items-center justify-center">
                        <span className={`font-mono text-xs font-bold ${
                          (typeof valB === "string" && valB.includes("NSD")) ? "text-slate-400 italic font-sans" : "text-slate-800"
                        }`}>
                          {valB}
                        </span>
                        {/* YoY Indicator */}
                        {yoyB && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] text-slate-500 font-mono font-medium mt-1">
                            <TrendingUp size={8} />
                            YoY: {yoyB}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
