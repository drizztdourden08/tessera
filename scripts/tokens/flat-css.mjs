/* @layer tooling-scripts @kind logic */
import { posix } from 'node:path';
import { STYLE_HEADER, TOKENS_INDEX } from './tokens.constants.mjs';

const IMPORT = /^@import url\('([^']+)'\);[ \t]*$/gm;
const HEADER = /^\/\* @layer [\w-]+ @kind \w+ \*\/\n/;
const URL_REF = /(?<!@import )url\((['"]?)(\.{1,2}\/[^'")]+)\1\)/g;

const rebase = (text, from) => text.replace(URL_REF, (_, quote, ref) => `url(${quote}./${posix.join(posix.dirname(from), ref)}${quote})`);

const inline = (path, read) => {
  const text = rebase(read(path).replace(/\r\n/g, '\n').replace(HEADER, '').trimStart(), path);
  return text.replace(IMPORT, (_, ref) => `${inline(posix.join(posix.dirname(path), ref), read).trimEnd()}\n`);
};

const flatCss = (read) => `${STYLE_HEADER}\n${inline(TOKENS_INDEX, read).trim()}\n`;

export { flatCss };
