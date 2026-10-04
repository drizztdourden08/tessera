/* @layer tooling-scripts @kind logic */
import { PACKAGE_NAME } from '../cli/new.constants.mjs';

const renderPartsModule = ({ key, layer, names }) => [
  `/* @layer ${layer} @kind types */`,
  `declare module '${PACKAGE_NAME}' {`,
  '  interface TesseraApps {',
  `    '${key}': {`,
  '      parts:',
  ...names.map((name, index) => `        | '${name}'${index === names.length - 1 ? ';' : ''}`),
  '    };',
  '  }',
  '}',
  '',
  'export {};',
  '',
].join('\n');

export { renderPartsModule };
