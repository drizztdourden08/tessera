/* @layer tooling-scripts @kind entry */
import { runnerImport } from 'vite';
import { findPages } from './find-pages.mjs';
import { reviewNotes } from './review-notes.mjs';
import { printReview } from './print-review.mjs';

const RUNNER = { configFile: false, logLevel: 'silent' };
const USAGE = 'Usage: pnpm review ok|seen|flag|clear <page>... | pnpm review list [red|yellow|green] | pnpm review notes [clear <page>... | clear --all]';
const STATUS = { ok: 'ok', seen: 'seen', flag: 'flag', clear: 'new' };

const root = process.cwd();
const [verb, ...names] = process.argv.slice(2);
const load = async (file) => (await runnerImport(file, { ...RUNNER, root })).module;

const record = async () => {
  const { setReview } = await load('/.storylite/review-set.ts');
  for (const page of setReview(root, STATUS[verb], (pages) => findPages(pages, names))) console.log(`${verb.padEnd(5)} ${page.title}`);
};

const list = async () => {
  const { reviewState } = await load('/.storylite/review-colours.ts');
  printReview(reviewState(root), names[0]);
};

const notes = async () => {
  const store = {
    ...(await load('/.storylite/review-notes-read.ts')),
    ...(await load('/.storylite/review-notes-write.ts')),
    ...(await load('/.storylite/review-note-set.ts')),
  };
  return reviewNotes(root, store, names);
};

const run = { list, notes };

if (verb in run) await run[verb]();
else if (verb in STATUS && names.length > 0) await record();
else {
  console.error(USAGE);
  process.exitCode = 1;
}
