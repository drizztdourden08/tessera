/* @layer tooling-scripts @kind logic */
import { TEMPLATE_PROPS } from './template.constants.mjs';

const typesSource = (spec) => [
  `/* @layer ${spec.layer} @kind types */`,
  'import type { ReactNode } from \'react\';',
  '',
  `interface ${spec.names.props} {`,
  ...TEMPLATE_PROPS.map((prop) => `  ${prop.name}${prop.optional ? '?' : ''}: ${prop.text};`),
  '}',
  '',
  `export type { ${spec.names.props} };`,
  '',
].join('\n');

export { typesSource };
