/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';

const walkFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walkFiles(path.join(dir, e.name)) : [path.join(dir, e.name)]));

export { walkFiles };
