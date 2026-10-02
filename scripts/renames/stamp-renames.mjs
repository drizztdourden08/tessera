/* @layer tooling-scripts @kind entry */
import { readFileSync, writeFileSync } from 'node:fs';

const RENAMES = new URL('../../RENAMES.json', import.meta.url);
const { version } = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8'));
const renames = JSON.parse(readFileSync(RENAMES, 'utf8'));
const next = renames.releases.find((release) => release.version === 'next');

if (next) {
  next.version = version;
  writeFileSync(RENAMES, `${JSON.stringify(renames, null, 2)}\n`);
  console.log(`RENAMES.json: the next release is now ${version}.`);
}
