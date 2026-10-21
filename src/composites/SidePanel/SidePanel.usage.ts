/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The one side panel of Tessera: a sunken panel beside the main view, with a heading, that the user drags wider or narrower and that folds to a rail.',
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
    'Pass side="end" for a panel on the right; its dashed outside border, overlapping fold button and rail mirror to its left.',
    'Every panel resizes: there is no switch to turn it off. To hold a width, pass the same number to minWidth and maxWidth; the line still folds the panel.',
    'Dragging the line about 32 px narrower than minWidth folds the panel to its rail, and dragging the line of a rail outward opens it; the arrow keys at the end of the range do the same.',
    'Pass action for a button in the heading, such as Add or Rescan; the folded rail reserves its top slot and shows the button there when present.',
    'Pass railItems as an array of item icons; the folded rail shows them under the title.',
    'Pass containers for the expanded body. Each container has a required heading and body; use a meaningful section title distinct from the pane title.',
    'The dashed primary border is the resize edge; it brightens and glows while hovered, focused or dragged.',
    'The border stays on the pane while expanded and folded; the chevron straddles it at the center of the actual heading row. Folding animates the pane, heading, body and rail, with motion disabled for reduced-motion preferences.',
    'A glow around a rail icon, such as a drop-shadow on a ready device, spreads past the rail; only a rail too long to fit scrolls and clips it.',
    'Put every expanded section in a container with title and content. The side panel keeps the sections mounted while folded and its body scrolls with the primary slim scrollbar.',
    'Pass width, minWidth and maxWidth in pixels; when width is outside the default 224 to 448 range the range grows to take it, so a width of 192 stays 192.',
    'Pass storageKey to keep the width, and the fold under storageKey:collapsed.',
    'Pass collapsed with onCollapsedChange when the app holds the fold; collapsible={false} drops the fold button.',
  ],
  a11y: [
    'It is an aside named by its title, with the title as a heading, h2 unless level says otherwise; showTitle={false} hides only the pane heading.',
    'The fold button says Hide or Show and the title and reports aria-expanded; focus moves to it when the panel folds, by the button, Enter, an arrow key or a drag, and stays on it when the panel opens.',
    'While folded the heading and the body are hidden from screen readers and the keyboard; the actions and the rail take their place, and the sideways title is hidden from screen readers.',
    'The line is a separator: the arrow keys resize it, an arrow key at the end of the range folds or opens the panel, and Enter folds or opens it.',
    'While the panel is folded the separator reads a value of zero.',
  ],
  tree: {
    path: ['layout', 'a side panel with a heading that folds to a rail'],
    rule: 'SidePanel is the one side panel of a work screen: the sunken surface, neutral heading, dashed outside border with its overlapping fold button, the rail and the drag to resize or fold.',
  },
  example: `import type { ReactNode } from 'react';
import { Box, Flex, SidePanel } from '@drizztdourden08/tessera';

const HudEditor = ({ layers, canvas, inspector }: { layers: ReactNode; canvas: ReactNode; inspector: ReactNode }) => (
  <Flex gap="2xs" align="stretch" className="hud-editor">
    <SidePanel title="Layers" storageKey="hud.layers" containers={[{ title: 'Outline', content: layers }]} />
    <Box className="hud-editor__canvas">{canvas}</Box>
    <SidePanel side="end" title="Inspector" storageKey="hud.inspector" containers={[{ title: 'Properties', content: inspector }]} />
  </Flex>
);
`,
  propsHash: '44c404657a79d5db',
} satisfies ComponentUsage;

export { usage };
