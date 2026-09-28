/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';

const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

const storyFiles = (storiesDir: string): string[] => walk(storiesDir).filter((f) => f.endsWith('.stories.tsx'));

export { storyFiles };
