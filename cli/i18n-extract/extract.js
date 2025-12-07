#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = { input: null, output: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if ((a === '-i' || a === '--input') && argv[i + 1]) {
      args.input = argv[++i];
    } else if ((a === '-o' || a === '--output') && argv[i + 1]) {
      args.output = argv[++i];
    } else if (a === '-h' || a === '--help') {
      printHelp();
      process.exit(0);
    }
  }
  return args;
}

function printHelp() {
  console.log('Usage: npm run extract -i <input.csv> -o <output.ts>');
}

function normalizeLangKey(header) {
  if (!header) return header;
  if (header === '中文' || header.toLowerCase() === 'zh-cn' || header.toLowerCase() === 'zh') return 'zh';
  if (header.toLowerCase() === 'zh-tw') return 'zhTW';
  if (header.toLowerCase() === 'pt-br') return 'ptBR';
  return header;
}

function csvToRows(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim().length);
  return lines.map(line => {
    // Simple CSV split, supports values without embedded commas; trims spaces
    return line.split(',').map(s => s.trim());
  });
}

function escapeValue(v) {
  return String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function buildI18n(rows) {
  const headers = rows[0];
  const langKeys = headers.map(normalizeLangKey);
  const enIndex = headers.findIndex(h => h.toLowerCase() === 'en');
  if (enIndex === -1) throw new Error('CSV must include an "en" column');

  const items = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const key = row[enIndex];
    if (!key) continue;
    const entry = {};
    for (let c = 0; c < langKeys.length; c++) {
      const lang = langKeys[c];
      const val = row[c] ?? '';
      entry[lang] = val;
    }
    items.push({ key, entry });
  }
  return items;
}

function generateTs(items) {
  const lines = [];
  lines.push('export const i18n = {');
  for (const { key, entry } of items) {
    lines.push(`  '${escapeValue(key)}': {`);
    const langs = Object.keys(entry);
    for (let i = 0; i < langs.length; i++) {
      const k = langs[i];
      const v = escapeValue(entry[k]);
      lines.push(`    ${JSON.stringify(k)}: '${v}',`);
    }
    lines.push('  },');
  }
  lines.push('}');
  return lines.join('\n');
}

function main() {
  const { input, output } = parseArgs(process.argv);
  if (!input || !output) {
    printHelp();
    process.exit(1);
  }
  const inPath = path.resolve(process.cwd(), input);
  const outPath = path.resolve(process.cwd(), output);
  const content = fs.readFileSync(inPath, 'utf8');
  // Handle optional Excel separator line like "sep=,"
  const normalized = content.replace(/^sep=,\s*(?:\r?\n)?/i, '');
  const rows = csvToRows(normalized);
  const items = buildI18n(rows);
  const ts = generateTs(items);
  fs.writeFileSync(outPath, ts, 'utf8');
  console.log(`Wrote ${items.length} keys to ${outPath}`);
}

main();

