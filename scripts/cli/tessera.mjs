#!/usr/bin/env node
/* @layer tooling-scripts @kind entry */
import { runTessera } from './run-tessera.mjs';

process.exitCode = await runTessera(process.argv.slice(2));
