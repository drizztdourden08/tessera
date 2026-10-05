/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Building block: the plain screen window, a ScreenLayer with a title bar or a page header at its top, a close button and an empty container.',
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
    'The title bar is the default top. Pass header to make a ContentHeader the top edge of the window instead: title is its title, and the close button sits at the end of its actions.',
    'With header the window has no padding and no card inside: the children pad themselves, so a scrolling body reaches the window edge.',
    'With header, subtitle and extra do not show; put such controls in header.strip or header.actions.',
    'Pass back to draw a back button before the title, in the title bar or in the page header, for a screen opened from another one. The host wires Alt+Left and the mouse back button to the same call.',
    'Without header, the padding inside the card is the same on all four sides. Never add padding around the children to make up for it.',
    'UtilityScreen uses header; WorkspaceScreen and StageScreen put a ScreenPage inside the title bar window; InfoScreen keeps the title bar alone.',
    'The container does not scroll: the children pick how they scroll, with a ScrollArea or their own layout.',
    'Keep extra to a few small controls; the close button always comes last.',
    'Set square for a window shown fullscreen: it drops the corner radius and the outer border.',
  ],
  a11y: [
    'The card is a modal dialog named by the title.',
    'The close button carries the Close label from the strings.',
  ],
  buildingBlock: true,
  example: `import { Button, Icon, ScreenWindow, ScrollArea } from '@drizztdourden08/tessera';

const SessionsScreen = ({ onClose }: { onClose: () => void }) => (
  <ScreenWindow title="Sessions" subtitle="Profile: mira" onClose={onClose}>
    <ScrollArea>Sessions list</ScrollArea>
  </ScreenWindow>
);

const PlayersScreen = ({ onClose }: { onClose: () => void }) => (
  <ScreenWindow title="Players" header={{ icon: <Icon name="users" />, actions: <Button size="sm">Invite</Button> }} onClose={onClose}>
    <ScrollArea>Players list</ScrollArea>
  </ScreenWindow>
);
`,
  propsHash: 'd8f3d7f12b75a0c6',
} satisfies ComponentUsage;

export { usage };
