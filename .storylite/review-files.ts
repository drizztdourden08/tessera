/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { RELATIVE_IMPORT, REVIEW_EXTENSIONS, REVIEW_SKIP, SOURCE_TIERS } from './review.constants';
import { walkFiles as walk } from './walk-files';

const resolveImport = (from: string, spec: string): string | undefined => {
  const base = path.resolve(path.dirname(from), spec);
  const candidates = [base, ...REVIEW_EXTENSIONS.map((ext) => base + ext), ...REVIEW_EXTENSIONS.map((ext) => path.join(base, `index${ext}`))];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) ?? (fs.existsSync(base) ? base : undefined);
};

const importsOf = (file: string): string[] =>
  [...fs.readFileSync(file, 'utf8').matchAll(RELATIVE_IMPORT)].flatMap((m) => resolveImport(file, m[1] ?? '') ?? []);

const componentFolder = (root: string, target: string): string | undefined => {
  const parts = path.relative(root, target).split(path.sep);
  if (parts[0] !== 'src' || !SOURCE_TIERS.includes(parts[1] ?? '') || parts.length < 3) return undefined;
  const folder = path.join(root, 'src', parts[1] ?? '', parts[2] ?? '');
  return fs.existsSync(folder) && fs.statSync(folder).isDirectory() ? folder : undefined;
};

const isHelperFolder = (folder: string): boolean => /^[a-z]/.test(path.basename(folder));

const folderFiles = (root: string, folder: string): string[] => {
  const own = walk(folder);
  const imported = own.flatMap(importsOf);
  const theme = imported.filter((f) => path.relative(root, f).startsWith(path.join('src', 'theme')));
  const helpers = [...new Set(imported.flatMap((f) => componentFolder(root, f) ?? []))].filter((f) => f !== folder && isHelperFolder(f));
  return [...own, ...theme, ...helpers.flatMap(walk)];
};

const namedFolders = (root: string, storyFile: string): string[] => {
  const name = path.basename(storyFile).replace(/\.stories\.tsx$/, '');
  return SOURCE_TIERS.map((tier) => path.join(root, 'src', tier, name)).filter((f) => fs.existsSync(f));
};

const pageFiles = (root: string, storyFile: string): string[] => {
  const storiesDir = path.join(root, 'stories');
  const seen = new Set<string>();
  const folders = new Set<string>(namedFolders(root, storyFile));
  const visit = (file: string): void => {
    if (seen.has(file)) return;
    seen.add(file);
    for (const target of importsOf(file)) {
      const folder = componentFolder(root, target);
      if (folder) folders.add(folder);
      const local = target.startsWith(storiesDir) && !REVIEW_SKIP.some((skip) => target.startsWith(path.join(storiesDir, skip)));
      if (local && /\.(tsx?|css)$/.test(target)) visit(target);
    }
  };
  visit(storyFile);
  return [...new Set([...seen, ...[...folders].flatMap((f) => folderFiles(root, f))])].sort();
};

export { pageFiles };
