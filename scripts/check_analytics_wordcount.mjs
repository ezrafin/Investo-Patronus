import fs from "node:fs";

const files = [
  "src/lib/api/analytics-christina.ts",
  "src/lib/api/analytics-assunta.ts",
  "src/lib/api/analytics-lysander.ts",
  "src/lib/api/analytics-elias.ts",
  "src/lib/api/analytics-anastasia.ts",
  "src/lib/api/analytics-luca.ts",
  "src/lib/api/analytics-isabelle.ts",
  "src/lib/api/analytics-xu.ts",
];

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function extractFirstArticleContent(fileText) {
  // Capture the FIRST `content: ` template literal up to the closing backtick that is followed by `date:`
  // Handles both \n and \r\n and variable indentation.
  const re = /content:\s*`([\s\S]*?)`\s*,\s*\r?\n\s*date:\s*/m;
  const match = fileText.match(re);
  return match?.[1] ?? null;
}

let ok = true;
for (const file of files) {
  const txt = fs.readFileSync(file, "utf8");
  const content = extractFirstArticleContent(txt);
  if (!content) {
    console.log(`${file}: ERROR could not extract first article content`);
    ok = false;
    continue;
  }
  const words = countWords(content);
  const status = words >= 1500 ? "OK" : "SHORT";
  if (words < 1500) ok = false;
  console.log(`${status}  ${words.toString().padStart(5)} words  ${file}`);
}

process.exit(ok ? 0 : 1);


