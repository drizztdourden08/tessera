/* @layer tooling-scripts @kind logic */
import { APP_PART_KINDS } from './new.constants.mjs';
import { nextSteps } from './next-steps.mjs';

const printList = (io, heading, entries) => {
  if (entries.length === 0) return;
  io.log(heading);
  for (const entry of entries) io.log(`  ${entry.path}`);
};

const printPlan = (io, { spec, plan, dryRun }) => {
  const appPart = spec.mode === 'app' && APP_PART_KINDS.includes(spec.kind);
  const label = `${appPart ? 'app ' : ''}${spec.kind} ${spec.names.name}`;
  io.log(dryRun ? `tessera: dry run for the ${label}, nothing written.` : `tessera: created the ${label}.`);
  printList(io, dryRun ? 'It would write:' : 'Wrote:', plan.files);
  printList(io, dryRun ? 'It would change:' : 'Changed:', plan.edits);
  if (dryRun) return;
  io.log('Next:');
  for (const line of nextSteps(spec, plan)) io.log(line);
};

export { printPlan };
