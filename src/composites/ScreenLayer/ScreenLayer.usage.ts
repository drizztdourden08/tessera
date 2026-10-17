/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Building block: the overlay and the card of every screen, with one gap around the card that follows the room.',
  useWhen: [
    'You build a new kind of screen that none of the screen kinds or ScreenWindow can hold.',
  ],
  avoidWhen: [
    { case: 'You show a screen with pages and a side list.', use: 'WorkspaceScreen' },
    { case: 'You show About, credits or another screen to read.', use: 'InfoScreen' },
    { case: 'You show one short task with a status, such as an update check.', use: 'UtilityScreen' },
    { case: 'You show one big custom surface, such as calibration.', use: 'StageScreen' },
    { case: 'You need a title, a close button and an empty container.', use: 'ScreenWindow' },
  ],
  rules: [
    'Use it only inside a screen kind. App code shows screens through the kinds.',
    'Put it in a positioned parent: it covers that parent, usually the whole app.',
    'Never set a margin or a padding on the gap: the layer works it out from its room.',
    'Draw the inside of the card yourself, including its padding, which is the same on all four sides.',
    'Use size="compact" for a card that fits its content, up to a readable width.',
    'Use size="info" for an informational window with no tools: a small card that fits its content, centred, up to 512 px wide. InfoScreen sets it.',
    'Set square for a window shown fullscreen: the card drops its corner radius and its outer border, and the host draws what surrounds it.',
    'Pass corner for small round buttons on the top right corner of the card, half over its edge, such as the X of a window with no title row.',
    'Set tight for a window with no title row: the gap around the card takes the next smaller space token at every size.',
    'Pass move to let the user move the card by its top edge and resize it from its edges and corners: rect is where it sits, null for its snapped spot, and onChange gets each new rect. The card stays inside the layer, floating and corner included, and no smaller than min.',
  ],
  a11y: [
    'The card and the floating switcher are one modal dialog. Pass labelledBy with the id of a visible title, or label when there is none.',
    'On open focus moves to the labelledBy title, or to the first control without one; Tab stays inside, and on close focus returns to the opener.',
    'While open, the siblings of the layer in its parent are inert: put the page it covers beside it, and keep a title bar outside that parent.',
    'hidden takes the layer out of the page and out of the accessibility tree, and keeps its content mounted.',
    'Pass onClose and Escape calls it, after every menu, popover and dialog above the layer; a hidden layer takes no Escape.',
    'floating comes before the card in the page order, so a switcher in it is the first Tab stop; it still draws on the top edge of the card.',
    'corner comes after floating, and the Move window handle of move after corner, both before the card.',
  ],
  buildingBlock: true,
  example: `import type { ReactNode } from 'react';
import { ScreenLayer } from '@drizztdourden08/tessera';

const KioskScreen = ({ children }: { children: ReactNode }) => (
  <ScreenLayer label="Kiosk" className="kiosk-screen">
    {children}
  </ScreenLayer>
);
`,
  propsHash: 'a27acadc0a343977',
} satisfies ComponentUsage;

export { usage };
