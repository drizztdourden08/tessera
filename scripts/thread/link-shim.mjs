#!/usr/bin/env node
/* @layer tooling-scripts @kind entry */
import { execSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { ENTRY, NAME } from './link-shim.constants.mjs';

const IS_WINDOWS = process.platform === 'win32';
const CHECKOUT = dirname(dirname(import.meta.dirname)).replace(/\\/g, '/');
const WIN_ENTRY = ENTRY.replace(/\//g, '\\');

const say = (line) => process.stderr.write(`${line}\n`);

const globalPrefix = () => process.env.BROCK_GLOBAL_PREFIX
  || execSync('npm prefix -g', { encoding: 'utf8', windowsHide: true }).trim();

const binDir = (prefix) => (IS_WINDOWS ? prefix : join(prefix, 'bin'));

const isWorktree = () => statSync(join(CHECKOUT, '.git'), { throwIfNoEntry: false })?.isFile() ?? false;

const bashShim = () => `#!/bin/sh
dir="$PWD"
while :; do
  if [ -f "$dir/${ENTRY}" ]; then exec node "$dir/${ENTRY}" "$@"; fi
  parent="$(dirname "$dir")"
  [ "$parent" = "$dir" ] && break
  dir="$parent"
done
exec node "${CHECKOUT}/${ENTRY}" "$@"
`;

const cmdShim = () => `@echo off
setlocal
set "DIR=%CD%"
:walk
if exist "%DIR%\\${WIN_ENTRY}" goto run
for %%P in ("%DIR%\\..") do set "PARENT=%%~fP"
if /i "%PARENT%"=="%DIR%" goto recorded
set "DIR=%PARENT%"
goto walk
:recorded
set "DIR=${CHECKOUT.replace(/\//g, '\\')}"
:run
node "%DIR%\\${WIN_ENTRY}" %*
exit /b %ERRORLEVEL%
`;

const writeShim = (file, content) => {
  if (existsSync(file) && readFileSync(file, 'utf8') === content) return false;
  writeFileSync(file, content, 'utf8');
  if (!file.endsWith('.cmd')) chmodSync(file, 0o755);
  return true;
};

const link = () => {
  if (process.env.CI || isWorktree()) return;
  try {
    const dir = binDir(globalPrefix());
    if (!dir) throw new Error('npm prefix -g printed nothing');
    mkdirSync(dir, { recursive: true });
    const changed = [writeShim(join(dir, NAME), bashShim()), writeShim(join(dir, `${NAME}.cmd`), cmdShim())];
    if (changed.some(Boolean)) say(`${NAME}: linked the ${NAME} command in ${dir}`);
  } catch (error) {
    say(`${NAME}: could not link the ${NAME} command (${error.message}); run node scripts/thread/link-shim.mjs to retry`);
  }
};

link();
