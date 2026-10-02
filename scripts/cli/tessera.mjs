#!/usr/bin/env node
/* @layer tooling-scripts @kind entry */
import { readFileSync } from 'node:fs';
import { COMMANDS, USAGE } from './cli.constants.mjs';

const [command, ...rest] = process.argv.slice(2);

const version = () => JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')).version;

const main = async () => {
  if (command === '-v' || command === '--version') {
    console.log(version());
    return 0;
  }
  if (command === undefined || command === '-h' || command === '--help') {
    console.log(USAGE);
    return 0;
  }
  if (!Object.hasOwn(COMMANDS, command)) {
    console.error(`tessera: there is no command "${command}".\n\n${USAGE}`);
    return 1;
  }
  const { run } = await COMMANDS[command]();
  return run(rest, { cwd: process.cwd() });
};

process.exitCode = await main();
