/* @layer tooling-scripts @kind logic */
import { PACKAGE_NAME } from '../cli/new.constants.mjs';

const partLines = (names) => (names.length === 0
  ? ['      parts: never;']
  : ['      parts:', ...names.map((name, index) => `        | '${name}'${index === names.length - 1 ? ';' : ''}`)]);

const renderPartsModule = ({ key, layer, names }) => [
  `/* @layer ${layer} @kind types */`,
  `import type {} from '${PACKAGE_NAME}';`,
  '',
  `declare module '${PACKAGE_NAME}' {`,
  '  interface TesseraApps {',
  `    '${key}': {`,
  ...partLines(names),
  '    };',
  '  }',
  '}',
  '',
].join('\n');

export { renderPartsModule };
