/* @layer tooling-scripts @kind logic */
import { defaultIo } from './default-io.mjs';
import { findProject } from './find-project.mjs';

const OPTIONS = ['--verbose', '--help', '-h'];

const RUNNERS = {
  tessera: async () => (await import('../ai/run-tessera-ai.mjs')).runTesseraAi,
  app: async () => (await import('../ai/run-app-ai.mjs')).runAppAi,
};

const fail = (io, message) => {
  io.warn(`tessera: ${message}`);
  return 1;
};

const loadRunner = async (mode) => {
  try {
    return { runner: await RUNNERS[mode]() };
  } catch (error) {
    return { problem: `the usage check needs typescript, installed in the app or at the repo root. ${error instanceof Error ? error.message : String(error)}` };
  }
};

const runUsage = async (argv, { cwd, io = defaultIo() }, { write, help }) => {
  if (argv.includes('-h') || argv.includes('--help')) {
    io.log(help);
    return 0;
  }
  const unknown = argv.filter((arg) => !OPTIONS.includes(arg));
  if (unknown.length > 0) return fail(io, `there is no option ${unknown.join(' ')}.\n\n${help}`);
  const project = findProject(cwd);
  if (project.problem) return fail(io, `${project.problem}.`);
  const { runner, problem } = await loadRunner(project.mode);
  if (problem) return fail(io, problem);
  const options = { verbose: argv.includes('--verbose'), log: io.log };
  return project.mode === 'tessera' ? runner(project.root, { ...options, check: !write }) : runner(project.config, { ...options, write });
};

export { runUsage };
