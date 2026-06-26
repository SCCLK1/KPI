import React from "react";
import { TrendingUp, Award, Activity, DollarSign, Sliders, Briefcase } from "lucide-react";

export default function CfoInsights() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Welcome Title */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-lg text-amber-400">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-white text-base">
              CFO Strategic Insights Desk
            </h3>
            <p className="text-xs text-amber-400/90 font-medium">
              High-level balance-sheet analysis, operating leverage, and capital allocation risk profiles of distribution partners
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 sm:p-10 space-y-6 font-sans">
        <div className="p-5 sm:p-6 border border-slate-200/60 bg-slate-50/50 rounded-2xl space-y-3">
          <h5 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
            <span className="font-mono text-amber-600">01.</span> Capital Productivity: Gearing vs. Net Interest Margin (NIM)
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Zerodha</strong> operates on a debt-free model (operating with <strong>near-zero external gearing</strong> at the group level), resulting in an extremely high consolidated ROE (~31% in FY25). This requires massive cash-reserve self-funding: to power its <strong>₹7,500 Cr MTF book</strong> in FY26, Zerodha funded the entire volume on-balance-sheet using proprietary cash reserves & client collateral margins.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Motilal Oswal</strong> deploys aggressive financial leverage (<strong>1.3x gearing</strong>) to scale its margin trading ledger up to <strong>₹6,094 Cr</strong>. Higher borrowing cost adjustments (<strong>8.65%</strong> in FY26) compress core NIMs on third-party bank funded volumes, but MOFSL successfully offsets margin dilution through high-margin AMC and wealth management fees, maintaining a solid <strong>24% ROE</strong>.
          </p>
        </div>

        <div className="p-5 sm:p-6 border border-slate-200/60 bg-slate-50/50 rounded-2xl space-y-3">
          <h5 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
            <span className="font-mono text-amber-600">02.</span> Cost Structure Analysis: Sourcing & Technology Investments
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Direct Digital-First Model (Zerodha)</strong> operates with nearly zero client acquisition marketing bills (CAC is effectively zero). This structural cost shelter allows Zerodha to absorb regulatory margin compression or trading volume downturns far more robustly than VC-funded counterparts.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Bank-Backed Conglom Model (HDFC Securities)</strong> enjoys the capital market's cheapest bank-channel borrowing cost (<strong>7.80%</strong>). However, HSL faces heavy operational cost structures; launching and scaling the <strong>HDFC Sky</strong> platform demanded massive front-loaded technology capex. Combined with retail volume moderations, these factors led to a <strong>17% decline in net PAT to ₹929.00 Cr in FY26</strong>.
          </p>
        </div>

        <div className="p-5 sm:p-6 border border-slate-200/60 bg-slate-50/50 rounded-2xl space-y-3">
          <h5 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
            <span className="font-mono text-amber-600">03.</span> Earnings Volatility: Statutory vs. Core Operating Performance
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Motilal Oswal</strong> highlights why CFOs look beyond statutory headline figures. Although statutory consolidated PAT slid 18% YoY to <strong>₹2,043.42 Cr</strong> in FY26 due to treasury-book mark-to-market (MTM) non-cash valuation adjustments, MOFSL's **core operating profit (ex-corporate treasury fluctuations) surged by 16% YoY to a record ₹2,360.00 Cr**, proving the deep capital-market resilience of recurring wealth-management and asset advisory branches.
          </p>
        </div>

        <div className="p-5 sm:p-6 border border-slate-200/60 bg-slate-50/50 rounded-2xl space-y-3">
          <h5 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
            <span className="font-mono text-amber-600">04.</span> Strategic Shift from Transactional to Annuity Revenue
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            Traditional and wealth-focused players have successfully scaled non-broking businesses to buffer cyclical hits. <strong>Anand Rathi (ARSSBL)</strong> grew its non-broking revenue (distribution & MTF interest) to <strong>44.1% of its overall topline</strong> in FY26, helping expand its PAT by <strong>24.8%</strong> despite the derivatives industry slowdown.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Geojit</strong> is executing a similar strategic pivot. Although its core transactional broking income contracted, its mutual fund equity AUM expanded to <strong>₹17,092 Cr</strong>, with monthly SIP collections reaching a record <strong>₹151 Cr</strong> by March 2026.
          </p>
        </div>

        <div className="p-5 sm:p-6 border border-slate-200/60 bg-slate-50/50 rounded-2xl space-y-3">
          <h5 className="font-display font-extrabold text-[#0f172a] text-sm flex items-center gap-2">
            <span className="font-mono text-amber-600">05.</span> Gearing & Gearing Limits: Impact of Leverage on NIM
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            Discount brokers are facing a margin squeeze. Due to SEBI's regulatory tightening on derivatives (true-to-label and weekly expiries), <strong>Angel One</strong>'s PAT margins contracted. In response, they raised their borrowing limits to <strong>₹20,000 Cr</strong> to expand client margin lending, which carries a higher cost of debt (<strong>8.1%</strong> in FY26).
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conversely, bank-backed <strong>HDFC Securities</strong> continues to enjoy the lowest cost of funds (<strong>7.80%</strong>), allowing them to generate a healthier net interest margin (NIM) on their <strong>₹2,200 Cr</strong> client funding book, even while experiencing retail trading churn.
          </p>
        </div>
      </div>
    </div>
  );
}
