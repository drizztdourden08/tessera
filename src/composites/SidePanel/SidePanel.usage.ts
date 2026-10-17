/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The one side panel of Tessera: a sunken panel beside the main view, with a heading, that folds to a rail and that the user may drag wider.',
  useWhen: [
    'A screen has an outline, a layer list or an inspector beside its main view.',
    'The user needs the room of the panel now and then, so it folds to a rail with its actions, its title and its icons.',
    'A page has pickers on its sides, such as a list of profiles on the left and device cards to drag on the right.',
  ],
  avoidWhen: [
    { case: 'A list, an editor and an inspector make one studio screen.', use: 'StudioLayout' },
    { case: 'A list sits beside the detail of the picked item.', use: 'ListDetailLayout' },
    { case: 'The left side is the navigation of the app.', use: 'SideNavLayout' },
  ],
  rules: [
    'Use it for every panel that folds or resizes beside a main view, other than the navigation of the app; draw no panel of your own.',
    'Put it in a flex row beside the main view, with no bar or frame around it; it keeps its own width, and the main view takes the rest.',
    'Pass side="end" for a panel on the right; its line, its fold button and its rail mirror to its left.',
    'Pass actions for buttons in the heading, such as Add or Rescan; the folded rail shows them at its top, level with the fold button.',
    'Pass rail for the icons of the items, such as one IconButton for each profile; the folded rail shows them under the title.',
    'A glow around a rail icon, such as a drop-shadow on a ready device, spreads past the rail; only a rail too long to fit scrolls and clips it.',
    'Put lists, cards, inputs and drag sources in it as they are: the body scrolls, and the content stays mounted while folded.',
    'Pass width, minWidth and maxWidth in pixels; resizable={false} keeps the line and the fold button, drops the grip and the drag, and takes width as it is.',
    'Pass storageKey to keep the width, and the fold under storageKey:collapsed.',
    'Pass collapsed with onCollapsedChange when the app holds the fold; collapsible={false} drops the fold button.',
  ],
  a11y: [
    'It is an aside named by its title, with the title as a heading, h2 unless level says otherwise.',
    'The fold button says Hide or Show and the title and reports aria-expanded; focus stays on it when the panel folds or opens.',
    'While folded the heading and the body are hidden from screen readers and the keyboard; the actions and the rail take their place, and the sideways title is hidden from screen readers.',
    'A resizable line is a separator: the arrow keys resize it, and Enter folds the panel and moves focus to the button that opens it.',
    'A line that does not resize is hidden from screen readers and the keyboard.',
  ],
  tree: {
    path: ['layout', 'a side panel with a heading that folds to a rail'],
    rule: 'SidePanel is the one side panel of a work screen: the sunken surface, the heading, the line with its fold button, the rail and the resize grip.',
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
  propsHash: '80b8953ccf0d58b1',
} satisfies ComponentUsage;

export { usage };
