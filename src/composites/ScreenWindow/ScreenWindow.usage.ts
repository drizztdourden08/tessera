/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../ai/usage.type';

const usage = {
  job: 'Building block: the plain screen window, a ScreenLayer with a title, a close button and an empty container.',
  useWhen: [
    'You build a new kind of screen on the window every screen kind shares.',
    'A screen fits none of the four kinds and needs only a title, a close button and its own content.',
  ],
  avoidWhen: [
    { case: 'The screen has pages the user moves between from a side list.', use: 'WorkspaceScreen' },
    { case: 'The screen is read, such as About or credits.', use: 'InfoScreen' },
    { case: 'The screen runs one short task with a status and actions.', use: 'UtilityScreen' },
    { case: 'The screen is one big custom surface.', use: 'StageScreen' },
  ],
  rules: [
    'Reach for a screen kind first. Use ScreenWindow alone only when none of them fits.',
    'The padding inside the card is the same on all four sides. Never add padding around the children to make up for it.',
    'The container does not scroll: the children pick how they scroll, with a ScrollArea or their own layout.',
    'Keep extra to a few small controls; the close button always comes last.',
  ],
  a11y: [
    'The card is a modal dialog named by the title.',
    'The close button carries the Close label from the strings.',
  ],
  buildingBlock: true,
  example: `import { ScreenWindow, ScrollArea } from '@drizztdourden08/tessera';

const SessionsScreen = ({ onClose }: { onClose: () => void }) => (
  <ScreenWindow title="Sessions" subtitle="Profile: mira" onClose={onClose}>
    <ScrollArea>Sessions list</ScrollArea>
  </ScreenWindow>
);
`,
  propsHash: '488aad91e11d1ce3',
} satisfies ComponentUsage;

export { usage };
