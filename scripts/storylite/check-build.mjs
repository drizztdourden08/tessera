/* @layer tooling-scripts @kind entry */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist-storylite');
const START = '/* tessera:frame-css:start */';
const END = '/* tessera:frame-css:end */';
const SHEET_FOLDERS = ['src/primitives', 'src/composites', 'src/brand', 'src/theme', 'stories'];
const CONFIG_SHEETS = new Set(['stories/storylite.css']);
const DEV_ONLY = [/\/__review/, /src="\/(?:\.storylite|@)/];

const sheetsIn = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const path = join(dir, entry.name);
  if (entry.isDirectory()) return sheetsIn(path);
  return entry.name.endsWith('.css') ? [path] : [];
});

const firstClass = (path) => {
  const rules = readFileSync(path, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/@import[^;]*;|url\([^)]*\)/g, '');
  return /\.(-?[_a-zA-Z][\w-]*)/.exec(rules)?.[1];
};

const hasClass = (css, name) => new RegExp(`\\.${name.replace(/[-]/g, '\\-')}(?![\\w-])`).test(css);

const frameCss = () => {
  const project = readFileSync(join(DIST, 'project.js'), 'utf8');
  const start = project.indexOf(START);
  const end = project.indexOf(END, start);
  return start < 0 || end < 0 ? null : project.slice(start, end);
};

const frameProblems = () => {
  const css = frameCss();
  if (css === null) return ['project.js holds no preview frame css: components render unstyled in the built gallery.'];
  return SHEET_FOLDERS.flatMap((folder) => sheetsIn(join(ROOT, folder)))
    .map((path) => ({ file: relative(ROOT, path).replace(/\\/g, '/'), name: firstClass(path) }))
    .filter(({ file, name }) => name && !CONFIG_SHEETS.has(file) && !hasClass(css, name))
    .map(({ file, name }) => `the preview frame css lacks .${name} from ${file}.`);
};

const managerProblems = () => {
  const html = readFileSync(join(DIST, 'index.html'), 'utf8');
  const devOnly = DEV_ONLY.filter((pattern) => pattern.test(html)).map((pattern) => `index.html still loads a dev server path (${pattern.source}).`);
  const missing = [...html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)]
    .map((match) => match[1])
    .filter((file) => !existsSync(join(DIST, file)))
    .map((file) => `index.html links ./${file}, which the build did not write.`);
  return [...devOnly, ...missing];
};

if (!existsSync(DIST)) {
  console.error('check-build: dist-storylite is missing; run storylite build first.');
  process.exit(1);
}

const problems = [...frameProblems(), ...managerProblems()];
if (problems.length > 0) {
  console.error(`check-build: the built gallery differs from the dev gallery:\n${problems.map((line) => `  - ${line}`).join('\n')}`);
  process.exit(1);
}
console.log('check-build: the preview frame carries every component sheet and the manager loads no dev server path.');
