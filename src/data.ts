export interface KPIValue {
  fy25: string;
  fy26: string;
  fy25Val: number | null; // numeric value for charts (if applicable)
  fy26Val: number | null; // numeric value for charts (if applicable)
  unit: string;
  notes: string;
}

export interface CompanyKPIs {
  [kpiKey: string]: KPIValue;
}

export interface BrokerCompany {
  id: string;
  name: string;
  fullName: string;
  type: "Discount" | "Traditional Advisory";
  background: string;
  logoColor: string;
  accentColor: string;
  kpis: CompanyKPIs;
}

export interface KPIDefinition {
  key: string;
  label: string;
  category: "Income" | "Expenses" | "Profitability" | "Market Metrics" | "Balance Sheet & Debt" | "Client Metrics";
  description: string;
}

export const KPI_LIST: KPIDefinition[] = [
  // Income
  {
    key: "broking_income",
    label: "Broking Income",
    category: "Income",
    description: "Income generated directly from equity, commodities, and derivatives broking services."
  },
  {
    key: "distribution_income",
    label: "Distribution Income",
    category: "Income",
    description: "Revenue from distribution of third-party products like Mutual Funds, SIP, Insurance, and Lending."
  },
  {
    key: "mtf_income",
    label: "MTF Income",
    category: "Income",
    description: "Interest income earned from executing Margin Trading Facilities for clients."
  },
  {
    key: "total_income",
    label: "Total Income",
    category: "Income",
    description: "Consolidated total revenue / total operational income."
  },

  // Expenses
  {
    key: "franchisee_expense",
    label: "Franchisee/Comm. Expense",
    category: "Expenses",
    description: "Commission splits or expenses paid to franchise networks and Authorised Persons (APs)."
  },
  {
    key: "employee_cost",
    label: "Employee Cost",
    category: "Expenses",
    description: "Salaries, ESOP provisions, and staff benefits."
  },
  {
    key: "it_expense",
    label: "IT Expense",
    category: "Expenses",
    description: "Technology infrastructure opex, server maintenance, and platform subscription fees."
  },
  {
    key: "marketing_expense",
    label: "Marketing & Biz Promotion",
    category: "Expenses",
    description: "Acquisition spend, branding campaigns, digital ads, and sponsor partnerships."
  },
  {
    key: "total_expense",
    label: "Total Expense",
    category: "Expenses",
    description: "Calculated/reported total operating expenses."
  },

  // Profitability
  {
    key: "pbt",
    label: "Profit Before Tax (PBT)",
    category: "Profitability",
    description: "Earnings before taxes showing core operational leverage and health."
  },
  {
    key: "pat",
    label: "Profit After Tax (PAT)",
    category: "Profitability",
    description: "Consolidated Net Profit or bottom-line income."
  },
  {
    key: "brokerage_yield",
    label: "Brokerage Yield",
    category: "Profitability",
    description: "Effective monetization rate per transaction or customer trade segment."
  },

  // Market Metrics
  {
    key: "turnover_cash",
    label: "Turnover - Cash",
    category: "Market Metrics",
    description: "Trading volumes in the spot/cash equity segment (run-rate or average daily volume)."
  },
  {
    key: "turnover_derivatives",
    label: "Turnover - Derivatives",
    category: "Market Metrics",
    description: "Monthly premium or F&O derivatives volume (run-rate or daily average premium volume)."
  },
  {
    key: "market_share_cash",
    label: "Market Share - Cash",
    category: "Market Metrics",
    description: "Percentage share of total retail equity cash trading volumes/ADTO."
  },
  {
    key: "market_share_derivatives",
    label: "Market Share - Derivatives",
    category: "Market Metrics",
    description: "Percentage share of retail F&O premium transactions/ADTO."
  },

  // Balance Sheet & Debt
  {
    key: "mtf_portfolio",
    label: "MTF Portfolio (Book)",
    category: "Balance Sheet & Debt",
    description: "Outstanding margin funding loan book size extended to clients."
  },
  {
    key: "t5_portfolio",
    label: "T5 Portfolio",
    category: "Balance Sheet & Debt",
    description: "Short-term T5 client receivables funding."
  },
  {
    key: "esop_portfolio",
    label: "ESOP & Other Portfolio",
    category: "Balance Sheet & Debt",
    description: "Dedicated margin book for employee share financing & collateral options."
  },
  {
    key: "networth",
    label: "Networth",
    category: "Balance Sheet & Debt",
    description: "Total shareholder equity and free capital reserves."
  },
  {
    key: "borrowing",
    label: "Borrowing",
    category: "Balance Sheet & Debt",
    description: "Total bank debt, commercial paper, and long-term borrowing to fund operations (principally MTF)."
  },
  {
    key: "cost_of_borrowing",
    label: "Avg. Cost of Borrowing",
    category: "Balance Sheet & Debt",
    description: "Weighted average interest rate paid on borrowed lines of credit."
  },

  // Client Metrics
  {
    key: "total_clients",
    label: "Total Clients",
    category: "Client Metrics",
    description: "Cumulative registered Demat / Broking accounts."
  },
  {
    key: "active_clients",
    label: "Active Clients (NSE)",
    category: "Client Metrics",
    description: "Active transacting clients registered on the National Stock Exchange (NSE)."
  },
  {
    key: "new_customers",
    label: "No. of New Customers Offset",
    category: "Client Metrics",
    description: "Additional user accounts added during the respective fiscal year."
  },
  {
    key: "cac",
    label: "Customer Acquisition Cost",
    category: "Client Metrics",
    description: "Direct cost incurred to acquire a single active trading account."
  },
  {
    key: "revenue_per_new",
    label: "Rev. per New Customer",
    category: "Client Metrics",
    description: "Average revenue generated from a newly acquired customer account over a set period."
  },
  {
    key: "key_business_drivers",
    label: "Key Business Drivers",
    category: "Client Metrics",
    description: "Strategic segment driving growth and performance pivot points."
  }
];

export const BROKER_DATA: BrokerCompany[] = [{
    id: "groww",
    name: "Groww",
    fullName: "Billionbrains Garage Ventures Ltd",
    type: "Discount",
    background: "Groww went public in November 2025. It began as a zero-fee direct mutual fund aggregator before aggressively scaling into F&O trading, making it India's largest active broker by client count. It focuses on a highly streamlined mobile app experience.",
    logoColor: "from-teal-400 to-emerald-600",
    accentColor: "#00d09c",
    kpis: {
      broking_income: {
        fy25: "₹3,297.0",
        fy26: "~₹3,901.4",
        fy25Val: 3297.01,
        fy26Val: 3901.40,
        unit: "₹ Cr",
        notes: "FY25 broking revenue ₹3,297 Cr = 84.5% of operations (RHP). FY26 estimated at ~84% of operating revenue (₹4,645 Cr); not separately broken out in Q4FY26 results."
      },
      distribution_income: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "Zero-fee direct MF platform; monetized via Fisdom acquisition (Wealth) in Q3 FY26."
      },
      mtf_income: {
        fy25: "~₹39.0",
        fy26: "~₹232.0",
        fy25Val: 39,
        fy26Val: 232,
        unit: "₹ Cr",
        notes: "Launched in April 2024; scaled significantly in FY26."
      },
      total_income: {
        fy25: "₹4,061.65",
        fy26: "₹4,815.88",
        fy25Val: 4061.65,
        fy26Val: 4815.88,
        unit: "₹ Cr",
        notes: "Consolidated Total Income."
      },
      franchisee_expense: {
        fy25: "Nil",
        fy26: "Nil",
        fy25Val: null,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "Purely direct-to-consumer digital broker with zero physical franchisee revenue share."
      },
      employee_cost: {
        fy25: "₹315.2",
        fy26: "₹590.83",
        fy25Val: 315.18,
        fy26Val: 590.83,
        unit: "₹ Cr",
        notes: "FY25 employee opex ₹315.18 Cr; FY26 audited opex at ₹590.83 Cr (5,908.33 Mn) per shareholders letter."
      },
      it_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Grouped under 'Cost to Serve' (Platform maintenance & api pipelines)."
      },
      marketing_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Grouped under 'Cost to Grow' (Includes performance ads & brand awareness campaigns)."
      },
      total_expense: {
        fy25: "₹1,596.49",
        fy26: "₹1,991.99",
        fy25Val: 1596.49,
        fy26Val: 1991.99,
        unit: "₹ Cr",
        notes: "Reported total expenses (consolidated)."
      },
      pbt: {
        fy25: "₹2,463.8",
        fy26: "₹2,821.4",
        fy25Val: 2463.78,
        fy26Val: 2821.41,
        unit: "₹ Cr",
        notes: "High operating leverage post-IPO scale."
      },
      pat: {
        fy25: "₹1,824.37",
        fy26: "₹2,083.0",
        fy25Val: 1824.37,
        fy26Val: 2083,
        unit: "₹ Cr",
        notes: "Consolidated Net Profit (+14.2% YoY)."
      },
      brokerage_yield: {
        fy25: "Flat ₹20",
        fy26: "Flat ₹20",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Charges flat ₹20 or 0.05% per trade."
      },
      turnover_cash: {
        fy25: "NSD",
        fy26: "₹8.76 Tn",
        fy25Val: null,
        fy26Val: 8.76,
        unit: "₹ Tn",
        notes: "Stock transaction volume (Q4 FY26 run-rate)."
      },
      turnover_derivatives: {
        fy25: "NSD",
        fy26: "₹8.63 Tn",
        fy25Val: null,
        fy26Val: 8.63,
        unit: "₹ Tn",
        notes: "Premium turnover (Q4 FY26 run-rate)."
      },
      market_share_cash: {
        fy25: "19.3%",
        fy26: "26.6%",
        fy25Val: 19.31,
        fy26Val: 26.60,
        unit: "%",
        notes: "Retail ADTO cash market share (FY25 per RHP)."
      },
      market_share_derivatives: {
        fy25: "11.4%",
        fy26: "~27.0%",
        fy25Val: 11.37,
        fy26Val: 27,
        unit: "%",
        notes: "Retail Premium ADTO market share (FY25 per RHP)."
      },
      mtf_portfolio: {
        fy25: "₹601.9",
        fy26: "₹2,814.3",
        fy25Val: 601.90,
        fy26Val: 2814.30,
        unit: "₹ Cr",
        notes: "MTF book ₹6,019 Mn (FY25) → ₹28,143 Mn (Q4FY26) per shareholders' letter. Reached ~₹3,599 Cr in June 2026."
      },
      t5_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Rolled into the standard MTF client book."
      },
      esop_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Handled through inhouse NBFC (Groww CreditServ)."
      },
      networth: {
        fy25: "NSD",
        fy26: "~₹3,500.0",
        fy25Val: null,
        fy26Val: 3500,
        unit: "₹ Cr",
        notes: "Estimated post-IPO capital cushion."
      },
      borrowing: {
        fy25: "₹345.94",
        fy26: "NSD",
        fy25Val: 345.94,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "Historically minimal leverage."
      },
      cost_of_borrowing: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Not disclosed due to low bank line utilization."
      },
      total_clients: {
        fy25: "1.80 Cr",
        fy26: "2.20 Cr",
        fy25Val: 1.80,
        fy26Val: 2.20,
        unit: "₹ Cr",
        notes: "Total registered Demat base."
      },
      active_clients: {
        fy25: "~96.5 Lakh",
        fy26: "1.29 Cr",
        fy25Val: 96.50,
        fy26Val: 1.29,
        unit: "₹ Cr",
        notes: "Largest active broker in India (~28.31% share)."
      },
      new_customers: {
        fy25: "~40.0 Lakh",
        fy26: "~35.0 Lakh",
        fy25Val: 40,
        fy26Val: 35,
        unit: "Lakh",
        notes: "Direct online additions."
      },
      cac: {
        fy25: "NSD",
        fy26: "Spiked +73%",
        fy25Val: null,
        fy26Val: null,
        unit: "%",
        notes: "Spiked due to branding and Fisdom integration opex."
      },
      revenue_per_new: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Highly transactional; sensitive to F&O shifts."
      },
      key_business_drivers: {
        fy25: "Zero-fee MFs, F&O upsell",
        fy26: "Zero-fee MFs, F&O upsell",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Transitioning from free mutual funds to premium derivative cross-sell."
      }
    }
  },
  {
    id: "angel_one",
    name: "Angel One",
    fullName: "Angel One Limited",
    type: "Discount",
    background: "Angel One is a legacy physical broker that successfully reinvented itself as a mobile-first digital titan. It provides granular financial data, heavily focuses on active derivative (F&O) traders, and is currently expanding into wealth management and physical distribution.",
    logoColor: "from-blue-500 to-indigo-700",
    accentColor: "#3b82f6",
    kpis: {
      broking_income: {
        fy25: "₹3,479.2",
        fy26: "₹3,121.0",
        fy25Val: 3479.20,
        fy26Val: 3121,
        unit: "₹ Cr",
        notes: "Down ~10.3% due to regulatory true-to-label changes."
      },
      distribution_income: {
        fy25: "₹112.0",
        fy26: "₹161.0",
        fy25Val: 112,
        fy26Val: 161,
        unit: "₹ Cr",
        notes: "SIP collections, insurance, and lending."
      },
      mtf_income: {
        fy25: "₹1,341.0",
        fy26: "₹1,631.7",
        fy25Val: 1341,
        fy26Val: 1631.70,
        unit: "₹ Cr",
        notes: "Benefited from interest rate charges."
      },
      total_income: {
        fy25: "₹5,247.7",
        fy26: "₹5,152.2",
        fy25Val: 5247.70,
        fy26Val: 5152.20,
        unit: "₹ Cr",
        notes: "Consolidated Total Revenue."
      },
      franchisee_expense: {
        fy25: "₹824.6",
        fy26: "₹720.2",
        fy25Val: 824.6,
        fy26Val: 720.2,
        unit: "₹ Cr",
        notes: "Total reported fees and commission expense; includes franchisee and AP splits."
      },
      employee_cost: {
        fy25: "₹855.2",
        fy26: "~₹1,067.1",
        fy25Val: 855.20,
        fy26Val: 1067.10,
        unit: "₹ Cr",
        notes: "Elevated on tech and wealth hiring."
      },
      it_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Grouped under 'Admin and Other Expenses'."
      },
      marketing_expense: {
        fy25: "~₹280.0",
        fy26: "~₹410.0",
        fy25Val: 280,
        fy26Val: 410,
        unit: "₹ Cr",
        notes: "Spiked on IPL sponsorship."
      },
      total_expense: {
        fy25: "₹3,655.7",
        fy26: "₹3,880.4",
        fy25Val: 3655.70,
        fy26Val: 3880.40,
        unit: "₹ Cr",
        notes: "Derived from PBT."
      },
      pbt: {
        fy25: "₹1,592.0",
        fy26: "₹1,271.8",
        fy25Val: 1592,
        fy26Val: 1271.80,
        unit: "₹ Cr",
        notes: "Margins compressed by F&O true-to-label limits."
      },
      pat: {
        fy25: "₹1,172.1",
        fy26: "₹915.1",
        fy25Val: 1172.10,
        fy26Val: 915.10,
        unit: "₹ Cr",
        notes: "Net Profit (-21.9% YoY)."
      },
      brokerage_yield: {
        fy25: "Flat ₹20",
        fy26: "Flat ₹20",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Standardized flat structure (₹20 per trade)."
      },
      turnover_cash: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "₹ Bn",
        notes: "Multi-year cash segment recovery ADTO."
      },
      turnover_derivatives: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "₹ Bn",
        notes: "Based on Option Premium ADTO."
      },
      market_share_cash: {
        fy25: "17.4%",
        fy26: "18.0%",
        fy25Val: 17.40,
        fy26Val: 18,
        unit: "%",
        notes: "Steady growth in cash market penetration."
      },
      market_share_derivatives: {
        fy25: "21.8%",
        fy26: "19.7%",
        fy25Val: 21.80,
        fy26Val: 19.70,
        unit: "%",
        notes: "NSE F&O market share contracted."
      },
      mtf_portfolio: {
        fy25: "₹3,858.8",
        fy26: "₹5,449.4",
        fy25Val: 3858.8,
        fy26Val: 5449.4,
        unit: "₹ Cr",
        notes: "Key margin counter-balance (+46.3% YoY)."
      },
      t5_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Integrated into standard client margin ledger."
      },
      esop_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Non-disclosed; wealth AUM stands at ₹43.4 Bn."
      },
      networth: {
        fy25: "₹5,639.1",
        fy26: "₹6,148.9",
        fy25Val: 5639.10,
        fy26Val: 6148.90,
        unit: "₹ Cr",
        notes: "Comfortable capital ratios (per consolidated balance sheet: ₹5,639 Cr FY25, ₹6,149 Cr FY26)."
      },
      borrowing: {
        fy25: "₹3,382.8",
        fy26: "₹7,879.1",
        fy25Val: 3382.8,
        fy26Val: 7879.1,
        unit: "₹ Cr",
        notes: "Increased to fund the growing MTF book."
      },
      cost_of_borrowing: {
        fy25: "7.8%",
        fy26: "8.1%",
        fy25Val: 7.80,
        fy26Val: 8.10,
        unit: "%",
        notes: "CoF increased on bank MCLR revisions."
      },
      total_clients: {
        fy25: "3.10 Cr",
        fy26: "3.74 Cr",
        fy25Val: 3.10,
        fy26Val: 3.74,
        unit: "₹ Cr",
        notes: "DEMAT register base."
      },
      active_clients: {
        fy25: "~75.75 Lakh",
        fy26: "67.62 Lakh",
        fy25Val: 75.75,
        fy26Val: 67.62,
        unit: "Lakh",
        notes: "De-growth in active client base registered with NSE."
      },
      new_customers: {
        fy25: "~62.0 Lakh",
        fy26: "~69.6 Lakh",
        fy25Val: 62,
        fy26Val: 69.60,
        unit: "Lakh",
        notes: "Aggressive H1 FY26 marketing."
      },
      cac: {
        fy25: "~19% of Net Rev",
        fy26: "Elevated",
        fy25Val: null,
        fy26Val: null,
        unit: "%",
        notes: "Spiked due to seasonal e-commerce ad inflation."
      },
      revenue_per_new: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Payback period stretched from 7 to 10 months."
      },
      key_business_drivers: {
        fy25: "F&O Volume, MTF Book",
        fy26: "F&O Volume, MTF Book",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Pivoting to multi-asset wealth to buffer F&O opex."
      }
    }
  },
  {
    id: "iifl",
    name: "IIFL Capital Services",
    fullName: "IIFL Capital Services Limited",
    type: "Traditional Advisory",
    background: "Formerly known as IIFL Securities, IIFL Capital Services is a premier institutional, HNI relationship, and asset distribution powerhouse. It operates via relationships, deep research desks, and partner sub-broker networks, shielding it from high-frequency retail churn.",
    logoColor: "from-orange-500 to-amber-700",
    accentColor: "#f97316",
    kpis: {
      broking_income: {
        fy25: "~₹1,800.0",
        fy26: "~₹1,750.0",
        fy25Val: 1800,
        fy26Val: 1750,
        unit: "₹ Cr",
        notes: "Consolidated broking fees and charges."
      },
      distribution_income: {
        fy25: "₹509.4",
        fy26: "₹590.4",
        fy25Val: 509.40,
        fy26Val: 590.40,
        unit: "₹ Cr",
        notes: "Financial Product Distribution (incl. insurance & ancillary): ₹5,094 Mn FY25 → ₹5,904 Mn FY26."
      },
      mtf_income: {
        fy25: "~₹110.0",
        fy26: "~₹180.0",
        fy25Val: 110,
        fy26Val: 180,
        unit: "₹ Cr",
        notes: "High growth in retail client financing."
      },
      total_income: {
        fy25: "₹2,405.0",
        fy26: "₹2,438.8",
        fy25Val: 2405,
        fy26Val: 2438.8,
        unit: "₹ Cr",
        notes: "Consolidated Operating Revenue."
      },
      franchisee_expense: {
        fy25: "₹496.2",
        fy26: "₹534.1",
        fy25Val: 496.2,
        fy26Val: 534.1,
        unit: "₹ Cr",
        notes: "Sub-broker commission and partner payout sharing."
      },
      employee_cost: {
        fy25: "₹590.5",
        fy26: "₹687.5",
        fy25Val: 590.5,
        fy26Val: 687.5,
        unit: "₹ Cr",
        notes: "Consolidated employee benefits expense; includes ₹7.1 Cr new labor code provision in FY26."
      },
      it_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Grouped under 'Other Operating Expenses'."
      },
      marketing_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Minimal branding spend compared to discount brokers; relationship-driven."
      },
      total_expense: {
        fy25: "₹1,642.8",
        fy26: "₹1,846.8",
        fy25Val: 1642.80,
        fy26Val: 1846.80,
        unit: "₹ Cr",
        notes: "Reported total expenses: ₹16,428 Mn FY25 → ₹18,468 Mn FY26."
      },
      pbt: {
        fy25: "₹924.6",
        fy26: "₹756.3",
        fy25Val: 924.60,
        fy26Val: 756.30,
        unit: "₹ Cr",
        notes: "Dragged down by regulatory impacts on certain segments."
      },
      pat: {
        fy25: "₹712.9",
        fy26: "₹563.6",
        fy25Val: 712.9,
        fy26Val: 563.6,
        unit: "₹ Cr",
        notes: "Net profit down 21% YoY."
      },
      brokerage_yield: {
        fy25: "Relationship-Tiered",
        fy26: "Relationship-Tiered",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "High-touch relationship pricing (advisory model)."
      },
      turnover_cash: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Handled through institutional execution tables."
      },
      turnover_derivatives: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Primarily HNI/Corporate derivatives."
      },
      market_share_cash: {
        fy25: "~1.0%",
        fy26: "~1.0%",
        fy25Val: 1,
        fy26Val: 1,
        unit: "%",
        notes: "Maintained stable, low-churn market share."
      },
      market_share_derivatives: {
        fy25: "<1.0%",
        fy26: "<1.0%",
        fy25Val: 1,
        fy26Val: 1,
        unit: "%",
        notes: "Minimal discount derivative presence."
      },
      mtf_portfolio: {
        fy25: "₹930.0",
        fy26: "₹1,450.0",
        fy25Val: 930,
        fy26Val: 1450,
        unit: "₹ Cr",
        notes: "Funded via bank borrowings and short-term debt."
      },
      t5_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Grouped inside standard client ledger."
      },
      esop_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Handled via parent/NBFC arm IIFL Wealth Finance."
      },
      networth: {
        fy25: "₹2,510.0",
        fy26: "₹3,070.0",
        fy25Val: 2510,
        fy26Val: 3070,
        unit: "₹ Cr",
        notes: "Strengthened by Fairfax recapitalization."
      },
      borrowing: {
        fy25: "₹1,053.1",
        fy26: "₹1,741.8",
        fy25Val: 1053.10,
        fy26Val: 1741.80,
        unit: "₹ Cr",
        notes: "Used to fund institutional guarantees & MTF."
      },
      cost_of_borrowing: {
        fy25: "~8.5%",
        fy26: "~9.1%",
        fy25Val: 8.50,
        fy26Val: 9.10,
        unit: "%",
        notes: "Cost of funds increased due to NBFC market tightness."
      },
      total_clients: {
        fy25: "~24.0 Lakh",
        fy26: "~25.0 Lakh",
        fy25Val: 24,
        fy26Val: 25,
        unit: "Lakh",
        notes: "Institutional & physical HNI base."
      },
      active_clients: {
        fy25: "~4.9 Lakh",
        fy26: "3,42,801",
        fy25Val: 4.90,
        fy26Val: 342801,
        unit: "Lakh",
        notes: "Churn in retail cash client base."
      },
      new_customers: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Focused on client asset size rather than account count."
      },
      cac: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Advisory models rely on partner commissions rather than direct ad acquisition opex."
      },
      revenue_per_new: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Retains a very high Average Revenue Per Client (ARPC)."
      },
      key_business_drivers: {
        fy25: "Institutional, IB Deals",
        fy26: "Institutional, IB Deals",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Shift to wealth/mutual fund distribution assets (AUM)."
      }
    }
  },
  {
    id: "anand_rathi",
    name: "Anand Rathi",
    fullName: "Anand Rathi Wealth Limited (ARWL)",
    type: "Traditional Advisory",
    background: "Anand Rathi Wealth Limited is one of the leading non-bank wealth solutions firms in India, specializing in structured product distribution, mutual fund advisory, and holistic wealth management for High Net Worth Individuals (HNIs).",
    logoColor: "from-yellow-500 to-amber-600",
    accentColor: "#eab308",
    kpis: {
      broking_income: {
        fy25: "₹510.27",
        fy26: "₹475.51",
        fy25Val: 510.27,
        fy26Val: 475.51,
        unit: "₹ Cr",
        notes: "Slipped 6.8% due to derivative margins."
      },
      distribution_income: {
        fy25: "₹78.43",
        fy26: "₹112.87",
        fy25Val: 78.43,
        fy26Val: 112.87,
        unit: "₹ Cr",
        notes: "Strong insurance/MF distribution growth (+44% YoY)."
      },
      mtf_income: {
        fy25: "₹142.84",
        fy26: "₹192.29",
        fy25Val: 142.84,
        fy26Val: 192.29,
        unit: "₹ Cr",
        notes: "Key profitability driver (+34.6% YoY)."
      },
      total_income: {
        fy25: "₹980.20",
        fy26: "₹1,253.10",
        fy25Val: 980.20,
        fy26Val: 1253.10,
        unit: "₹ Cr",
        notes: "Consolidated Operational Revenue."
      },
      franchisee_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Shared with domestic sub-brokers."
      },
      employee_cost: {
        fy25: "₹419.9",
        fy26: "₹529.9",
        fy25Val: 419.9,
        fy26Val: 529.9,
        unit: "₹ Cr",
        notes: "Consolidated employee cost: includes ₹39.3 Cr ESOP opex in FY26."
      },
      it_expense: {
        fy25: "₹6.3",
        fy26: "₹6.5",
        fy25Val: 6.3,
        fy26Val: 6.5,
        unit: "₹ Cr",
        notes: "IT enabled services opex per investor disclosures."
      },
      marketing_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Localized client acquisition; minimal digital brand ad spend."
      },
      total_expense: {
        fy25: "₹534.43",
        fy26: "₹552.66",
        fy25Val: 534.43,
        fy26Val: 552.66,
        unit: "₹ Cr",
        notes: "Derived from EBITDA and PBT calculations."
      },
      pbt: {
        fy25: "₹404.40",
        fy26: "₹520.60",
        fy25Val: 404.40,
        fy26Val: 520.60,
        unit: "₹ Cr",
        notes: "Operating profit before tax."
      },
      pat: {
        fy25: "₹300.50",
        fy26: "₹385.70",
        fy25Val: 300.50,
        fy26Val: 385.70,
        unit: "₹ Cr",
        notes: "Net profit grew 24.8% YoY."
      },
      brokerage_yield: {
        fy25: "Relationship-Tiered",
        fy26: "Relationship-Tiered",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Advisory-pricing model based on client volume tiers."
      },
      turnover_cash: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Focused primarily on high-delivery cash clients."
      },
      turnover_derivatives: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Balanced 50:50 broking mix between cash & F&O."
      },
      market_share_cash: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Held 27th position overall in active NSE base."
      },
      market_share_derivatives: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Low retail speculative market share."
      },
      mtf_portfolio: {
        fy25: "₹21,565 Cr",
        fy26: "₹26,472 Cr",
        fy25Val: 21565,
        fy26Val: 26472,
        unit: "₹ Cr",
        notes: "Zero NPAs; high-quality collateral."
      },
      t5_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Standardized T5 funding is merged with MTF ledgers."
      },
      esop_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "ESOP funding is handled under the parent organization."
      },
      networth: {
        fy25: "~₹1,050.0",
        fy26: "~₹1,800.0",
        fy25Val: 1050,
        fy26Val: 1800,
        unit: "₹ Cr",
        notes: "Post-IPO capital raise in September 2025."
      },
      borrowing: {
        fy25: "~₹880.0",
        fy26: "NSD",
        fy25Val: 880,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "Leverage (Debt/Equity) fell below 0.6x."
      },
      cost_of_borrowing: {
        fy25: "7.5%",
        fy26: "7.5%",
        fy25Val: 7.50,
        fy26Val: 7.50,
        unit: "%",
        notes: "Implied cost of funds is highly optimized."
      },
      total_clients: {
        fy25: "~3.5 Lakh",
        fy26: "~4.2 Lakh",
        fy25Val: 3.50,
        fy26Val: 4.20,
        unit: "Lakh",
        notes: "Retained high-net-worth individual (HNI) focus."
      },
      active_clients: {
        fy25: "1,47,942",
        fy26: "2,12,841",
        fy25Val: 147942,
        fy26Val: 212841,
        unit: "Lakh",
        notes: "Relationship expansion in Tier 2/3 cities."
      },
      new_customers: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Organic relationship additions."
      },
      cac: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Scaled primarily via offline advisor channels."
      },
      revenue_per_new: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "High relationship-led Average Revenue Per User."
      },
      key_business_drivers: {
        fy25: "Tier 2/3 Relationship, MTF",
        fy26: "Tier 2/3 Relationship, MTF",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Cross-selling third-party insurance & scaling MTF books."
      }
    }
  },
  {
    id: "geojit",
    name: "Geojit Financial",
    fullName: "Geojit Financial Services Limited",
    type: "Traditional Advisory",
    background: "Geojit operates a highly stable mutual fund SIP-led recurrent distribution asset base, famous for serving non-resident Indians (NRIs) in GCC countries. It is transitioning away from pure transaction-reliant retail equity cash volumes toward recurrent fee-based wealth assets under management.",
    logoColor: "from-emerald-500 to-green-700",
    accentColor: "#10b981",
    kpis: {
      broking_income: {
        fy25: "₹295.73",
        fy26: "₹223.28",
        fy25Val: 295.73,
        fy26Val: 223.28,
        unit: "₹ Cr",
        notes: "Declined due to transactional retail volume drops."
      },
      distribution_income: {
        fy25: "₹204.47",
        fy26: "₹226.52",
        fy25Val: 204.47,
        fy26Val: 226.52,
        unit: "₹ Cr",
        notes: "MF + Insurance + Other distribution income (FY26: 131.12 + 87.16 + 8.24)."
      },
      mtf_income: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Consolidated under broader interest earning assets."
      },
      total_income: {
        fy25: "₹749.32",
        fy26: "₹675.96",
        fy25Val: 749.32,
        fy26Val: 675.96,
        unit: "₹ Cr",
        notes: "Revenue fell 10% YoY due to structural cash volume drops."
      },
      franchisee_expense: {
        fy25: "₹101.1",
        fy26: "₹80.8",
        fy25Val: 101.13,
        fy26Val: 80.78,
        unit: "₹ Cr",
        notes: "Fees and commission payouts to franchise/JV sub-brokers: ₹101.13 Cr (FY25) and ₹80.78 Cr (FY26)."
      },
      employee_cost: {
        fy25: "₹264.3",
        fy26: "₹299.5",
        fy25Val: 264.26,
        fy26Val: 299.51,
        unit: "₹ Cr",
        notes: "Consolidated employee benefits expense: includes ₹8.86 Cr exceptional labor code provisions in FY26."
      },
      it_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Investments in 'Geojit 2.0' tech platform transition."
      },
      marketing_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Included inside high advisory acquisition opex."
      },
      total_expense: {
        fy25: "₹526.63",
        fy26: "₹558.88",
        fy25Val: 526.63,
        fy26Val: 558.88,
        unit: "₹ Cr",
        notes: "Reported total expenses; elevated opex from front-loaded investments."
      },
      pbt: {
        fy25: "₹222.69",
        fy26: "₹108.23",
        fy25Val: 222.69,
        fy26Val: 108.23,
        unit: "₹ Cr",
        notes: "FY26 after ₹8.86 Cr exceptional item; margins compressed on workforce expansions."
      },
      pat: {
        fy25: "₹172.49",
        fy26: "₹83.58",
        fy25Val: 172.49,
        fy26Val: 83.58,
        unit: "₹ Cr",
        notes: "Slipped 52% YoY."
      },
      brokerage_yield: {
        fy25: "Traditional Advisory-Tiered",
        fy26: "Traditional Advisory-Tiered",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Advisory-led tiered fee structures."
      },
      turnover_cash: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Decline in traditional cash delivery trades."
      },
      turnover_derivatives: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "High-frequency retail speculative F&O client base is small."
      },
      market_share_cash: {
        fy25: "~0.50%",
        fy26: "~0.50%",
        fy25Val: 0.50,
        fy26Val: 0.50,
        unit: "%",
        notes: "Traditional base cash delivery has consolidated."
      },
      market_share_derivatives: {
        fy25: "~0.40%",
        fy26: "~0.40%",
        fy25Val: 0.40,
        fy26Val: 0.40,
        unit: "%",
        notes: "Demat register market share stands around 0.49%."
      },
      mtf_portfolio: {
        fy25: "₹576.0",
        fy26: "₹641.0",
        fy25Val: 576,
        fy26Val: 641,
        unit: "₹ Cr",
        notes: "MTF & LAS lending book: ₹576 Cr (FY25) and ₹641 Cr (FY26) per investor disclosures."
      },
      t5_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Not structured separately from general MTF books."
      },
      esop_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Negligible loan against securities (LAS) usage."
      },
      networth: {
        fy25: "₹1,243.5",
        fy26: "₹1,295.2",
        fy25Val: 1243.50,
        fy26Val: 1295.17,
        unit: "₹ Cr",
        notes: "Total equity: ₹1,243.5 Cr (Mar-25) → ₹1,295.2 Cr (Mar-26)."
      },
      borrowing: {
        fy25: "₹21.8",
        fy26: "₹17.0",
        fy25Val: 21.8,
        fy26Val: 17,
        unit: "₹ Cr",
        notes: "Historically debt-free; utilizes minor bank credit lines."
      },
      cost_of_borrowing: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Leveraged minimally on back-up cash reserves."
      },
      total_clients: {
        fy25: "15.1 Lakh",
        fy26: "16.68 Lakh",
        fy25Val: 15.10,
        fy26Val: 16.68,
        unit: "Lakh",
        notes: "Steady DEMAT/MF client growth (+10.5% YoY)."
      },
      active_clients: {
        fy25: "~5.9 Lakh",
        fy26: "2,17,100",
        fy25Val: 5.90,
        fy26Val: 217100,
        unit: "Lakh",
        notes: "Slipped as inactive offline accounts were cleaned up."
      },
      new_customers: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Advisory network organic additions."
      },
      cac: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Scaled through physical offices and Gulf GCC partnerships."
      },
      revenue_per_new: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Transitioning toward recurring wealth advisory fees."
      },
      key_business_drivers: {
        fy25: "Gulf/GCC NRI Base, MF SIPs",
        fy26: "Gulf/GCC NRI Base, MF SIPs",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Diversification of monthly SIP inflows (~₹151 Cr/month)."
      }
    }
  },
  {
    id: "zerodha",
    name: "Zerodha",
    fullName: "Zerodha Broking Limited (Consolidated)",
    type: "Discount",
    background: "Zerodha operates as a bootstrapped, debt-free conglomerate. Its credit play is run via Zerodha Capital Private Limited (ZCPL) (primarily LAS), while its brokerage division runs its own margin funding. High conversion rate to operating cash and extremely lean opex profile.",
    logoColor: "from-sky-400 to-blue-600",
    accentColor: "#0284c7",
    kpis: {
      broking_income: {
        fy25: "~₹7,100.0",
        fy26: "~₹5,800.0",
        fy25Val: 7100,
        fy26Val: 5800,
        unit: "₹ Cr",
        notes: "Fell on SEBI's true-to-label circular."
      },
      distribution_income: {
        fy25: "Nil",
        fy26: "Nil",
        fy25Val: null,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "Zero-fee direct mutual fund setup."
      },
      mtf_income: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "Generated via client cash balance interest."
      },
      total_income: {
        fy25: "₹8,809.94",
        fy26: "~₹7,800.0",
        fy25Val: 8809.94,
        fy26Val: 7800,
        unit: "₹ Cr",
        notes: "Consolidated Operating Revenue."
      },
      franchisee_expense: {
        fy25: "Nil",
        fy26: "Nil",
        fy25Val: null,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "No sub-broker or partner program."
      },
      employee_cost: {
        fy25: "~₹550.0",
        fy26: "NSD",
        fy25Val: 550,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "Team size: 1,156; includes founder salaries."
      },
      it_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Grouped under 'Technology Platform Expenses'."
      },
      marketing_expense: {
        fy25: "<₹50.0",
        fy26: "<₹50.0",
        fy25Val: 50,
        fy26Val: 50,
        unit: "₹ Cr",
        notes: "Relies entirely on organic, word-of-mouth growth."
      },
      total_expense: {
        fy25: "~₹2,800.0",
        fy26: "~₹2,600.0",
        fy25Val: 2800,
        fy26Val: 2600,
        unit: "₹ Cr",
        notes: "Incredibly lean opex profile."
      },
      pbt: {
        fy25: "~₹6,000.0",
        fy26: "~₹5,200.0",
        fy25Val: 6000,
        fy26Val: 5200,
        unit: "₹ Cr",
        notes: "High conversion rate to operating cash."
      },
      pat: {
        fy25: "₹4,237.0",
        fy26: "~₹3,900.0",
        fy25Val: 4237,
        fy26Val: 3900,
        unit: "₹ Cr",
        notes: "Net Profit; ROE stands at 31%."
      },
      brokerage_yield: {
        fy25: "Flat ₹20",
        fy26: "Flat ₹20",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Flat ₹20 per trade structure."
      },
      turnover_cash: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Handled via proprietary Kite terminals."
      },
      turnover_derivatives: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Strong focus on retail F&O."
      },
      market_share_cash: {
        fy25: "16.03%",
        fy26: "15.08%",
        fy25Val: 16.03,
        fy26Val: 15.08,
        unit: "%",
        notes: "Slipped slightly amid intense competition."
      },
      market_share_derivatives: {
        fy25: "~18.5%",
        fy26: "~17.1%",
        fy25Val: 18.50,
        fy26Val: 17.10,
        unit: "%",
        notes: "Impacted by regulatory derivatives volume drops."
      },
      mtf_portfolio: {
        fy25: "~₹5,100.0",
        fy26: "₹7,500.0",
        fy25Val: 5100,
        fy26Val: 7500,
        unit: "₹ Cr",
        notes: "Run directly on the broker's balance sheet."
      },
      t5_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "LAS portfolio size managed under ZCPL."
      },
      esop_portfolio: {
        fy25: "₹381.0",
        fy26: "₹580.0",
        fy25Val: 381,
        fy26Val: 580,
        unit: "text",
        notes: "Integrated into ZCPL's LAS ledger."
      },
      networth: {
        fy25: "₹16,611.0",
        fy26: "~₹19,000.0",
        fy25Val: 16611.21,
        fy26Val: 19000,
        unit: "₹ Cr",
        notes: "FY25 net worth ₹16,611 Cr (MCA Annual Return, standalone). FY26 estimated — no FY26 filing available."
      },
      borrowing: {
        fy25: "~₹210.0",
        fy26: "~₹340.0",
        fy25Val: 210,
        fy26Val: 340,
        unit: "₹ Cr",
        notes: "Zero debt at group level; NBFC is highly capitalized."
      },
      cost_of_borrowing: {
        fy25: "N/A",
        fy26: "N/A",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Group is debt-free; NBFC uses bank lines."
      },
      total_clients: {
        fy25: "81.0 Lakh",
        fy26: "86.2 Lakh",
        fy25Val: 81,
        fy26Val: 86.20,
        unit: "Lakh",
        notes: "Total registered base."
      },
      active_clients: {
        fy25: "~79.9 Lakh",
        fy26: "68.83 Lakh",
        fy25Val: 79.90,
        fy26Val: 68.83,
        unit: "Lakh",
        notes: "Dropped on inactive cleanup."
      },
      new_customers: {
        fy25: "5.8 Lakh",
        fy26: "~4.1 Lakh",
        fy25Val: 5.80,
        fy26Val: 4.10,
        unit: "Lakh",
        notes: "Direct onboarding."
      },
      cac: {
        fy25: "Nil",
        fy26: "Nil",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Strictly organic customer acquisition."
      },
      revenue_per_new: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "High transaction-per-user yield."
      },
      key_business_drivers: {
        fy25: "Free Delivery, Kite UI",
        fy26: "Free Delivery, Kite UI",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Driving organic traffic to low-gearing LAS products."
      }
    }
  },
  {
    id: "mofsl",
    name: "Motilal Oswal",
    fullName: "Motilal Oswal Financial Services Ltd",
    type: "Traditional Advisory",
    background: "MOFSL operates a diversified capital-markets model with private wealth and asset management scale. Operating PAT is distinct from Statutory PAT because the latter includes treasury MTM adjustments on its equity book. It features solid AUM growth and active wealth advising channels.",
    logoColor: "from-yellow-600 to-amber-800",
    accentColor: "#d97706",
    kpis: {
      broking_income: {
        fy25: "~₹2,356.8",
        fy26: "~₹2,165.7",
        fy25Val: 2356.80,
        fy26Val: 2165.70,
        unit: "₹ Cr",
        notes: "Brokerage revenues ≈28% of total revenue FY25, ≈23% FY26 (per revenue-mix disclosure); excludes net interest income."
      },
      distribution_income: {
        fy25: "~₹1,262.6",
        fy26: "~₹1,506.6",
        fy25Val: 1262.60,
        fy26Val: 1506.60,
        unit: "₹ Cr",
        notes: "Distribution fees ≈15% of total revenue FY25, ≈16% FY26. (Distribution AUM book — distinct from fee income — grew 41% YoY to ₹40,662 Cr.)"
      },
      mtf_income: {
        fy25: "₹865.0",
        fy26: "₹1,120.0",
        fy25Val: 865,
        fy26Val: 1120,
        unit: "₹ Cr",
        notes: "Benefited from higher yields on client funding."
      },
      total_income: {
        fy25: "₹8,417.0",
        fy26: "₹9,416.42",
        fy25Val: 8417,
        fy26Val: 9416.42,
        unit: "₹ Cr",
        notes: "Consolidated Total Revenue (+11.87% YoY)."
      },
      franchisee_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Distributed to physical franchise partners."
      },
      employee_cost: {
        fy25: "₹1,704.0",
        fy26: "NSD",
        fy25Val: 1704,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "Elevated due to wealth advisor onboarding."
      },
      it_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Grouped inside 'RIISE' super-app tech overheads."
      },
      marketing_expense: {
        fy25: "~₹120.0",
        fy26: "~₹180.0",
        fy25Val: 120,
        fy26Val: 180,
        unit: "₹ Cr",
        notes: "Focused on wealth branding and HNIs."
      },
      total_expense: {
        fy25: "₹5,923.0",
        fy26: "₹7,373.0",
        fy25Val: 5923,
        fy26Val: 7373,
        unit: "₹ Cr",
        notes: "Increased due to tech and physical branch expansions."
      },
      pbt: {
        fy25: "₹2,689.0",
        fy26: "₹3,113.0",
        fy25Val: 2689,
        fy26Val: 3113,
        unit: "₹ Cr",
        notes: "Operating PBT (+16% YoY). Statutory total PAT is lower due to treasury book mark-to-market losses."
      },
      pat: {
        fy25: "₹2,493.95",
        fy26: "₹2,043.42",
        fy25Val: 2493.95,
        fy26Val: 2043.42,
        unit: "₹ Cr",
        notes: "Statutory profit down 18% on treasury MTM. Core Operating PAT was record ₹2,360 Cr (+16% YoY)."
      },
      brokerage_yield: {
        fy25: "Relationship-Tiered",
        fy26: "Relationship-Tiered",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "High-touch relationship pricing."
      },
      turnover_cash: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Driven by high-net-worth delivery."
      },
      turnover_derivatives: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "9.2% ADTO Market Share across segments."
      },
      market_share_cash: {
        fy25: "~4.1%",
        fy26: "~4.3%",
        fy25Val: 4.10,
        fy26Val: 4.30,
        unit: "%",
        notes: "Stable HNI delivery client base."
      },
      market_share_derivatives: {
        fy25: "~1.90%",
        fy26: "~1.85%",
        fy25Val: 1.90,
        fy26Val: 1.85,
        unit: "%",
        notes: "Focused on premium yield over volume."
      },
      mtf_portfolio: {
        fy25: "₹4,616.0",
        fy26: "₹6,094.0",
        fy25Val: 4616,
        fy26Val: 6094,
        unit: "₹ Cr",
        notes: "Total operating loan book up 32% YoY."
      },
      t5_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Combined with MTF receivables."
      },
      esop_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Managed via Motilal Oswal Finvest."
      },
      networth: {
        fy25: "₹11,079.0",
        fy26: "₹12,888.0",
        fy25Val: 11079.0,
        fy26Val: 12888,
        unit: "₹ Cr",
        notes: "Strong consolidated equity reserves; net worth +16% YoY to ₹12,888 Cr."
      },
      borrowing: {
        fy25: "₹14,732.0",
        fy26: "₹21,255.0",
        fy25Val: 14732,
        fy26Val: 21255,
        unit: "₹ Cr",
        notes: "Used to scale the lending and treasury books."
      },
      cost_of_borrowing: {
        fy25: "8.20%",
        fy26: "8.65%",
        fy25Val: 8.20,
        fy26Val: 8.65,
        unit: "%",
        notes: "Cost of funds rose on rate adjustments."
      },
      total_clients: {
        fy25: "~1.28 Cr",
        fy26: "1.55 Cr",
        fy25Val: 1.28,
        fy26Val: 1.55,
        unit: "₹ Cr",
        notes: "Total clients ~15.5 Mn (+21% YoY); scaled through acquisitions and digital sign-ups."
      },
      active_clients: {
        fy25: "~5.1 Lakh",
        fy26: "~6.2 Lakh",
        fy25Val: 5.10,
        fy26Val: 6.20,
        unit: "Lakh",
        notes: "Stable, active retail/HNI base."
      },
      new_customers: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Multi-channel physical and digital sourcing."
      },
      cac: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Tied to recurring partner payouts."
      },
      revenue_per_new: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Yields high revenue due to advisory and AUM fees."
      },
      key_business_drivers: {
        fy25: "Private Wealth, AMC PAT",
        fy26: "Private Wealth, AMC PAT",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "AMC PAT rose 55% to ₹798 Cr; Wealth AUM at ₹1.97 Lakh Cr."
      }
    }
  },
  {
    id: "hdfc_sec",
    name: "HDFC Securities",
    fullName: "HDFC Securities Limited",
    type: "Traditional Advisory",
    background: "HDFC Securities operates a bank-backed broker model. It focuses on converting bank savers into capital market investors using pre-integrated 3-in-1 demat accounts, while utilizing HDFC Sky to defend its market share.",
    logoColor: "from-blue-600 to-blue-800",
    accentColor: "#1d4ed8",
    kpis: {
      broking_income: {
        fy25: "~₹2,210.0",
        fy26: "~₹1,900.0",
        fy25Val: 2210,
        fy26Val: 1900,
        unit: "₹ Cr",
        notes: "Impacted by retail trading slowdown."
      },
      distribution_income: {
        fy25: "~₹410.0",
        fy26: "~₹520.0",
        fy25Val: 410,
        fy26Val: 520,
        unit: "₹ Cr",
        notes: "Third-party insurance and mutual fund sales."
      },
      mtf_income: {
        fy25: "~₹640.0",
        fy26: "~₹1,138.0",
        fy25Val: 640,
        fy26Val: 1138,
        unit: "₹ Cr",
        notes: "Scaled margin funding to support margins."
      },
      total_income: {
        fy25: "₹3,264.86",
        fy26: "₹3,110.22",
        fy25Val: 3264.86,
        fy26Val: 3110.22,
        unit: "₹ Cr",
        notes: "FY25 reported ₹3,264.9 Cr. FY26 reported ₹3,110.22 Cr (consolidated results)."
      },
      franchisee_expense: {
        fy25: "Low reliance",
        fy26: "Low reliance",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Low franchisee reliance; uses HDFC Bank branches."
      },
      employee_cost: {
        fy25: "~₹480.0",
        fy26: "NSD",
        fy25Val: 480,
        fy26Val: null,
        unit: "₹ Cr",
        notes: "Elevated by hiring for the HDFC Sky platform."
      },
      it_expense: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Spiked significantly on HDFC Sky tech rollout."
      },
      marketing_expense: {
        fy25: "~₹150.0",
        fy26: "~₹240.0",
        fy25Val: 150,
        fy26Val: 240,
        unit: "₹ Cr",
        notes: "Marketing increased to support digital growth."
      },
      total_expense: {
        fy25: "₹1,768.71",
        fy26: "₹1,394.02",
        fy25Val: 1768.71,
        fy26Val: 1394.02,
        unit: "₹ Cr",
        notes: "FY25 reported ₹1,768.7 Cr. FY26 reported ₹1,394.02 Cr (consolidated expenses)."
      },
      pbt: {
        fy25: "₹1,496.2",
        fy26: "₹1,716.20",
        fy25Val: 1496.15,
        fy26Val: 1716.20,
        unit: "₹ Cr",
        notes: "FY25 reported ₹1,496.2 Cr. FY26 reported Profit Before Tax of ₹1,716.20 Cr."
      },
      pat: {
        fy25: "₹1,125.0",
        fy26: "₹888.03",
        fy25Val: 1125,
        fy26Val: 888.03,
        unit: "₹ Cr",
        notes: "FY25 reported ₹1,125.0 Cr. FY26 reported Net Profit of ₹888.03 Cr (down 21% YoY)."
      },
      brokerage_yield: {
        fy25: "Standard (HDFC Sky is Flat ₹20)",
        fy26: "Standard (HDFC Sky is Flat ₹20)",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Structured pricing; flat rate used on HDFC Sky."
      },
      turnover_cash: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Supported by stable, high-value bank accounts."
      },
      turnover_derivatives: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Low speculative derivative presence."
      },
      market_share_cash: {
        fy25: "~3.8%",
        fy26: "~3.5%",
        fy25Val: 3.80,
        fy26Val: 3.50,
        unit: "%",
        notes: "Retained market share among bank-backed brokers."
      },
      market_share_derivatives: {
        fy25: "<1.0%",
        fy26: "<1.0%",
        fy25Val: 1,
        fy26Val: 1,
        unit: "%",
        notes: "Low penetration in high-frequency F&O."
      },
      mtf_portfolio: {
        fy25: "~₹1,800.0",
        fy26: "~₹2,200.0",
        fy25Val: 1800,
        fy26Val: 2200,
        unit: "₹ Cr",
        notes: "Leveraged parent bank cash for client funding."
      },
      t5_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Combined with standard client accounts."
      },
      esop_portfolio: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Handled through the parent bank."
      },
      networth: {
        fy25: "₹3,348.6",
        fy26: "~₹3,650.0",
        fy25Val: 3348.59,
        fy26Val: 3650.00,
        unit: "₹ Cr",
        notes: "FY25 reported ₹3,348.6 Cr; ₹3,569.1 Cr at Dec-25 (Q3FY26). FY26 estimated."
      },
      borrowing: {
        fy25: "₹7,943.77",
        fy26: "~₹3,900.0",
        fy25Val: 7943.77,
        fy26Val: 3900,
        unit: "₹ Cr",
        notes: "Uses parent bank credit facilities."
      },
      cost_of_borrowing: {
        fy25: "7.25%",
        fy26: "7.80%",
        fy25Val: 7.25,
        fy26Val: 7.80,
        unit: "%",
        notes: "Enjoys the lowest cost of funds in the industry."
      },
      total_clients: {
        fy25: "~58.0 Lakh",
        fy26: "78.0 Lakh",
        fy25Val: 58,
        fy26Val: 78,
        unit: "Lakh",
        notes: "Serviced through 128 branches."
      },
      active_clients: {
        fy25: "~11.0 Lakh",
        fy26: "~9.2 Lakh",
        fy25Val: 11,
        fy26Val: 9.20,
        unit: "Lakh",
        notes: "Churn in active cash client base."
      },
      new_customers: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Sourced via parent bank account integrations."
      },
      cac: {
        fy25: "Sourced organically via Parent Bank",
        fy26: "Sourced organically via Parent Bank",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Highly optimized due to bank cross-selling."
      },
      revenue_per_new: {
        fy25: "NSD",
        fy26: "NSD",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "High yield due to multi-product integration."
      },
      key_business_drivers: {
        fy25: "Parent Bank Base, HDFC Sky",
        fy26: "Parent Bank Base, HDFC Sky",
        fy25Val: null,
        fy26Val: null,
        unit: "text",
        notes: "Transitioning to low-fee digital models to protect client assets."
      }
    }
  },

  // ─── ICICI Securities ───────────────────────────────────────────────────────
  {
    id: "icici_securities",
    name: "ICICI Securities",
    fullName: "ICICI Securities Limited (ICICIdirect)",
    type: "Traditional Advisory",
    background: "India's largest full-service broker by active clients (20.45 lakh, 4.6% NSE share). Operates the iconic ICICIdirect.com platform and pioneered the 3-in-1 account (savings + trading + demat). A 100% subsidiary of ICICI Bank since delisting in March 2025. Generates revenue across retail broking, MTF funding, investment banking, MF distribution, and private wealth.",
    logoColor: "from-orange-500 to-red-600",
    accentColor: "#F77F00",
    kpis: {
      broking_income: {
        fy25: "₹2,080.55 Cr", fy26: "NSD",
        fy25Val: 2080.55, fy26Val: null,
        unit: "₹ Cr",
        notes: "Audited Standalone brokerage income. Source: ICICI Securities Annual Report."
      },
      distribution_income: {
        fy25: "₹1,609.07 Cr", fy26: "NSD",
        fy25Val: 1609.07, fy26Val: null,
        unit: "₹ Cr",
        notes: "Income from distribution services. Source: ICICI Securities Annual Report."
      },
      mtf_income: {
        fy25: "₹2,535.72 Cr", fy26: "₹2,718.19 Cr",
        fy25Val: 2535.72, fy26Val: 2718.19,
        unit: "₹ Cr",
        notes: "Interest income from loans and investments including MTF. Source: ICICI Securities Annual Report."
      },
      total_income: {
        fy25: "₹6,332 Cr", fy26: "₹5,890 Cr",
        fy25Val: 6332, fy26Val: 5890,
        unit: "₹ Cr",
        notes: "FY25 +25.4% YoY from ₹5,049 Cr. FY26 -6.98% YoY — impacted by SEBI F&O framework tightening (Oct 2024) and post-delisting revenue compression. Source: ISEC FY25 Audited Results; JM Financial data for FY26."
      },
      franchisee_expense: {
        fy25: "₹216.51 Cr", fy26: "₹115.93 Cr",
        fy25Val: 216.51, fy26Val: 115.93,
        unit: "₹ Cr",
        notes: "Fees and commission expenses paid to business partners. Source: ICICI Securities Annual Report."
      },
      employee_cost: {
        fy25: "₹1,012.31 Cr", fy26: "₹1,078.17 Cr",
        fy25Val: 1012.31, fy26Val: 1078.17,
        unit: "₹ Cr",
        notes: "Standalone employee benefits expense. Source: ICICI Securities Annual Report."
      },
      it_expense: {
        fy25: "₹167.37 Cr", fy26: "₹170.15 Cr",
        fy25Val: 167.37, fy26Val: 170.15,
        unit: "₹ Cr",
        notes: "Consolidated repairs, tech upkeep, and data opex. Source: ICICI Securities Annual Report."
      },
      marketing_expense: {
        fy25: "₹53.76 Cr", fy26: "₹19.80 Cr",
        fy25Val: 53.76, fy26Val: 19.80,
        unit: "₹ Cr",
        notes: "Advertisement and publicity expense. Source: ICICI Securities Annual Report."
      },
      total_expense: {
        fy25: "₹3,731 Cr", fy26: "NSD",
        fy25Val: 3731, fy26Val: null,
        unit: "₹ Cr",
        notes: "FY25 confirmed: ₹37,312.7 million = ₹3,731 Cr. Includes finance costs (₹1,699 Cr), depreciation (₹157 Cr), employee benefits, and operating expenses. FY26 detailed expense breakdown pending Annual Report 2025-26. Source: ISEC FY25 Audited P&L."
      },
      pbt: {
        fy25: "₹2,605.26 Cr", fy26: "₹2,297.38 Cr",
        fy25Val: 2605.26, fy26Val: 2297.38,
        unit: "₹ Cr",
        notes: "Consolidated Profit Before Tax. Source: ICICI Securities Annual Report."
      },
      pat: {
        fy25: "₹1,942 Cr", fy26: "₹1,713 Cr",
        fy25Val: 1942, fy26Val: 1713,
        unit: "₹ Cr",
        notes: "FY25 +14.4% YoY from ₹1,697 Cr (FY24). FY26 -11.8% YoY — SEBI F&O volume restrictions + post-delisting disclosure reduction. Q4 FY26 PAT ₹422 Cr (+10.9% YoY) signals recovery in exit quarter. Source: ISEC FY25 Audited; JM Financial / ICICI Bank IR for FY26."
      },
      brokerage_yield: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "bps",
        notes: "Multi-plan pricing: Prime Plan ~0.07% (7 bps) cash; iValue ₹20/order flat. Blended yield across plans not published. ISEC does not disclose a single aggregated yield figure. Source: ISEC pricing page, Q1 FY25 Performance Update."
      },
      turnover_cash: {
        fy25: "~₹9.0 Tn", fy26: "NSD",
        fy25Val: 9.0, fy26Val: null,
        unit: "₹ Tn",
        notes: "FY25 cash ADTO = ₹3,599 Cr/day (+36% YoY) × ~250 trading days ≈ ₹9.0 Tn annual. FY26 annual equivalent not publicly disclosed post-delisting. Source: ISEC FY25 Annual Report / Investor Update."
      },
      turnover_derivatives: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Tn",
        notes: "Retail derivative turnover not disclosed as a standalone absolute figure. Significant headwind in H2 FY25 from SEBI F&O tightening (Oct 2024). Historical retail derivative market share ~7.8% (FY24). Source: ISEC Annual Report."
      },
      market_share_cash: {
        fy25: "~8.1%", fy26: "NSD",
        fy25Val: 8.1, fy26Val: null,
        unit: "%",
        notes: "FY25 overall retail equity market share ~8.1% (+30 bps YoY). Cross-segment metric; NSE turnover-based. FY26 post-delisting, granular market share not published in public summaries. Source: ISEC FY25 Investor Updates."
      },
      market_share_derivatives: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "%",
        notes: "Retail derivative share ~7.8% historically (FY24). FY25 active client NSE share = 3.96%. Post-SEBI F&O restrictions, derivative share likely compressed in H2 FY25 and FY26. Not separately reported. Source: NSE data, ISEC Investor Updates."
      },
      mtf_portfolio: {
        fy25: "~₹13,980 Cr (avg Q1)", fy26: "NSD",
        fy25Val: 13980, fy26Val: null,
        unit: "₹ Cr",
        notes: "Average MTF book Q1 FY25 = ₹13,980 Cr (+131% YoY). ISEC held ~20% MTF market share in FY25. FY26 MTF market share moderated to ~17%. Full-year average book and year-end balance not publicly disclosed. Source: ISEC Q1 FY25 Performance Update, ICRA."
      },
      t5_portfolio: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "Not a standard publicly reported classification in ICICI Securities' filings. Short-term settlement receivables included within the broader funding/lending book alongside MTF. Source: ISEC Annual Report."
      },
      esop_portfolio: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "ESOP financing and Loan Against Securities included in broader secured lending book; not separately broken out in public summaries. Source: ISEC Annual Report 2024-25."
      },
      networth: {
        fy25: "~₹5,389 Cr", fy26: "₹6,253 Cr",
        fy25Val: 5389, fy26Val: 6253,
        unit: "₹ Cr",
        notes: "FY25 shareholders' equity ~₹5,389 Cr. FY26 consolidated net worth standing at ₹6,252.82 Cr. Source: Trendlyne, IndiaInfoline balance sheet filings."
      },
      borrowing: {
        fy25: "~₹21,083 Cr", fy26: "₹25,258 Cr",
        fy25Val: 21083, fy26Val: 25258,
        unit: "₹ Cr",
        notes: "Primarily short-term commercial paper (CP) to fund the large MTF book. Rated CRISIL A1+ / ICRA A1+. FY26 borrowings rose to ₹25,258.17 Cr. Source: IndiaInfoline."
      },
      cost_of_borrowing: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "%",
        notes: "Not disclosed publicly. ICICI Bank parentage enables competitive CP rates vs peers (est. ~7.5–9% p.a.). Finance costs FY25 = ₹1,699 Cr (72.1% YoY growth reflects MTF book scale). MTF client rates: 9.85%–17.99% p.a. Source: ISEC FY25 Audited P&L, ICRA."
      },
      total_clients: {
        fy25: "~95 lakh", fy26: "NSD",
        fy25Val: 9500000, fy26Val: null,
        unit: "Accounts",
        notes: "~95 lakh registered clients referenced for H1 FY25. These are cumulative registered/demat accounts, not active traders. FY26 total client count not disclosed post-delisting. Source: ISEC H1 FY25 Communications."
      },
      active_clients: {
        fy25: "19.47 lakh", fy26: "20.45 lakh",
        fy25Val: 1947000, fy26Val: 2045000,
        unit: "Clients",
        notes: "FY25: 19,46,882 NSE active clients (3.96% market share). FY26: 20,45,086 (+5.04% YoY, 4.60% NSE share) — largest active client base among all listed/delisted full-service brokers. Source: InvestorGain / NSE Active Client Data."
      },
      new_customers: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "Accounts",
        notes: "Q3 FY25 reported 'six-quarter high' in new customer additions. Exact annual figures not published in standard summaries. Net active client addition FY25 ≈ ~76,000. ICICI Bank ecosystem (3-in-1 account) is primary acquisition channel. Source: ISEC Q3 FY25 Update."
      },
      cac: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹",
        notes: "Not disclosed. ICICI Bank's 3-in-1 account structure structurally lowers CAC vs pure-play digital brokers — bank savings account activation triggers trading account. Exact CAC proprietary. Source: ISEC Annual Report, ICICI Bank disclosures."
      },
      revenue_per_new_customer: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹",
        notes: "Not separately disclosed. Implied revenue per active client FY25: ₹6,332 Cr / 19.47 lakh ≈ ₹3,252/active client/year — among the highest in the sector. Source: Derived from ISEC FY25 total income and NSE active client data."
      }
    }
  },

  // ─── Kotak Securities ───────────────────────────────────────────────────────
  {
    id: "kotak_securities",
    name: "Kotak Securities",
    fullName: "Kotak Securities Limited (Kotak Neo)",
    type: "Traditional Advisory",
    background: "One of India's oldest full-service broking houses, incorporated 1994 as a 100% subsidiary of Kotak Mahindra Bank. Operates Kotak Neo (flat ₹10/order digital), full-service PCG (Private Client Group), and institutional equities. Largest networth (₹10,009 Cr) among domestic brokers. Benefits from strong bank parentage, competitive MTF borrowing costs, and a 988-strong franchisee network.",
    logoColor: "from-red-600 to-rose-800",
    accentColor: "#E31837",
    kpis: {
      broking_income: {
        fy25: "₹2,440.94 Cr", fy26: "₹2,402.84 Cr",
        fy25Val: 2440.94, fy26Val: 2402.84,
        unit: "₹ Cr",
        notes: "Income from brokerage and commissions. FY26 is standalone from CRISIL rationale. Source: Standalone Financial Statements, CRISIL."
      },
      distribution_income: {
        fy25: "₹197.14 Cr", fy26: "₹163.83 Cr",
        fy25Val: 197.14, fy26Val: 163.83,
        unit: "₹ Cr",
        notes: "Fees income from distribution services. FY26 is standalone from CRISIL rationale. Source: Standalone Financial Statements, CRISIL."
      },
      mtf_income: {
        fy25: "₹1,089.00 Cr", fy26: "₹1,415.00 Cr",
        fy25Val: 1089.0, fy26Val: 1415.0,
        unit: "₹ Cr",
        notes: "Interest income generated from margin trade funding. Source: CRISIL / ICRA Ratings rationale."
      },
      total_income: {
        fy25: "₹5,120 Cr", fy26: "₹5,705 Cr",
        fy25Val: 5120, fy26Val: 5705,
        unit: "₹ Cr",
        notes: "FY25: ₹5,120.23 Cr (audited). FY26: ₹5,705 Cr (+11.4% YoY). FY26 PAT flat despite revenue growth suggests cost base expansion. Source: KMB Annual Report 2024-25 (Subsidiary AOC-1); KMB Q4 FY26 Investor Presentation."
      },
      franchisee_expense: {
        fy25: "₹595 Cr", fy26: "NSD",
        fy25Val: 595, fy26Val: null,
        unit: "₹ Cr",
        notes: "FY25: ₹594.67 Cr (₹59,466.62 lakh) — 'Referral fees and Sub-brokerage Expense' per Note to Standalone Financial Statements. 988 sub-brokers/franchisees as of Mar 2025. FY26 not available in public disclosures. Source: Kotak Securities Standalone Financials FY25, Note to Accounts."
      },
      employee_cost: {
        fy25: "₹822.86 Cr", fy26: "NSD",
        fy25Val: 822.86, fy26Val: null,
        unit: "₹ Cr",
        notes: "Employee benefit expense includes salaries and opex. Source: Note 31, Standalone Financial Statements."
      },
      it_expense: {
        fy25: "₹19.24 Cr", fy26: "NSD",
        fy25Val: 19.24, fy26Val: null,
        unit: "₹ Cr",
        notes: "Includes standalone opex for software and data processing. Source: Standalone Financial Statements."
      },
      marketing_expense: {
        fy25: "₹1.35 Cr", fy26: "NSD",
        fy25Val: 1.35, fy26Val: null,
        unit: "₹ Cr",
        notes: "Business promotion opex. Source: Standalone Financial Statements."
      },
      total_expense: {
        fy25: "~₹2,951 Cr", fy26: "NSD",
        fy25Val: 2951, fy26Val: null,
        unit: "₹ Cr",
        notes: "FY25 derived: Total Income ₹5,120 Cr − PBT ₹2,169 Cr = Total Expenses ~₹2,951 Cr. Not directly stated as a line item in public summaries. FY26 total expense not available. Source: KMB Annual Report 2024-25 (derived)."
      },
      pbt: {
        fy25: "₹2,169 Cr", fy26: "NSD",
        fy25Val: 2169, fy26Val: null,
        unit: "₹ Cr",
        notes: "FY25: ₹2,169.31 Cr (highest-ever PBT for Kotak Securities). FY24: ₹1,738 Cr (+24.8% YoY). FY26 standalone PBT not yet published (FY26 Annual Report pending). Source: KMB Annual Report 2024-25, AOC-1 / Subsidiary Section."
      },
      pat: {
        fy25: "₹1,638 Cr", fy26: "₹1,642 Cr",
        fy25Val: 1638, fy26Val: 1642,
        unit: "₹ Cr",
        notes: "FY25: ₹1,637.78 Cr (highest-ever PAT). FY26: ₹1,642 Cr (flat YoY, +0.2%). Revenue grew +11.4% but cost expansion offset gains. Q4 FY26 PAT ₹400 Cr (+15% YoY, -7% QoQ). Source: KMB Annual Report 2024-25; KMB Q4 FY26 Investor Presentation."
      },
      brokerage_yield: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "bps",
        notes: "Multi-plan structure: ₹10/order flat (Kotak Neo/Trade Free digital), ₹20/order premium, 0.20% delivery / 0.02% intraday for dealer plans. Blended yield not published. Cost-to-income ~47% (FY25) implies strong per-trade economics. Source: Kotak Securities pricing page."
      },
      turnover_cash: {
        fy25: "~₹14.3 Tn", fy26: "~₹17.8 Tn",
        fy25Val: 14.3, fy26Val: 17.8,
        unit: "₹ Tn",
        notes: "FY25: Cash ADTO Q4 FY25 = ₹5,698 Cr/day × ~250 trading days ≈ ₹14.3 Tn annual. FY26: Cash ADV FY26 avg = ₹7,118 Cr/day × ~250 trading days ≈ ₹17.8 Tn (Q4 FY26 = ₹7,636 Cr/day). Source: KMB Q4 FY25 & Q4 FY26 Investor Presentations."
      },
      turnover_derivatives: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Tn",
        notes: "Derivatives ADTO in absolute terms not disclosed by the company; only market share figures are published. Source: KMB Q4 FY25 & FY26 Investor Presentations."
      },
      market_share_cash: {
        fy25: "8.8%", fy26: "9.9%",
        fy25Val: 8.8, fy26Val: 9.9,
        unit: "%",
        notes: "FY25: 8.8% (Q4 FY25). FY26: 9.9% avg (Q4 FY26: 9.8%). Expanding cash market share reflects Kotak Neo digital growth and shift from F&O to delivery-based trading. Source: KMB Q4 FY25 & Q4 FY26 Investor Presentations."
      },
      market_share_derivatives: {
        fy25: "12.9%", fy26: "15.3%",
        fy25Val: 12.9, fy26Val: 15.3,
        unit: "%",
        notes: "FY25: 12.86% annual average. FY26: 15.3% (Q4 FY26), avg ~15.0%. Strong institutional + retail derivative franchise. Blended overall market share Q4 FY26: 13.5% (excl. proprietary). Source: KMB Q4 FY25 & Q4 FY26 Investor Presentations."
      },
      mtf_portfolio: {
        fy25: "₹13,073 Cr", fy26: "~₹15,000 Cr",
        fy25Val: 13073, fy26Val: 15000,
        unit: "₹ Cr",
        notes: "FY25 outstanding: ₹13,072.98 Cr (net of ECL provision). FY26 MTF market share is ~14% of the industry book, representing an estimated ~₹14,700–15,800 Cr. Source: Kotak Securities Standalone Balance Sheet FY25; KMB Q4 FY26 Investor Presentation."
      },
      t5_portfolio: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "Term 'T5 portfolio' not used in Kotak Securities' public disclosures. Short-term settlement receivables are internal classifications not separately reported. Source: Kotak Securities Annual Report."
      },
      esop_portfolio: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "ESOP expense (issuer side) ₹46.4 Cr included in employee cost (FY25). LAS as a loan product falls under Kotak Mahindra Bank's retail lending balance sheet, not Kotak Securities. Not separately disclosed as a funded book. Source: Note 31, Kotak Securities Standalone Financials FY25."
      },
      networth: {
        fy25: "₹10,009 Cr", fy26: "₹11,613 Cr",
        fy25Val: 10009, fy26Val: 11613,
        unit: "₹ Cr",
        notes: "FY25: ₹10,008.68 Cr total equity. FY26 standalone networth ended at ₹11,612.77 Cr. Source: Kotak Securities Standalone Balance Sheet FY25; NSDL database disclosures."
      },
      borrowing: {
        fy25: "₹7,179.89 Cr", fy26: "₹15,098.20 Cr",
        fy25Val: 7179.89, fy26Val: 15098.20,
        unit: "₹ Cr",
        notes: "Standalone total debt. FY26 based on 1.3x standalone gearing and ₹11,614 Cr net worth. Source: Standalone Balance Sheet, CRISIL."
      },
      cost_of_borrowing: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "%",
        notes: "Not disclosed publicly. Kotak Mahindra Bank parentage enables competitive CP rates. AAA/A1+ ratings support low borrowing costs. Commercial paper market rates ~7.5–8.5% for AAA NBFCs in FY25. Exact CoF proprietary. Source: ICRA Rating Report, KMB Disclosures."
      },
      total_clients: {
        fy25: "~57.15 lakh", fy26: "~60.00 lakh",
        fy25Val: 5715000, fy26Val: 6000000,
        unit: "Accounts",
        notes: "Cumulative registered client base (broader than active traders). Ended FY25 at ~57.15 lakh, and crossed 60 lakh by September 2025. Source: Kotak Securities press releases (kotakneo.com)."
      },
      active_clients: {
        fy25: "14.62 lakh", fy26: "13.69 lakh",
        fy25Val: 1462000, fy26Val: 1369000,
        unit: "Clients",
        notes: "FY25: 14,62,281 NSE active clients (2.99% market share). FY26: 13,68,501 (-7.79% YoY) but NSE market share rose to 3.08% due to overall market active client decline. Source: InvestorGain / NSE Active Client Data."
      },
      new_customers: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "Accounts",
        notes: "Not publicly disclosed by Kotak Securities. Kotak Neo platform drives digital onboarding; app crossed 10 million downloads (FY26). 44% YoY growth in app-based trading volumes in FY25. Source: KMB Q4 FY26 Investor Presentation."
      },
      cac: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹",
        notes: "Not disclosed. Full-service brokers typically have higher CAC than discount brokers (₹1,000–3,000+/account). Kotak Neo model has structurally lower CAC than traditional full-service channels. Kotak Mahindra Bank branch network provides low-cost referral pipeline. Source: KMB Annual Report, industry estimates."
      },
      revenue_per_new_customer: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹",
        notes: "Not disclosed. Implied revenue per active client FY25: ₹5,120 Cr / 14.62 lakh ≈ ₹3,502/active client/year — highest in peer set due to full-service model with PCG/wealth management premiums. Source: Derived from KMB Annual Report and NSE active client data."
      }
    }
  },
  // ─── Way2Wealth Securities ──────────────────────────────────────────────────
  {
    id: "way2wealth",
    name: "Way2Wealth",
    fullName: "Way2Wealth Brokers Private Limited",
    type: "Traditional Advisory",
    background: "Originally established in 2000 as part of Coffee Day Group and subsequently acquired by Shriram Credit Company Limited in 2020. Way2Wealth functions as a wealth management and traditional brokerage advisory network. Offers investment distribution across mutual funds, insurance schemes, portfolio management systems, and specialized Margin Trading Facilities (MTF). It leverages Shriram Group's cross-synergy opportunities.",
    logoColor: "from-blue-600 to-green-600",
    accentColor: "#0056b3",
    kpis: {
      broking_income: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "Individual broking stream bundled in operations. In FY25, broking and third-party distribution fees together accounted for 75.49% of total income. Source: CARE Ratings."
      },
      distribution_income: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "Third-party distribution fees for mutual funds, insurance, and financial products are combined with broking revenues. Source: CARE Ratings."
      },
      mtf_income: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "MTF interest income is not separately broken out. Book size remains modest at ₹1 Cr. Source: CARE Ratings."
      },
      total_income: {
        fy25: "₹86.02 Cr", fy26: "NSD",
        fy25Val: 86.02, fy26Val: null,
        unit: "₹ Cr",
        notes: "FY25 standalone operating revenue audited at ₹86.02 Cr. H1FY26 standalone revenue recorded at ₹33.37 Cr. Source: CARE Ratings (Feb 2026)."
      },
      franchisee_expense: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "Commission structure paid to partner networks and sub-broker desks is grouped under operating expenses. Source: CARE Ratings."
      },
      employee_cost: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "Staff strength stood at ~270 employees as of Feb 2025. Total payroll expenses are grouped in general statements. Source: CARE Ratings."
      },
      it_expense: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "Core tech, connectivity, and transactional processing engine costs are grouped within other expenses. Source: CARE Ratings."
      },
      marketing_expense: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "Offline network marketing and client-relationship activities are aggregated within operating overheads. Source: CARE Ratings."
      },
      total_expense: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "Aggregated operating costs not separately structured in short credit reviews. Source: CARE Ratings."
      },
      pbt: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "Pre-tax profits are grouped in internal statutory filings. Source: CARE Ratings."
      },
      pat: {
        fy25: "₹4.52 Cr", fy26: "NSD",
        fy25Val: 4.52, fy26Val: null,
        unit: "₹ Cr",
        notes: "FY25 standalone net profit was ₹4.52 Cr (improving on RoNW to 9.63%). H1FY26 standalone PAT was ₹0.44 Cr. Source: CARE Ratings (Feb 2026)."
      },
      brokerage_yield: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "bps",
        notes: "Yield figures not declared. Traditional advisory broker charging per-transaction commission rates. Source: Way2Wealth tariff book."
      },
      turnover_cash: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Tn",
        notes: "Trading volume figures not publicly declared. Cash market share in H1FY26 stood at ~0.16% (combined with SISBL). Source: CARE Ratings."
      },
      turnover_derivatives: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Tn",
        notes: "Derivative turnover volumes not declared in public disclosures. Source: CARE Ratings."
      },
      market_share_cash: {
        fy25: "NSD", fy26: "~0.16%",
        fy25Val: null, fy26Val: 0.16,
        unit: "%",
        notes: "Shriram Group brokerage arm cash market share (consolidated with SISBL) in H1FY26. Source: CARE Ratings."
      },
      market_share_derivatives: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "%",
        notes: "Derivative market share segment not disclosed. Source: CARE Ratings."
      },
      mtf_portfolio: {
        fy25: "NSD", fy26: "₹1.00 Cr",
        fy25Val: null, fy26Val: 1.0,
        unit: "₹ Cr",
        notes: "MTF outstanding book recorded at ₹1.00 Cr as of Nov 30, 2025. Source: CARE Ratings (Feb 2026)."
      },
      t5_portfolio: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "T5 short-term margin funding book is not separately disclosed. Source: CARE Ratings."
      },
      esop_portfolio: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹ Cr",
        notes: "ESOP funding loans are not separately structured. Source: CARE Ratings."
      },
      networth: {
        fy25: "₹49.00 Cr", fy26: "₹53.00 Cr",
        fy25Val: 49.0, fy26Val: 53.0,
        unit: "₹ Cr",
        notes: "FY25 net worth was ₹49.00 Cr as of March 31, 2025. Ended H1FY26 at ₹53.00 Cr as of September 30, 2025. Source: CARE Ratings (Feb 2026)."
      },
      borrowing: {
        fy25: "₹33.00 Cr", fy26: "₹34.00 Cr",
        fy25Val: 33.0, fy26Val: 34.0,
        unit: "₹ Cr",
        notes: "FY25 total borrowings stood at ₹33.00 Cr. Recorded at ₹34.00 Cr as of September 30, 2025. Source: CARE Ratings (Feb 2026)."
      },
      cost_of_borrowing: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "%",
        notes: "Weighted cost of debt lines not disclosed. Source: CARE Ratings."
      },
      total_clients: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "Accounts",
        notes: "Demat accounts and client registrations are not disclosed in CARE reports."
      },
      active_clients: {
        fy25: "0.24 lakh", fy26: "0.23 lakh",
        fy25Val: 24400, fy26Val: 23016,
        unit: "Clients",
        notes: "FY25 active traders on NSE stood at ~24,400. Ended FY26 at 23,016 active accounts. Source: Chittorgarh (NSE exchange data)."
      },
      new_customers: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "Accounts",
        notes: "Incremental new client additions not disclosed."
      },
      cac: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹",
        notes: "Client acquisition spends are not broken out. Advisory model leverages relationship managers and franchisee offices. Source: CARE Ratings."
      },
      revenue_per_new_customer: {
        fy25: "NSD", fy26: "NSD",
        fy25Val: null, fy26Val: null,
        unit: "₹",
        notes: "Not reported. Implied revenue per active client in FY25: ₹86.02 Cr / 24,400 active accounts ≈ ₹35,254 per active account annually. Source: Derived."
      }
    }
  }];

export const MISSING_DISCLOSURES_EXPLANATIONS = {
  whyT5ESOP_NSD: {
    title: "Why 'T5' and 'ESOP' portfolios are designated as NSD",
    explanation: "In Indian capital market reporting, brokers aggregate margin client receivables on their balance sheets. Only specialized NBFC finance arms (such as 360 ONE Prime or IIFL Wealth Finance) separately segregate 'ESOP funding' or 'T5 short-term margin' as distinct, stand-alone ledger items. Standard retail brokerages (like Angel One, Groww, and Anand Rathi) pool these items inside their broader MTF (Margin Trading Facility) ledger to simplify compliance and regulatory filings."
  },
  cacVariance: {
    title: "The Customer Acquisition Cost (CAC) and Revenue per Customer Variance",
    explanation: [
      {
        type: "Digital Discount Brokers (Groww, Angel One)",
        detail: "These fast-growing fintechs track CAC directly because they employ intensive online programmatic advertising (e.g., Google/Meta ads, social media influencers, cricket tournament sponsorships) to drive retail trading traffic. They calculate CAC as Total Performance Marketing spends divided by Total New Accounts Opened. Management frequently treats exact CAC numbers as proprietary competitive secrets but notes operational cost increases during periods of intense ad congestion (like IPL series or market peaks)."
      },
      {
        type: "Traditional Wealth Brokers (IIFL, Anand Rathi, Geojit)",
        detail: "These companies depend on franchised networks, sub-brokers (Authorised Persons), institutional research desks, and dedicated relationship managers. Since their client onboarding relies heavily on revenue-share commissions, partner splits, and localized personnel rather than direct performance-based online marketing bills, a standalone calculated digital 'CAC' parameter is not applicable or comparable to the models of discount portals."
      }
    ]
  },
  businessModels: {
    title: "Structural Divergence: Discount Brokers vs. Traditional Advisory Elite",
    explanation: "There is an active structural wedge playing out in the Indian stock-broking environment. Discount brokers (Groww, Angel One) leverage highly automated cloud infrastructure to handle hundreds of millions of low-fee transactions. They generate major revenue volumes from speculative retail F&O premium sweeps, making them highly sensitive to regulatory pricing controls (like NSE's 'true-to-label' flat exchange payout policies in FY26 which compressed Angel One's profits). On the other hand, Traditional Advisory Elite brokers (IIFL Capital, Anand Rathi, Geojit) operate relationship desks geared toward physical HNIs. Rather than transactional retail velocity, they target asset distribution under management (AUM), mutual fund SIP backlogs, primary market investment banking syndication, and high-quality MTF credit lending, which provide stable, regulatory-insulated profitability margins (like Anand Rathi growing Net Profit by 24.8% in FY26 despite retail headwinds)."
  }
};

