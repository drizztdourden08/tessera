/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A raised panel beside the main view, with a heading, that folds to a rail and that the user drags wider.',
  useWhen: [
    'A screen has an outline, a layer list or an inspector beside its main view.',
    'The user needs the room of the panel now and then, so it folds to a rail with its title down the side.',
  ],
  avoidWhen: [
    { case: 'A list, an editor and an inspector make one studio screen.', use: 'StudioLayout' },
    { case: 'A list sits beside the detail of the picked item.', use: 'ListDetailLayout' },
    { case: 'The left side is the navigation of the app.', use: 'SideNavLayout' },
  ],
  rules: [
    'Put it in a flex row beside the main view; it keeps its own width, and the main view takes the rest.',
    'Pass side="end" for a panel on the right; its line then sits on its left.',
    'Pass actions for buttons in the heading, such as Add; the fold button comes after them.',
    'Pass width, minWidth and maxWidth in pixels; resizable={false} drops the line.',
    'Pass storageKey to keep the width, and the fold under storageKey:collapsed.',
    'Pass collapsed with onCollapsedChange when the app holds the fold; collapsible={false} drops the fold button.',
  ],
  a11y: [
    'It is an aside named by its title, with the title as a heading, h2 unless level says otherwise.',
    'The fold button says Hide or Show and the title and reports aria-expanded; focus stays on it when the panel folds or opens.',
    'The line is a separator: the arrow keys resize it, and Enter folds the panel and moves focus to the button that opens it.',
  ],
  tree: {
    path: ['layout', 'a side panel with a heading that folds to a rail'],
    rule: 'SidePanel is the one side panel of a work screen: the raised surface, the heading, the fold to a rail and the resize line.',
  },
  example: `import { Box, Flex, SidePanel } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

const HudEditor = ({ layers, canvas, inspector }: { layers: ReactNode; canvas: ReactNode; inspector: ReactNode }) => (
  <Flex gap="2xs" align="stretch" className="hud-editor">
    <SidePanel title="Layers" storageKey="hud.layers">{layers}</SidePanel>
    <Box className="hud-editor__canvas">{canvas}</Box>
    <SidePanel side="end" title="Inspector" storageKey="hud.inspector">{inspector}</SidePanel>
  </Flex>
);
`,
  propsHash: '34f31ff455a98db6',
} satisfies ComponentUsage;

export { usage };
