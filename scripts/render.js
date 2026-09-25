#!/usr/bin/env node
// Renders template.html into index.html by substituting {{FACT}}, {{SOURCE_URL}},
// {{SOURCE_LABEL}}, and {{DATE}}. template.html is never modified.
//
// Usage:
//   node scripts/render.js --fact "..." --url "https://..." --label "Source Name" [--date "2026-09-25"]
//
// Values may also be provided via env vars: FACT, SOURCE_URL, SOURCE_LABEL, DATE.

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      out[key] = argv[i + 1];
      i++;
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));

const fact = args.fact || process.env.FACT;
const sourceUrl = args.url || process.env.SOURCE_URL;
const sourceLabel = args.label || process.env.SOURCE_LABEL;
const date = args.date || process.env.DATE || new Date().toISOString().slice(0, 10);

if (!fact || !sourceUrl || !sourceLabel) {
  console.error("Missing required value(s). Need --fact, --url, and --label (or FACT/SOURCE_URL/SOURCE_LABEL env vars).");
  process.exit(1);
}

const templatePath = path.join(__dirname, "..", "template.html");
const outputPath = path.join(__dirname, "..", "index.html");

let html = fs.readFileSync(templatePath, "utf8");
html = html
  .replaceAll("{{FACT}}", fact)
  .replaceAll("{{SOURCE_URL}}", sourceUrl)
  .replaceAll("{{SOURCE_LABEL}}", sourceLabel)
  .replaceAll("{{DATE}}", date);

fs.writeFileSync(outputPath, html);
console.log(`Rendered index.html for ${date}`);
