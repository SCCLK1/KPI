import React, { useState, useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";
import { BROKER_DATA, KPI_LIST, BrokerCompany, KPIDefinition } from "../data";
import { TrendingUp, BarChart2, LineChart as LineIcon, Landmark, Award, Activity } from "lucide-react";

export default function KPICharts() {
  // Extract all KPIs that have at least some numeric data
  const chartableKPIs = useMemo(() => {
    return KPI_LIST.filter((kpi) => {
      // Must have some numeric value to be chartable
      return BROKER_DATA.some(
        (company) => company.kpis[kpi.key]?.fy25Val !== null || company.kpis[kpi.key]?.fy26Val !== null
      );
    });
  }, []);

  const [selectedKpiKey, setSelectedKpiKey] = useState<string>("total_income");
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  // Get current KPI definition
  const currentKPI = useMemo(() => {
    return KPI_LIST.find((k) => k.key === selectedKpiKey) || chartableKPIs[0];
  }, [selectedKpiKey, chartableKPIs]);

  // Construct chart data
  const chartData = useMemo(() => {
    return BROKER_DATA.map((company) => {
      const kpiData = company.kpis[selectedKpiKey];
      return {
        id: company.id,
        name: company.name,
        type: company.type,
        FY25: kpiData?.fy25Val ?? 0,
        FY26: kpiData?.fy26Val ?? 0,
        fy25Display: kpiData?.fy25 || "NSD",
        fy26Display: kpiData?.fy26 || "NSD",
        unit: kpiData?.unit || "",
      };
    });
  }, [selectedKpiKey]);

  // Calculate high-level metrics for selected KPI
  const stats = useMemo(() => {
    let highestFY26Company = "";
    let highestFY26Val = -Infinity;

    let growthLeaderCompany = "";
    let growthLeaderPct = -Infinity;

    let sumFY26 = 0;
    let countFY26 = 0;

    chartData.forEach((d) => {
      // Find maximum
      if (d.FY26 !== null && d.FY26 > highestFY26Val) {
        highestFY26Val = d.FY26;
        highestFY26Company = d.name;
      }

      // Sum for average
      if (d.FY26 > 0) {
        sumFY26 += d.FY26;
        countFY26++;
      }

      // Calculate YoY Growth %
      const kpiData = BROKER_DATA.find((c) => c.id === d.id)?.kpis[selectedKpiKey];
      if (kpiData && kpiData.fy25Val !== null && kpiData.fy26Val !== null && kpiData.fy25Val > 0) {
        const growth = ((kpiData.fy26Val - kpiData.fy25Val) / kpiData.fy25Val) * 100;
        if (growth > growthLeaderPct) {
          growthLeaderPct = growth;
          growthLeaderCompany = d.name;
        }
      }
    });

    const averageFY26 = countFY26 > 0 ? sumFY26 / countFY26 : 0;

    return {
      highestFY26Company,
      highestFY26Display: highestFY26Val !== -Infinity ? `${highestFY26Val.toFixed(2)} ${chartData[0]?.unit}` : "N/A",
      growthLeaderCompany,
      growthLeaderPctDisplay: growthLeaderPct !== -Infinity ? `+${growthLeaderPct.toFixed(1)}% YoY` : "N/A",
      averageFY26: averageFY26 > 0 ? `${averageFY26.toFixed(2)} ${chartData[0]?.unit}` : "N/A",
    };
  }, [chartData, selectedKpiKey]);

  return (
    <div className="space-y-6">
      {/* Chart Selector Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-sans">
            Select Parameter to Visualize
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedKpiKey}
              onChange={(e) => setSelectedKpiKey(e.target.value)}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold px-4 py-2.5 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all font-sans cursor-pointer"
            >
              <optgroup label="Income & Revenues">
                <option value="total_income">Total Income</option>
                <option value="broking_income">Broking Income</option>
                <option value="mtf_income">MTF Income</option>
                <option value="distribution_income">Distribution Income</option>
              </optgroup>
              <optgroup label="Operating Expenses">
                <option value="total_expense">Total Expense</option>
                <option value="employee_cost">Employee Cost</option>
                <option value="marketing_expense">Marketing Cost</option>
              </optgroup>
              <optgroup label="Profitability">
                <option value="pat">Profit After Tax (PAT)</option>
                <option value="pbt">Profit Before Tax (PBT)</option>
              </optgroup>
              <optgroup label="Market Share & Volumes">
                <option value="market_share_cash">Market Share - Cash (%)</option>
                <option value="market_share_derivatives">Market Share - Derivatives (%)</option>
                <option value="turnover_cash">Turnover - Cash</option>
                <option value="turnover_derivatives">Turnover - Derivatives</option>
              </optgroup>
              <optgroup label="Balance Sheet & Margins">
                <option value="mtf_portfolio">MTF Portfolio (Book Size)</option>
                <option value="networth">Networth</option>
                <option value="borrowing">Borrowings</option>
                <option value="cost_of_borrowing">Cost of Borrowing (%)</option>
              </optgroup>
              <optgroup label="Client Metrics">
                <option value="total_clients">Total Clients</option>
                <option value="active_clients">Active Clients (NSE)</option>
                <option value="new_customers">New Customer Run-rate</option>
              </optgroup>
            </select>

            <span className="text-xs text-slate-500 hidden md:inline">
              Comparing 5 Indian stock brokerages side-by-side
            </span>
          </div>
        </div>

        {/* Chart type selection buttons */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-end md:self-center">
          <button
            onClick={() => setChartType("bar")}
            className={`p-2 rounded-lg transition-all ${
              chartType === "bar"
                ? "bg-white text-emerald-600 shadow-xs ring-1 ring-slate-200"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Vertical Grouped Bar Chart"
          >
            <BarChart2 size={16} />
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`p-2 rounded-lg transition-all ${
              chartType === "line"
                ? "bg-white text-emerald-600 shadow-xs ring-1 ring-slate-200"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Line Comparison Chart"
          >
            <LineIcon size={16} />
          </button>
        </div>
      </div>

      {/* KPI Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Award size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
              FY26 Segment Leader
            </span>
            <span className="font-display font-extrabold text-base text-slate-900 block truncate">
              {stats.highestFY26Company || "N/A"}
            </span>
            <span className="text-xs font-semibold text-emerald-600 font-mono">
              {stats.highestFY26Display}
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
              YoY Growth Champion
            </span>
            <span className="font-display font-extrabold text-base text-slate-900 block truncate">
              {stats.growthLeaderCompany || "N/A"}
            </span>
            <span className="text-xs font-semibold text-emerald-600 font-mono">
              {stats.growthLeaderPctDisplay}
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Landmark size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
              Sector Group Average
            </span>
            <span className="font-display font-extrabold text-base text-slate-900 block">
              {chartData[0]?.unit === "%" ? "Peer Mean" : "FY26 Mean"}
            </span>
            <span className="text-xs font-semibold text-amber-600 font-mono">
              {stats.averageFY26}
            </span>
          </div>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="mb-4">
          <h3 className="font-display font-extrabold text-slate-900 text-base">
            {currentKPI.label} Visual Comparison Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            {currentKPI.description} (FY25 vs FY26 values plotted below)
          </p>
        </div>

        {/* Recharts Container */}
        <div className="h-[360px] w-full font-mono mt-6">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}${chartData[0]?.unit === "%" ? "%" : ""}`}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "#1e293b", 
                    borderRadius: "12px", 
                    color: "#fff",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px"
                  }}
                  itemStyle={{ color: "#e2e8f0" }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "4px", color: "#38bdf8" }}
                  formatter={(value: any, name: any, props: any) => {
                    const originalData = props.payload;
                    const valueStr = name === "FY25" ? originalData.fy25Display : originalData.fy26Display;
                    const cleanValue = valueStr === "NSD" ? "NSD (Not Disclosed)" : valueStr;
                    return [cleanValue, name === "FY25" ? "FY25 Actual" : "FY26 Actual"];
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "15px", fontSize: "11px", fontWeight: 500 }} 
                  iconType="circle"
                />
                <Bar 
                  dataKey="FY25" 
                  name="FY25" 
                  fill="#94a3b8" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={50}
                />
                <Bar 
                  dataKey="FY26" 
                  name="FY26" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={50}
                />
              </BarChart>
            ) : (
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}${chartData[0]?.unit === "%" ? "%" : ""}`}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "#1e293b", 
                    borderRadius: "12px", 
                    color: "#fff",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px"
                  }}
                  itemStyle={{ color: "#e2e8f0" }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "4px", color: "#38bdf8" }}
                  formatter={(value: any, name: any, props: any) => {
                    const originalData = props.payload;
                    const valueStr = name === "FY25" ? originalData.fy25Display : originalData.fy26Display;
                    const cleanValue = valueStr === "NSD" ? "NSD" : valueStr;
                    return [cleanValue, name === "FY25" ? "FY25 Actual" : "FY26 Actual"];
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "15px", fontSize: "11px", fontWeight: 500 }} 
                  iconType="circle"
                />
                <Line 
                  type="monotone" 
                  dataKey="FY25" 
                  name="FY25" 
                  stroke="#94a3b8" 
                  strokeWidth={3}
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="FY26" 
                  name="FY26" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Disclosure Warning on Chart Page */}
        <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-2.5">
          <Activity size={15} className="text-slate-400" />
          <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
            Note: Where a company is marked as <strong>NSD (Not Separately Disclosed)</strong>, its numeric chart value is treated as zero to prevent distortion on coordinates. Click over to the <strong>KPI Matrix</strong> view to consult notes on NSD boundaries.
          </p>
        </div>
      </div>
    </div>
  );
}
