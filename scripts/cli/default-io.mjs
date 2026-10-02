/* @layer tooling-scripts @kind logic */
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';

const ask = async (question) => {
  const reader = createInterface({ input: process.stdin, output: process.stdout });
  try {
    return await reader.question(question);
  } finally {
    reader.close();
  }
};

const runScript = (cwd, script) => spawnSync(`pnpm ${script}`, { cwd, stdio: 'inherit', shell: true }).status ?? 1;

const defaultIo = () => ({
  log: (line) => console.log(line),
  warn: (line) => console.error(line),
  ask,
  interactive: Boolean(process.stdin.isTTY && process.stdout.isTTY),
  runScript,
});

export { defaultIo };
