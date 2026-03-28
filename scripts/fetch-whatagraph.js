#!/usr/bin/env node
/**
 * Fetch Whatagraph report data for Real Dough Pizza Co.
 * Downloads the Excel export and parses it to JSON.
 * 
 * Usage: node scripts/fetch-whatagraph.js
 * 
 * Requires: xlsx npm package (already installed)
 * Method: Uses browser automation to download the .xlsx from the shared report
 * 
 * Note: For the automated agent flow, we expect the xlsx to already be 
 * downloaded to ~/Downloads/real-dough-pizza-co.xlsx by a browser agent.
 * This script handles the parse step.
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const REPORT_URL = 'https://reports.live/shared/VgRD05mQe0Y5raN7#tab:1011083';
const XLSX_PATH = path.join(process.env.HOME || '~', 'Downloads', 'real-dough-pizza-co.xlsx');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'whatagraph-data.json');

function parseXlsx(xlsxPath) {
  if (!fs.existsSync(xlsxPath)) {
    console.error(`Excel file not found at: ${xlsxPath}`);
    console.error(`\nTo get the file:`);
    console.error(`1. Open ${REPORT_URL}`);
    console.error(`2. Click "Download" -> "Microsoft Excel (.xlsx)"`);
    console.error(`3. File saves to ~/Downloads/real-dough-pizza-co.xlsx`);
    process.exit(1);
  }

  console.log(`Reading: ${xlsxPath}`);
  const wb = XLSX.readFile(xlsxPath);
  console.log(`Found ${wb.SheetNames.length} sheets`);

  const allData = {};
  for (const name of wb.SheetNames) {
    const ws = wb.Sheets[name];
    allData[name] = XLSX.utils.sheet_to_json(ws, { header: 1 });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allData, null, 2));
  const size = fs.statSync(OUTPUT_PATH).size;
  console.log(`Written: ${OUTPUT_PATH} (${(size / 1024).toFixed(1)} KB)`);
  
  return allData;
}

// If run directly
if (require.main === module) {
  const customPath = process.argv[2];
  parseXlsx(customPath || XLSX_PATH);
}

module.exports = { parseXlsx, REPORT_URL };
