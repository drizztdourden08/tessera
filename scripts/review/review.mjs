/* @layer tooling-scripts @kind entry */
import { runnerImport } from 'vite';
import { findPages } from './find-pages.mjs';
import { printReview } from './print-review.mjs';

const RUNNER = { configFile: false, logLevel: 'silent' };
const USAGE = 'Usage: pnpm review ok|seen|clear <page>... | pnpm review list [red|yellow|green]';
const STATUS = { ok: 'ok', seen: 'seen', clear: 'new' };

const root = process.cwd();
const [verb, ...names] = process.argv.slice(2);
const load = async (file) => (await runnerImport(file, { ...RUNNER, root })).module;
const { reviewPages } = await load('/.storylite/review-pages.ts');
const { syncRegistry } = await load('/.storylite/review-registry.ts');
const { writeRegistry } = await load('/.storylite/review-write.ts');
const { splitTitle } = await load('/.storylite/review-split-title.ts');
const { reviewState } = await load('/.storylite/review-colours.ts');

const record = () => {
  const pages = reviewPages(root);
  const registry = syncRegistry(root, pages);
  const today = new Date().toISOString().slice(0, 10);
  for (const page of findPages(pages, names)) {
    const [folder, name] = splitTitle(page.title);
    registry[folder][name] = verb === 'clear' ? { status: 'new' } : { status: STATUS[verb], hash: page.hash, at: today };
    console.log(`${verb.padEnd(5)} ${page.title}`);
  }
  writeRegistry(root, registry);
};

if (verb === 'list') printReview(reviewState(root), names[0]);
else if (verb in STATUS && names.length > 0) record();
else {
  console.error(USAGE);
  process.exitCode = 1;
}
