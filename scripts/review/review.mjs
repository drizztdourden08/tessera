/* @layer tooling-scripts @kind entry */
import fs from 'node:fs';
import path from 'node:path';
import { runnerImport } from 'vite';
import { findPages } from './find-pages.mjs';

const RUNNER = { configFile: false, logLevel: 'silent' };
const USAGE = 'Usage: pnpm review ok|seen|clear <page>... | pnpm review list [red|yellow|green]';

const root = process.cwd();
const [verb, ...names] = process.argv.slice(2);
const load = async (file) => (await runnerImport(file, { ...RUNNER, root })).module;
const { reviewPages } = await load('/.storylite/review-pages.ts');
const { readLedger } = await load('/.storylite/review-ledger.ts');
const { reviewColours } = await load('/.storylite/review-colours.ts');
const { REVIEW_FILE } = await load('/.storylite/review.constants.ts');

if (verb === 'list') {
  const colours = reviewColours(root);
  for (const [title, colour] of Object.entries(colours)) if (!names[0] || names[0] === colour) console.log(`${colour.padEnd(6)} ${title}`);
} else if (['ok', 'seen', 'clear'].includes(verb) && names.length > 0) {
  const ledger = readLedger(root);
  const today = new Date().toISOString().slice(0, 10);
  for (const page of findPages(reviewPages(root), names)) {
    if (verb === 'clear') delete ledger[page.title];
    else ledger[page.title] = { mark: verb, hash: page.hash, at: today };
    console.log(`${verb.padEnd(5)} ${page.title}`);
  }
  const sorted = Object.fromEntries(Object.entries(ledger).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(path.join(root, REVIEW_FILE), `${JSON.stringify(sorted, null, 2)}\n`);
} else {
  console.error(USAGE);
  process.exitCode = 1;
}
