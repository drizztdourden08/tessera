/* @layer tooling-scripts @kind logic */
import { MODE_KEY } from './guide.constants.mjs';
import { guideVerdict } from './guide-verdict.mjs';
import { TESSERA_PRINT } from './print-words.constants.mjs';

const printMissing = (missing, total, { words, log }) => {
  log(`${words.prefix}: ${total - missing.length} of ${total} ${words.unit} have a usage file.`);
  if (missing.length === 0) return;
  log('  Missing a usage file:');
  const tiers = [...new Set([...words.tiers, ...missing.map((f) => f.tier)])];
  for (const tier of tiers) {
    const names = missing.filter((f) => f.tier === tier).map((f) => f.name);
    if (names.length > 0) log(`    ${tier} (${names.length}): ${names.join(', ')}`);
  }
};

const printLeaves = (unreached, leafCount, { words, log, verbose }) => {
  log(`${words.prefix}: ${leafCount - unreached.length} of ${leafCount} answers in ${words.tree} lead to a ${words.noun}.`);
  if (verbose) for (const leaf of unreached) log(`    no ${words.noun}: ${leaf.message}`);
  else if (unreached.length > 0) log(`  ${words.verbose} lists the answers with no ${words.noun}.`);
};

const printPlaceholders = (placeholders, { words, log }) => {
  const names = [...new Set(placeholders.map((f) => f.name))];
  if (names.length === 0) return;
  log(`${words.prefix}: ${names.length} usage file(s) still hold sentences tessera new wrote: ${names.join(', ')}.`);
  for (const f of placeholders) log(`  ${f.name}: ${f.message}`);
};

const printProblems = (problems, { words, log }) => {
  if (problems.length === 0) return;
  log(`${words.prefix}: ${problems.length} problem(s) to fix:`);
  for (const problem of problems) log(`  ${problem.kind}${problem.name ? ` ${problem.name}` : ''}: ${problem.message}`);
};

const printFindings = (findings, { mode, problem, total, leafCount, verbose, words = TESSERA_PRINT, verdict = guideVerdict, log = console.log }) => {
  const options = { words, log, verbose };
  log(`${words.prefix}: ${mode} mode (tessera.config.json ${MODE_KEY}). ${words.intro[mode]}`);
  printMissing(findings.filter((f) => f.kind === 'missing-usage'), total, options);
  printLeaves(findings.filter((f) => f.kind === 'unreached-leaf'), leafCount, options);
  printPlaceholders(findings.filter((f) => f.kind === 'placeholder'), options);
  const { problems, failed } = verdict(findings, { mode, problem });
  printProblems(problems, options);
  return failed;
};

export { printFindings };
