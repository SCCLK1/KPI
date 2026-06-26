import React, { useState, useMemo } from "react";
import { Search, Info, HelpCircle, ArrowUpRight, ArrowDownRight, RefreshCw, X, Download, Filter } from "lucide-react";
import { BROKER_DATA, KPI_LIST, BrokerCompany, KPIDefinition, KPIValue } from "../data";

export default function KPIMatrix() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [yearView, setYearView] = useState<"FY26" | "FY25" | "Both">("Both");
  const [selectedCell, setSelectedCell] = useState<{
    company: BrokerCompany;
    kpi: KPIDefinition;
    value: KPIValue;
  } | null>(null);

  const [selectedBrokers, setSelectedBrokers] = useState<string[]>(
    BROKER_DATA.map((b) => b.id)
  );

  const filteredBrokers = useMemo(() => {
    return BROKER_DATA.filter((b) => selectedBrokers.includes(b.id));
  }, [selectedBrokers]);

  const tableMinWidth = useMemo(() => {
    const baseWidth = 240; // KPI Parameter column
    const colWidth = yearView === "Both" ? 240 : 160;
    return baseWidth + filteredBrokers.length * colWidth;
  }, [filteredBrokers.length, yearView]);

  // Filter Categories
  const categories = ["All", "Income", "Expenses", "Profitability", "Market Metrics", "Balance Sheet & Debt", "Client Metrics"];

  // Filtered KPIs based on Search and Category
  const filteredKPIs = useMemo(() => {
    return KPI_LIST.filter((kpi) => {
      const matchesCategory = selectedCategory === "All" || kpi.category === selectedCategory;
      const matchesSearch =
        kpi.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kpi.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  // Helper to render value badges with subtle colors
  const renderValueCell = (company: BrokerCompany, kpi: KPIDefinition, isF26: boolean) => {
    const kpiData = company.kpis[kpi.key];
    if (!kpiData) return <span className="text-slate-400 text-xs font-mono">N/A</span>;

    const valueStr = isF26 ? kpiData.fy26 : kpiData.fy25;
    const isNSD = typeof valueStr === "string" && valueStr.includes("NSD");
    const isNil = typeof valueStr === "string" && valueStr.toLowerCase() === "nil";

    if (isNSD) {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCell({ company, kpi, value: kpiData });
          }}
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-200 transition-colors cursor-help font-sans uppercase tracking-wider whitespace-nowrap"
          title="Not Separately Disclosed (NSD) in public financial reports"
        >
          Not Disclosed
          <HelpCircle size={8} className="text-slate-400" />
        </button>
      );
    }

    if (isNil) {
      return (
        <span className="inline-flex px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-50 text-slate-400 border border-slate-100 font-mono">
          NIL
        </span>
      );
    }

    // Standard Value
    return (
      <span className="font-mono text-xs font-semibold text-slate-800">
        {valueStr}
      </span>
    );
  };

  // Helper to compute YoY Trend if numeric values are available
  const getYoYDisplay = (company: BrokerCompany, kpi: KPIDefinition) => {
    const kpiData = company.kpis[kpi.key];
    if (!kpiData || kpiData.fy25Val === null || kpiData.fy26Val === null) return null;
    
    const { fy25Val, fy26Val } = kpiData;
    if (fy25Val === 0) return null;
    
    const pct = ((fy26Val - fy25Val) / fy25Val) * 100;
    const isGrowth = pct >= 0;
    
    // Format sign
    const sign = isGrowth ? "+" : "";
    const colorClass = isGrowth ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-rose-600 bg-rose-50 border-rose-100";
    
    return (
      <span className={`inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[10px] font-bold border ${colorClass} font-mono mt-0.5`}>
        {isGrowth ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
        {sign}{pct.toFixed(1)}%
      </span>
    );
  };

  const downloadMatrixAsCSV = () => {
    let csv = "KPI Parameter,Category";
    filteredBrokers.forEach((b) => {
      csv += `,"${b.name} FY25","${b.name} FY26"`;
    });
    csv += "\n";

    KPI_LIST.forEach((kpi) => {
      let row = `"${kpi.label.replace(/"/g, '""')}","${kpi.category}"`;
      filteredBrokers.forEach((b) => {
        const kpiVal = b.kpis[kpi.key];
        const fy25 = kpiVal ? (kpiVal.fy25 === "NSD" ? "Not Disclosed" : kpiVal.fy25) : "";
        const fy26 = kpiVal ? (kpiVal.fy26 === "NSD" ? "Not Disclosed" : kpiVal.fy26) : "";
        row += `,"${fy25.replace(/"/g, '""')}","${fy26.replace(/"/g, '""')}"`;
      });
      csv += row + "\n";
    });

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "brokerage_financials_matrix.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Search and Controls Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search all 28 KPIs (e.g. Broking, MTF, PAT, Clients)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-sans"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")} 
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-sans"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Year View Picker */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setYearView("Both")}
                className={`flex-1 md:flex-none text-xs font-medium px-4 py-2 rounded-lg transition-all ${
                  yearView === "Both"
                    ? "bg-white text-slate-900 shadow-xs ring-1 ring-slate-200"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                YoY Side-by-Side
              </button>
              <button
                onClick={() => setYearView("FY26")}
                className={`flex-1 md:flex-none text-xs font-medium px-4 py-2 rounded-lg transition-all ${
                  yearView === "FY26"
                    ? "bg-white text-slate-900 shadow-xs ring-1 ring-slate-200"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                FY26 Actuals
              </button>
              <button
                onClick={() => setYearView("FY25")}
                className={`flex-1 md:flex-none text-xs font-medium px-4 py-2 rounded-lg transition-all ${
                  yearView === "FY25"
                    ? "bg-white text-slate-900 shadow-xs ring-1 ring-slate-200"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                FY25 Actuals
              </button>
            </div>

            {/* Excel Download Button */}
            <button
              onClick={downloadMatrixAsCSV}
              className="flex items-center justify-center gap-1.5 px-4.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all w-full sm:w-auto cursor-pointer"
            >
              <Download size={14} />
              Download Excel/CSV
            </button>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-amber-600 text-white border-amber-600 font-semibold shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {cat === "All" ? "All Parameters" : cat}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 my-4" />

        {/* Broker Filter Selection (Select All / Deselect All) */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1">
              <Filter size={11} className="text-slate-450" />
              Compare Distribution Partners ({selectedBrokers.length} of {BROKER_DATA.length})
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedBrokers(BROKER_DATA.map((b) => b.id))}
                className="text-[11px] font-extrabold text-amber-600 hover:text-amber-800 transition-colors uppercase tracking-wider"
              >
                Select All
              </button>
              <span className="text-slate-350 text-xs font-light">|</span>
              <button
                type="button"
                onClick={() => setSelectedBrokers([])}
                className="text-[11px] font-extrabold text-slate-500 hover:text-slate-700 transition-colors uppercase tracking-wider"
              >
                Deselect All
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {BROKER_DATA.map((broker) => {
              const isChecked = selectedBrokers.includes(broker.id);
              return (
                <button
                  key={broker.id}
                  type="button"
                  onClick={() => {
                    setSelectedBrokers((prev) =>
                      prev.includes(broker.id)
                        ? prev.filter((id) => id !== broker.id)
                        : [...prev, broker.id]
                    );
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all"
                  style={
                    isChecked
                      ? {
                          backgroundColor: broker.accentColor + "15",
                          borderColor: broker.accentColor + "60",
                          color: broker.accentColor,
                          boxShadow: `0 0 0 1px ${broker.accentColor}22`,
                        }
                      : {
                          backgroundColor: "#f8fafc",
                          borderColor: "#e2e8f0",
                          color: "#475569",
                        }
                  }
                >
                  {/* Colored dot indicator */}
                  <div
                    className="w-3 h-3 rounded-sm flex items-center justify-center border transition-all"
                    style={
                      isChecked
                        ? { backgroundColor: broker.accentColor, borderColor: broker.accentColor }
                        : { backgroundColor: "white", borderColor: "#cbd5e1" }
                    }
                  >
                    {isChecked && (
                      <svg
                        className="w-2 h-2 stroke-[4]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{broker.name}</span>
                  <span
                    className="text-[9px] font-normal"
                    style={{ color: isChecked ? broker.accentColor + "aa" : "#94a3b8" }}
                  >
                    ({broker.type === "Discount" ? "Disc." : "Trad."})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* KPI Matrix Table */}
      {filteredBrokers.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400">
            <table 
              style={{ minWidth: `${tableMinWidth}px` }} 
              className="w-full text-left border-collapse table-fixed"
            >
              <thead>
                <tr className="border-b border-slate-200">
                  <th 
                    rowSpan={yearView === "Both" ? 2 : 1}
                    className="p-5 w-[240px] text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 z-20 border-r border-slate-200"
                  >
                    KPI Parameter
                  </th>
                  {filteredBrokers.map((company) => {
                    const initials = company.name
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase();
                    return (
                      <th
                        key={company.id}
                        colSpan={yearView === "Both" ? 2 : 1}
                        className={`text-center border-r border-slate-200/60 last:border-r-0 overflow-hidden ${
                          yearView === "Both" ? "w-[240px]" : "w-[160px]"
                        }`}
                        style={{ padding: 0 }}
                      >
                        {/* Gradient top bar */}
                        <div className={`h-1.5 w-full bg-gradient-to-r ${company.logoColor}`} />

                        <div className="py-4 px-3 flex flex-col items-center gap-2">
                          {/* Avatar circle with gradient & initials */}
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${company.logoColor} flex items-center justify-center shadow-md shrink-0`}
                          >
                            <span className="text-white text-[11px] font-extrabold tracking-tight font-mono leading-none">
                              {initials}
                            </span>
                          </div>

                          {/* Broker name */}
                          <div className="font-display font-extrabold text-[13px] text-slate-900 leading-tight truncate w-full text-center">
                            {company.name}
                          </div>

                          {/* Short entity name */}
                          <div className="text-[9px] text-slate-400 font-sans font-medium truncate w-full text-center leading-normal">
                            {company.fullName.replace(/(\s+Ltd|\s+Limited).*$/i, "")}
                          </div>

                          {/* Type badge — colored */}
                          <div
                            className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border"
                            style={{
                              color: company.accentColor,
                              borderColor: company.accentColor + "55",
                              backgroundColor: company.accentColor + "12",
                            }}
                          >
                            {company.type}
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
                {yearView === "Both" && (
                  <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider font-mono">
                    {filteredBrokers.map((company) => (
                      <React.Fragment key={company.id}>
                        <th
                          className="py-2.5 px-2 text-center border-r border-slate-100 w-[115px]"
                          style={{ color: company.accentColor, backgroundColor: company.accentColor + "08" }}
                        >
                          FY25
                        </th>
                        <th
                          className="py-2.5 px-2 text-center border-r border-slate-200/60 last:border-r-0 w-[125px]"
                          style={{ color: company.accentColor, backgroundColor: company.accentColor + "14" }}
                        >
                          FY26
                        </th>
                      </React.Fragment>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredKPIs.length > 0 ? (
                  filteredKPIs.map((kpi) => {
                    return (
                      <tr 
                        key={kpi.key} 
                        className="hover:bg-slate-50/70 transition-colors group"
                        onClick={() => {
                          if (filteredBrokers.length > 0) {
                            setSelectedCell({
                              company: filteredBrokers[0],
                              kpi,
                              value: filteredBrokers[0].kpis[kpi.key]
                            });
                          }
                        }}
                      >
                        {/* Metric Name & Info */}
                        <td className="p-5 sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-200 font-sans shadow-sm">
                          <div className="flex items-start gap-2.5">
                            <div>
                              <span className="font-semibold text-slate-800 text-sm block leading-snug">
                                {kpi.label}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                                {kpi.category}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity self-center ml-auto"
                              title="View description & footnotes"
                            >
                              <Info size={13} />
                            </button>
                          </div>
                        </td>
  
                        {/* Broker Columns */}
                        {filteredBrokers.map((company) => {
                          const kpiData = company.kpis[kpi.key];
                          return (
                            <React.Fragment key={company.id}>
                              {yearView === "Both" ? (
                                <>
                                  {/* FY25 Column */}
                                  <td 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCell({
                                        company,
                                        kpi,
                                        value: kpiData
                                      });
                                    }}
                                    className="py-4.5 px-3 text-center cursor-pointer border-r border-slate-100 hover:bg-emerald-50/30 transition-all font-mono text-xs text-slate-800"
                                  >
                                    {renderValueCell(company, kpi, false)}
                                  </td>
                                  {/* FY26 Column */}
                                  <td 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCell({
                                        company,
                                        kpi,
                                        value: kpiData
                                      });
                                    }}
                                    className="py-4.5 px-3 text-center cursor-pointer border-r border-slate-200/60 hover:bg-emerald-50/30 transition-all last:border-r-0 font-mono text-xs text-slate-800"
                                  >
                                    <div className="flex flex-col items-center justify-center gap-1">
                                      {renderValueCell(company, kpi, true)}
                                      {getYoYDisplay(company, kpi)}
                                    </div>
                                  </td>
                                </>
                              ) : yearView === "FY26" ? (
                                <td 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCell({
                                      company,
                                      kpi,
                                      value: kpiData
                                    });
                                  }}
                                  className="py-5 px-4 text-center cursor-pointer border-r border-slate-100 hover:bg-emerald-50/30 transition-all last:border-r-0 font-mono text-xs text-slate-800"
                                >
                                  <div className="flex flex-col items-center justify-center gap-1">
                                    {renderValueCell(company, kpi, true)}
                                    {getYoYDisplay(company, kpi)}
                                  </div>
                                </td>
                              ) : (
                                <td 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCell({
                                      company,
                                      kpi,
                                      value: kpiData
                                    });
                                  }}
                                  className="py-5 px-4 text-center cursor-pointer border-r border-slate-100 hover:bg-emerald-50/30 transition-all last:border-r-0 font-mono text-xs text-slate-800"
                                >
                                  {renderValueCell(company, kpi, false)}
                                </td>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={1 + filteredBrokers.length * (yearView === "Both" ? 2 : 1)} className="p-8 text-center text-sm text-slate-400">
                      No matching parameters found for "{searchTerm}". Try another search term.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="max-w-md mx-auto space-y-3.5">
            <div className="inline-flex p-3.5 bg-amber-50 rounded-full text-amber-500 border border-amber-100">
              <Filter size={24} className="stroke-[2.5]" />
            </div>
            <h4 className="font-display font-bold text-slate-900 text-base">No Brokerage Partners Selected</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Select one or more brokers from the comparison filter dashboard above to display their financial performance metrics.
            </p>
            <button
              type="button"
              onClick={() => setSelectedBrokers(BROKER_DATA.map((b) => b.id))}
              className="mt-1 inline-flex items-center justify-center px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Select All Partners
            </button>
          </div>
        </div>
      )}

      {/* Row Footnote Drawer / Modal */}
      {selectedCell && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className={`p-5 bg-gradient-to-r ${selectedCell.company.logoColor} text-white flex justify-between items-center`}>
              <div>
                <span className="text-xs font-extrabold tracking-wider uppercase opacity-75">
                  {selectedCell.company.type} Broker Footnote
                </span>
                <h3 className="font-display font-extrabold text-lg">
                  {selectedCell.company.name} • {selectedCell.kpi.label}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCell(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              {/* Financial comparison row */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">FY25 Value</span>
                  <p className="font-mono text-base font-extrabold text-slate-700">
                    {selectedCell.company.kpis[selectedCell.kpi.key]?.fy25 || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">FY26 Value</span>
                  <div className="flex items-baseline gap-2">
                    <p className="font-mono text-base font-extrabold text-slate-900">
                      {selectedCell.company.kpis[selectedCell.kpi.key]?.fy26 || "N/A"}
                    </p>
                    {getYoYDisplay(selectedCell.company, selectedCell.kpi)}
                  </div>
                </div>
              </div>

              {/* Definitions */}
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1">
                  Parameter Definition
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {selectedCell.kpi.description}
                </p>
              </div>

              {/* Footnotes */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1">
                  Regulatory Footnote / Disclosure Explanation
                </h4>
                <div className="bg-amber-50/50 border border-amber-200/40 p-3.5 rounded-xl text-sm text-slate-700 leading-relaxed font-sans flex items-start gap-2.5">
                  <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    {selectedCell.value?.notes || "No additional specific disclosure footnotes reported."}
                  </p>
                </div>
              </div>

              {/* If value is NSD (Not Separately Disclosed) */}
              {(selectedCell.value && (((selectedCell.value.fy25 && typeof selectedCell.value.fy25 === "string" && selectedCell.value.fy25.includes("NSD")) || (selectedCell.value.fy26 && typeof selectedCell.value.fy26 === "string" && selectedCell.value.fy26.includes("NSD"))))) && (
                <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 flex flex-col gap-2">
                  <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wider block">
                    Important disclosure notice:
                  </span>
                  <p>
                    As designated, standard Indian retail brokerages merge specialized margin ledgers or segment details. Under RBI & SEBI guidelines, "T5 margins" and "ESOP financing" are consolidated inside the broad Margin Trading Facility (MTF) ledger.
                  </p>

                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedCell(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors"
              >
                Close Footnote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

