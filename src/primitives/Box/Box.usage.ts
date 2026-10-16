/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The plain element every block is built from, with an optional sunken or raised surface for a well or a panel.',
  useWhen: [
    'Any element that needs no layout of its own, such as a section, an article, a list or a details block.',
    'A well sunken into the page, such as a list or a text area inside a panel: surface="sunken".',
    'A panel lifted off the page, such as the side panels and the top bar of a studio: surface="raised".',
  ],
  avoidWhen: [
    { case: 'The children line up in a row or a column with a gap.', use: 'Flex' },
    { case: 'One self-contained item with a title, a count and actions.', use: 'Card' },
  ],
  rules: [
    'Pick the tag with as; every other prop and a ref pass through to the element.',
    'Without surface it adds no styles of its own.',
    'surface="sunken" sets the sunken fill, a thin border and a medium corner. surface="raised" sets the surface fill, a thin border, a large corner and the first shadow.',
    'A surface paints only the fill, the edge and the corner. Put padding and layout in your own class; any of your rules, such as a smaller corner or a border colour on focus, wins over the surface.',
  ],
  a11y: [
    'It adds no role; set as to the element the content needs, such as section or aside for a panel with a heading.',
    'A surface changes only the look, so give a panel its name with a heading or aria-label.',
  ],
  tree: {
    path: ['layout', 'a plain block'],
    rule: 'Box is the plain element; surface="sunken" makes it a well and surface="raised" a panel, with the fill, edge and corner from the tokens.',
  },
  example: `import { Box, Text } from '@drizztdourden08/tessera';

const SpritePanel = () => (
  <Box as="aside" surface="raised" aria-label="Sprites" className="sprite-panel">
    <Text variant="overline">Sprites</Text>
    <Box surface="sunken" className="sprite-panel__list">
      <Text>Link</Text>
      <Text>Zelda</Text>
    </Box>
  </Box>
);
`,
  propsHash: '600e37ba4b388e94',
} satisfies ComponentUsage;

export { usage };
