/* @layer tooling-scripts @kind logic */
import { defaultIo } from './default-io.mjs';
import { findProject } from './find-project.mjs';
import { NEW_USAGE } from './new.constants.mjs';
import { parseArgs } from './parse-args.mjs';
import { planApp } from './plan-app.mjs';
import { planTessera } from './plan-tessera.mjs';
import { prepareSpec } from './prepare-spec.mjs';
import { printPlan } from './print-plan.mjs';
import { readRequest } from './read-request.mjs';
import { writePlan } from './write-plan.mjs';

const fail = (io, problems, usage = false) => {
  for (const problem of problems) io.warn(`tessera: ${problem}.`);
  if (usage) io.warn(`\n${NEW_USAGE}`);
  return 1;
};

const runAi = (io, project) => {
  if (!project.manifest.scripts?.ai) return 0;
  io.log('tessera: running pnpm ai so ai/ follows the new usage file.');
  const status = io.runScript(project.root, 'ai');
  if (status !== 0) io.warn('tessera: pnpm ai failed. The files are written: fix what it reports, then run pnpm ai again.');
  return status;
};

const create = (io, project, spec, dryRun) => {
  const plan = spec.mode === 'tessera' ? planTessera(project.root, spec) : planApp(project.manifest, spec);
  if (plan.problems.length > 0) return fail(io, plan.problems);
  if (!dryRun) writePlan(project.root, plan);
  printPlan(io, { spec, plan, dryRun });
  if (dryRun) return 0;
  return runAi(io, project) === 0 ? 0 : 1;
};

const run = async (argv, { cwd, io = defaultIo() }) => {
  const { positionals, flags, problems } = parseArgs(argv);
  if (flags.help) {
    io.log(NEW_USAGE);
    return 0;
  }
  const request = readRequest(positionals);
  const wrong = [...problems, ...request.problems];
  if (wrong.length > 0) return fail(io, wrong, true);
  const project = findProject(cwd);
  if (project.problem) return fail(io, [project.problem]);
  const prepared = await prepareSpec(io, project, request, flags);
  if (prepared.cancelled) return 1;
  if (prepared.problem) return fail(io, [prepared.problem]);
  return create(io, project, prepared.spec, Boolean(flags['dry-run']));
};

export { run };
