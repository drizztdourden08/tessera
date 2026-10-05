/* @layer stories @kind data */
const FILES = import.meta.glob<string>('../../../brand/dark-ground/*.svg', { eager: true, query: '?url', import: 'default' });

const DARK_GROUND_MARKS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(FILES).map(([path, url]) => [path.replace(/^.*\/(\w+)\.svg$/, '$1'), url]),
);

export { DARK_GROUND_MARKS };
