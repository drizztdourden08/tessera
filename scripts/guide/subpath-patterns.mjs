/* @layer tooling-scripts @kind logic */
import { codeWildcards } from './code-wildcards.mjs';
import { specifierOf } from './specifier-of.mjs';

const ESCAPE = /[.+?^${}()|[\]\\]/g;

const subpathPatterns = (manifest) =>
  codeWildcards(manifest).map(([key]) => new RegExp(`^${specifierOf(manifest.name, key).replace(ESCAPE, '\\$&').replace('*', '[^/]+')}$`));

export { subpathPatterns };
