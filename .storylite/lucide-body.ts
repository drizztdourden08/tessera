/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { ICON_DATA } from './lucide-body.constants';

const lucideBody = (root: string, name: string): string => {
  const file = path.join(root, 'node_modules', '@iconify-icons', 'lucide', `${name}.js`);
  const json = ICON_DATA.exec(fs.readFileSync(file, 'utf8'))?.[1];
  if (!json) throw new Error(`Lucide icon "${name}" has no icon data in ${file}.`);
  return (JSON.parse(json) as { body: string }).body;
};

export { lucideBody };
