/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { storyFiles } from './story-files';

const kebab = (s: string): string =>
  s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();

const componentPages = (root: string): Record<string, string> => {
  const pages: Record<string, string> = {};
  const storiesDir = path.join(root, 'stories');
  for (const file of storyFiles(storiesDir)) {
    const source = fs.readFileSync(file, 'utf8');
    const title = /const meta = \{[^]*?\btitle: '([^']+)'/.exec(source)?.[1];
    const exported = /export \{([^}]+)\};\s*$/.exec(source)?.[1];
    if (!title || !exported) continue;
    const names = exported.split(',').map((s) => s.trim()).filter(Boolean);
    const first = ['Overview', 'Playground'].find((n) => names.includes(n)) ?? names[0];
    if (first === undefined) continue;
    const base = path.relative(storiesDir, file).replace(/\.stories\.tsx$/, '').split(path.sep).join('-').toLowerCase();
    pages[title] = `${base}--${kebab(first)}`;
  }
  return pages;
};

export { componentPages };
