/* @layer stories @kind data */
const FILES = import.meta.glob<string>('../../../brand/*-wordmark.svg', { eager: true, query: '?url', import: 'default' });

const SPLASH_WORDMARKS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(FILES).map(([path, url]) => [path.replace(/^.*\/(\w+)-wordmark\.svg$/, '$1'), url]),
);

export { SPLASH_WORDMARKS };
