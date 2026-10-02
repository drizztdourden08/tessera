/* @layer tooling-scripts @kind logic */
import { MODE_KEY, TIER_ORDER } from './ai.constants.mjs';
import { aiVerdict } from './ai-verdict.mjs';

const printMissing = (missing, total) => {
  console.log(`ai: ${total - missing.length} of ${total} components have a usage file.`);
  if (missing.length === 0) return;
  console.log('  Missing a usage file:');
  const tiers = [...new Set([...TIER_ORDER, ...missing.map((f) => f.tier)])];
  for (const tier of tiers) {
    const names = missing.filter((f) => f.tier === tier).map((f) => f.name);
    if (names.length > 0) console.log(`    ${tier} (${names.length}): ${names.join(', ')}`);
  }
};

const printLeaves = (unreached, leafCount, verbose) => {
  console.log(`ai: ${leafCount - unreached.length} of ${leafCount} answers in src/ai/tree.constants.ts lead to a component.`);
  if (verbose) for (const leaf of unreached) console.log(`    no component: ${leaf.message}`);
  else if (unreached.length > 0) console.log('  pnpm ai --check --verbose lists the answers with no component.');
};

const printProblems = (problems) => {
  if (problems.length === 0) return;
  console.log(`ai: ${problems.length} problem(s) to fix:`);
  for (const problem of problems) console.log(`  ${problem.kind}${problem.name ? ` ${problem.name}` : ''}: ${problem.message}`);
};

const printFindings = (findings, { mode, problem, total, leafCount, verbose }) => {
  const enforce = mode === 'enforce';
  console.log(`ai: ${mode} mode (tessera.config.json ${MODE_KEY}). ${enforce ? 'Coverage gaps fail the check.' : 'Coverage gaps are listed and do not fail; set it to "enforce" once every component has its usage.'}`);
  printMissing(findings.filter((f) => f.kind === 'missing-usage'), total);
  printLeaves(findings.filter((f) => f.kind === 'unreached-leaf'), leafCount, verbose);
  const { problems, failed } = aiVerdict(findings, { mode, problem });
  printProblems(problems);
  return failed;
};

export { printFindings };
