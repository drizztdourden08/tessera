/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { storyFiles } from './story-files';

const componentPages = (root: string): Record<string, string> => {
  const pages: Record<string, string> = {};
  const storiesDir = path.join(root, 'stories');
  for (const file of storyFiles(storiesDir)) {
    const source = fs.readFileSync(file, 'utf8');
    const title = /const meta = \{[^]*?\btitle: '([^']+)'/.exec(source)?.[1];
    const exported = /export \{([^}]+)\};\s*$/.exec(source)?.[1];
    if (!title || !exported) continue;
    const names = exported.split(',').map((s) => s.trim()).filter(Boolean);
    if (!names.includes('Overview')) throw new Error(`${path.relative(root, file)} exports no Overview. Every stories file opens on overviewStory() from stories/_template.`);
    const base = path.relative(storiesDir, file).replace(/\.stories\.tsx$/, '').split(path.sep).join('-').toLowerCase();
    pages[title] = `${base}--overview`;
  }
  return pages;
};

export { componentPages };
