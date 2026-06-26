import React, { useState, useMemo } from "react";
import { BROKER_DATA, BrokerCompany } from "../data";
import { Sliders, TrendingUp, TrendingDown, DollarSign, Users, Award, Percent, Activity } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function ProjectionsModel() {
  const [selectedBrokerId, setSelectedBrokerId] = useState<string>("groww");
  
  // Projection assumptions
  const [clientGrowth, setClientGrowth] = useState<number>(15); // -50% to +100%
  const [arpuChange, setArpuChange] = useState<number>(5);     // -30% to +50%
  const [opexEscalation, setOpexEscalation] = useState<number>(10); // 0% to +50%
  const [mtfGrowth, setMtfGrowth] = useState<number>(20);       // -50% to +150%

  const broker = useMemo(() => {
    return BROKER_DATA.find((b) => b.id === selectedBrokerId) || BROKER_DATA[0];
  }, [selectedBrokerId]);

  // Reset assumptions when changing broker
  const resetAssumptions = () => {
    setClientGrowth(15);
    setArpuChange(5);
    setOpexEscalation(10);
    setMtfGrowth(20);
  };

  // Perform business model projection calculations
  const projections = useMemo(() => {
    const kpis = broker.kpis;
    
    // FY26 Baseline Actuals
    const fy26TotalIncome = kpis.total_income?.fy26Val || 0;
    const fy26Broking = kpis.broking_income?.fy26Val || 0;
    const fy26Mtf = kpis.mtf_income?.fy26Val || 0;
    const fy26Dist = kpis.distribution_income?.fy26Val || 0;
    const fy26Expense = kpis.total_expense?.fy26Val || 0;
    const fy26Pbt = kpis.pbt?.fy26Val || 0;
    const fy26Pat = kpis.pat?.fy26Val || 0;

    // FY25 actuals for charts
    const fy25TotalIncome = kpis.total_income?.fy25Val || 0;
    const fy25Pat = kpis.pat?.fy25Val || 0;

    // Calculate effective tax rate from FY26 actuals
    const effectiveTaxRate = fy26Pbt > 0 && fy26Pat > 0 && fy26Pbt > fy26Pat
      ? ((fy26Pbt - fy26Pat) / fy26Pbt) * 100
      : 25.17; // standard Indian corporate tax rate (with surcharges)

    // FY27 Projections
    let projBroking = fy26Broking * (1 + clientGrowth / 100) * (1 + arpuChange / 100);
    let projMtf = fy26Mtf * (1 + mtfGrowth / 100);
    let projDist = fy26Dist * (1 + clientGrowth / 100);
    
    let projTotalIncome = 0;
    let projOther = 0;
    
    if (fy26Broking === 0 && fy26Mtf === 0 && fy26Dist === 0) {
      // Fallback projection if individual revenue items are Not Disclosed
      projTotalIncome = fy26TotalIncome * (1 + clientGrowth / 100) * (1 + arpuChange / 100);
    } else {
      const fy26Other = Math.max(0, fy26TotalIncome - (fy26Broking + fy26Mtf + fy26Dist));
      projOther = fy26Other * (1 + clientGrowth / 100);
      projTotalIncome = projBroking + projMtf + projDist + projOther;
    }

    const projExpense = fy26Expense * (1 + opexEscalation / 100);
    const projPbt = projTotalIncome - projExpense;
    const projPat = projPbt > 0 ? projPbt * (1 - effectiveTaxRate / 100) : projPbt;

    // Margins
    const fy26Margin = fy26TotalIncome > 0 ? (fy26Pat / fy26TotalIncome) * 100 : 0;
    const projMargin = projTotalIncome > 0 ? (projPat / projTotalIncome) * 100 : 0;

    // YoY Growth rates (FY27 vs FY26)
    const incomeGrowth = fy26TotalIncome > 0 ? ((projTotalIncome - fy26TotalIncome) / fy26TotalIncome) * 100 : 0;
    const expenseGrowth = fy26Expense > 0 ? ((projExpense - fy26Expense) / fy26Expense) * 100 : 0;
    const patGrowth = fy26Pat > 0 ? ((projPat - fy26Pat) / fy26Pat) * 100 : 0;

    return {
      fy25TotalIncome,
      fy25Pat,
      fy26TotalIncome,
      fy26Broking,
      fy26Mtf,
      fy26Dist,
      fy26Expense,
      fy26Pbt,
      fy26Pat,
      fy26Margin,
      
      projBroking,
      projMtf,
      projDist,
      projOther,
      projTotalIncome,
      projExpense,
      projPbt,
      projPat,
      projMargin,

      incomeGrowth,
      expenseGrowth,
      patGrowth,
      effectiveTaxRate
    };
  }, [broker, clientGrowth, arpuChange, opexEscalation, mtfGrowth]);

  // Construct chart data for visualization
  const chartData = useMemo(() => {
    return [
      {
        name: "FY25 Actual",
        Revenue: parseFloat(projections.fy25TotalIncome.toFixed(1)),
        PAT: parseFloat(projections.fy25Pat.toFixed(1))
      },
      {
        name: "FY26 Actual",
        Revenue: parseFloat(projections.fy26TotalIncome.toFixed(1)),
        PAT: parseFloat(projections.fy26Pat.toFixed(1))
      },
      {
        name: "FY27 Projected",
        Revenue: parseFloat(projections.projTotalIncome.toFixed(1)),
        PAT: parseFloat(projections.projPat.toFixed(1))
      }
    ];
  }, [projections]);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Description Panel */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-md">
            <Sliders size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-base">
              FY27 Business Model Projection Desk
            </h3>
            <p className="text-xs text-emerald-400 font-semibold">
              Interactive financial calculator simulating broker performance based on strategic assumptions
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Visuals/Metrics on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Controls/Sliders Panel */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Assumptions Panel
            </span>
            <button
              onClick={resetAssumptions}
              className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 uppercase underline cursor-pointer"
            >
              Reset Defaults
            </button>
          </div>

          {/* Broker Selector */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              Select Target Brokerage
            </label>
            <select
              value={selectedBrokerId}
              onChange={(e) => {
                setSelectedBrokerId(e.target.value);
                resetAssumptions();
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-800 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {BROKER_DATA.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.type})
                </option>
              ))}
            </select>
          </div>

          <hr className="border-slate-100" />

          {/* Sliders Container */}
          <div className="space-y-5">
            {/* Assumption 1: Client growth */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1">
                  <Users size={14} className="text-slate-400" />
                  Active Client Growth
                </span>
                <span className="font-mono text-emerald-600">
                  {clientGrowth >= 0 ? "+" : ""}{clientGrowth}%
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="100"
                step="5"
                value={clientGrowth}
                onChange={(e) => setClientGrowth(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-medium font-mono">
                <span>-50%</span>
                <span>Baseline (15%)</span>
                <span>+100%</span>
              </div>
            </div>

            {/* Assumption 2: ARPU change */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1">
                  <DollarSign size={14} className="text-slate-400" />
                  ARPU Change (Yield)
                </span>
                <span className="font-mono text-emerald-600">
                  {arpuChange >= 0 ? "+" : ""}{arpuChange}%
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="50"
                step="5"
                value={arpuChange}
                onChange={(e) => setArpuChange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-medium font-mono">
                <span>-30%</span>
                <span>Baseline (5%)</span>
                <span>+50%</span>
              </div>
            </div>

            {/* Assumption 3: MTF book growth */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1">
                  <Activity size={14} className="text-slate-400" />
                  MTF Funding Book Growth
                </span>
                <span className="font-mono text-emerald-600">
                  {mtfGrowth >= 0 ? "+" : ""}{mtfGrowth}%
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="150"
                step="5"
                value={mtfGrowth}
                onChange={(e) => setMtfGrowth(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-medium font-mono">
                <span>-50%</span>
                <span>Baseline (20%)</span>
                <span>+150%</span>
              </div>
            </div>

            {/* Assumption 4: Operating Expenses Escalation */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1">
                  <Percent size={14} className="text-slate-400" />
                  Operating Expenses (Opex) Growth
                </span>
                <span className="font-mono text-emerald-600">
                  +{opexEscalation}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={opexEscalation}
                onChange={(e) => setOpexEscalation(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-medium font-mono">
                <span>0%</span>
                <span>Baseline (10%)</span>
                <span>+50%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Projections Output Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card: High level cards summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Projected Total Income */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Projected Income (FY27)
                </span>
                <h4 className="font-display font-black text-xl text-slate-900 mt-1">
                  ₹{projections.projTotalIncome.toFixed(1)} Cr
                </h4>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {projections.incomeGrowth >= 0 ? (
                  <span className="text-[10.5px] font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100 font-mono">
                    <TrendingUp size={11} />
                    +{projections.incomeGrowth.toFixed(1)}% YoY
                  </span>
                ) : (
                  <span className="text-[10.5px] font-bold text-rose-600 flex items-center gap-0.5 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-100 font-mono">
                    <TrendingDown size={11} />
                    {projections.incomeGrowth.toFixed(1)}% YoY
                  </span>
                )}
              </div>
            </div>

            {/* Projected Expense */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Projected Opex (FY27)
                </span>
                <h4 className="font-display font-black text-xl text-slate-900 mt-1">
                  ₹{projections.projExpense.toFixed(1)} Cr
                </h4>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <span className="text-[10.5px] font-bold text-rose-600 flex items-center gap-0.5 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-100 font-mono">
                  <TrendingDown size={11} />
                  +{projections.expenseGrowth.toFixed(1)}% YoY
                </span>
              </div>
            </div>

            {/* Projected Net Profit (PAT) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Projected Net Profit (PAT)
                </span>
                <h4 className="font-display font-black text-xl text-slate-900 mt-1">
                  ₹{projections.projPat.toFixed(1)} Cr
                </h4>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {projections.patGrowth >= 0 ? (
                  <span className="text-[10.5px] font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100 font-mono">
                    <TrendingUp size={11} />
                    +{projections.patGrowth.toFixed(1)}% YoY
                  </span>
                ) : (
                  <span className="text-[10.5px] font-bold text-rose-600 flex items-center gap-0.5 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-100 font-mono">
                    <TrendingDown size={11} />
                    {projections.patGrowth.toFixed(1)}% YoY
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Visualizing comparison chart */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider">
              Growth Trajectory (FY25 - FY27)
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontWeight={500} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} fontWeight={500} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }}
                    itemStyle={{ fontSize: "11px", fontWeight: "bold" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11.5px", fontWeight: "bold", paddingTop: "10px" }} />
                  <Bar dataKey="Revenue" fill="#00d09c" name="Total Revenue (₹ Cr)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="PAT" fill="#6366f1" name="Net Profit (₹ Cr)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Calculation Details Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Projected Income Statement Details (₹ Cr)
              </span>
              <span className="text-[10px] font-medium text-slate-400 font-mono">
                Assumed Tax Rate: {projections.effectiveTaxRate.toFixed(1)}%
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200 font-bold text-slate-400 uppercase tracking-wider font-mono">
                    <th className="p-3 w-[260px]">Financial Line Item</th>
                    <th className="p-3 text-right">FY26 Actual</th>
                    <th className="p-3 text-right bg-emerald-50/20 text-emerald-800">FY27 Projected</th>
                    <th className="p-3 text-right">Growth Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {/* Broking Revenue */}
                  {projections.fy26Broking > 0 && (
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-800">Broking Revenue</td>
                      <td className="p-3 text-right font-mono text-slate-600">₹{projections.fy26Broking.toFixed(1)}</td>
                      <td className="p-3 text-right font-mono font-semibold bg-emerald-50/20 text-emerald-900">₹{projections.projBroking.toFixed(1)}</td>
                      <td className="p-3 text-right font-mono text-emerald-600 font-bold">
                        +{(((projections.projBroking - projections.fy26Broking)/projections.fy26Broking)*100).toFixed(1)}%
                      </td>
                    </tr>
                  )}

                  {/* MTF Book revenue */}
                  {projections.fy26Mtf > 0 && (
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-800">MTF Interest Revenue</td>
                      <td className="p-3 text-right font-mono text-slate-600">₹{projections.fy26Mtf.toFixed(1)}</td>
                      <td className="p-3 text-right font-mono font-semibold bg-emerald-50/20 text-emerald-900">₹{projections.projMtf.toFixed(1)}</td>
                      <td className="p-3 text-right font-mono text-emerald-600 font-bold">
                        +{mtfGrowth.toFixed(1)}%
                      </td>
                    </tr>
                  )}

                  {/* Distribution income */}
                  {projections.fy26Dist > 0 && (
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-800">Distribution & Wealth Revenue</td>
                      <td className="p-3 text-right font-mono text-slate-600">₹{projections.fy26Dist.toFixed(1)}</td>
                      <td className="p-3 text-right font-mono font-semibold bg-emerald-50/20 text-emerald-900">₹{projections.projDist.toFixed(1)}</td>
                      <td className="p-3 text-right font-mono text-emerald-600 font-bold">
                        +{clientGrowth.toFixed(1)}%
                      </td>
                    </tr>
                  )}

                  {/* Other Revenue */}
                  {projections.projOther > 0 && (
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-800 text-slate-500">Other Disclosed Operating Revenue</td>
                      <td className="p-3 text-right font-mono text-slate-500">
                        ₹{(projections.fy26TotalIncome - (projections.fy26Broking + projections.fy26Mtf + projections.fy26Dist)).toFixed(1)}
                      </td>
                      <td className="p-3 text-right font-mono bg-emerald-50/20 text-slate-600">₹{projections.projOther.toFixed(1)}</td>
                      <td className="p-3 text-right font-mono text-emerald-600 font-bold">
                        +{clientGrowth.toFixed(1)}%
                      </td>
                    </tr>
                  )}

                  {/* Total Income */}
                  <tr className="bg-slate-50/30 hover:bg-slate-50/50 border-t border-slate-200">
                    <td className="p-3 font-bold text-slate-900">Total Income</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-800">₹{projections.fy26TotalIncome.toFixed(1)}</td>
                    <td className="p-3 text-right font-mono font-black bg-emerald-50/40 text-emerald-950">₹{projections.projTotalIncome.toFixed(1)}</td>
                    <td className="p-3 text-right font-mono text-emerald-600 font-black">
                      +{projections.incomeGrowth >= 0 ? "+" : ""}{projections.incomeGrowth.toFixed(1)}%
                    </td>
                  </tr>

                  {/* Total Operating Expense */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">Total Expenses</td>
                    <td className="p-3 text-right font-mono text-slate-600">₹{projections.fy26Expense.toFixed(1)}</td>
                    <td className="p-3 text-right font-mono font-semibold bg-emerald-50/20 text-emerald-900">₹{projections.projExpense.toFixed(1)}</td>
                    <td className="p-3 text-right font-mono text-rose-600 font-bold">
                      +{opexEscalation.toFixed(1)}%
                    </td>
                  </tr>

                  {/* Profit Before Tax */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-800">Profit Before Tax (PBT)</td>
                    <td className="p-3 text-right font-mono text-slate-600">₹{projections.fy26Pbt.toFixed(1)}</td>
                    <td className="p-3 text-right font-mono font-semibold bg-emerald-50/20 text-emerald-900">₹{projections.projPbt.toFixed(1)}</td>
                    <td className="p-3 text-right font-mono font-bold">
                      {projections.fy26Pbt > 0 ? (
                        `${((projections.projPbt - projections.fy26Pbt)/projections.fy26Pbt * 100) >= 0 ? "+" : ""}${((projections.projPbt - projections.fy26Pbt)/projections.fy26Pbt * 100).toFixed(1)}%`
                      ) : "N/A"}
                    </td>
                  </tr>

                  {/* Profit After Tax */}
                  <tr className="bg-slate-50/30 hover:bg-slate-50/50 border-b border-slate-200">
                    <td className="p-3 font-bold text-slate-900">Profit After Tax (PAT)</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-800">₹{projections.fy26Pat.toFixed(1)}</td>
                    <td className="p-3 text-right font-mono font-black bg-emerald-50/40 text-emerald-950">₹{projections.projPat.toFixed(1)}</td>
                    <td className="p-3 text-right font-mono text-emerald-600 font-black">
                      {projections.patGrowth >= 0 ? "+" : ""}{projections.patGrowth.toFixed(1)}%
                    </td>
                  </tr>

                  {/* Net Profit Margin */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-800">Net Profit Margin (%)</td>
                    <td className="p-3 text-right font-mono text-slate-600 font-semibold">{projections.fy26Margin.toFixed(1)}%</td>
                    <td className="p-3 text-right font-mono font-bold bg-emerald-50/20 text-emerald-900">{projections.projMargin.toFixed(1)}%</td>
                    <td className={`p-3 text-right font-mono font-bold ${
                      (projections.projMargin - projections.fy26Margin) >= 0 ? "text-emerald-600" : "text-rose-600"
                    }`}>
                      {(projections.projMargin - projections.fy26Margin) >= 0 ? "+" : ""}{(projections.projMargin - projections.fy26Margin).toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
