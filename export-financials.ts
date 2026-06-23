import { BROKER_DATA, KPI_LIST } from "./src/data";
import * as fs from "fs";
import * as path from "path";

// 1. Export as JSON Database
const jsonPath = path.join(process.cwd(), "brokerage_financials.json");
fs.writeFileSync(
  jsonPath,
  JSON.stringify({ kpi_definitions: KPI_LIST, broker_financials: BROKER_DATA }, null, 2),
  "utf-8"
);
console.log("Exported JSON database successfully to: brokerage_financials.json");

// 2. Export as Wide Comparison CSV (Excel Column-wise layout)
let wideCsv = "KPI Parameter,Category";
BROKER_DATA.forEach((b) => {
  wideCsv += `,"${b.name} 2025","${b.name} 2026"`;
});
wideCsv += "\n";

KPI_LIST.forEach((kpi) => {
  let row = `"${kpi.label.replace(/"/g, '""')}","${kpi.category}"`;
  BROKER_DATA.forEach((b) => {
    const kpiVal = b.kpis[kpi.key];
    const fy25 = kpiVal ? kpiVal.fy25 : "";
    const fy26 = kpiVal ? kpiVal.fy26 : "";
    row += `,"${fy25.replace(/"/g, '""')}","${fy26.replace(/"/g, '""')}"`;
  });
  wideCsv += row + "\n";
});

const wideCsvPath = path.join(process.cwd(), "brokerage_financials_comparison.csv");
fs.writeFileSync(wideCsvPath, wideCsv, "utf-8");
console.log("Exported wide comparison CSV successfully to: brokerage_financials_comparison.csv");

// 3. Export as Tall Database CSV (BI / Database-friendly schema)
let tallCsv = "Company,Company Type,KPI Key,KPI Parameter,Category,2025 Value,2026 Value,Unit,Footnotes\n";
BROKER_DATA.forEach((b) => {
  KPI_LIST.forEach((kpi) => {
    const kpiVal = b.kpis[kpi.key];
    if (kpiVal) {
      const fy25 = kpiVal.fy25 || "";
      const fy26 = kpiVal.fy26 || "";
      const unit = kpiVal.unit || "";
      const notes = kpiVal.notes || "";
      tallCsv += `"${b.name}","${b.type}","${kpi.key}","${kpi.label.replace(/"/g, '""')}","${kpi.category}","${fy25.replace(/"/g, '""')}","${fy26.replace(/"/g, '""')}","${unit.replace(/"/g, '""')}","${notes.replace(/"/g, '""')}"\n`;
    }
  });
});

const tallCsvPath = path.join(process.cwd(), "brokerage_financials_database.csv");
fs.writeFileSync(tallCsvPath, tallCsv, "utf-8");
console.log("Exported tall database CSV successfully to: brokerage_financials_database.csv");
