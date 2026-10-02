/* @layer tooling-scripts @kind data */
const TEMPLATE_PROPS = [
  { name: 'title', optional: false, text: 'ReactNode' },
  { name: 'children', optional: true, text: 'ReactNode' },
  { name: 'className', optional: true, text: 'string' },
];

const TESSERA_IMPORTS = {
  primitive: ['import { Box } from \'../Box\';', 'import { Text } from \'../Text\';'],
  composite: ['import { Box } from \'../../primitives/Box\';', 'import { Text } from \'../../primitives/Text\';'],
};

const APP_IMPORTS = ['import { Box, Text } from \'@drizztdourden08/tessera\';'];

export { APP_IMPORTS, TEMPLATE_PROPS, TESSERA_IMPORTS };
