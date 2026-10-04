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
    'Set square for a window shown fullscreen: the card drops its corner radius and its outer border, and the host draws what surrounds it.',
  ],
  a11y: [
    'The card is a modal dialog. Pass labelledBy with the id of a visible title, or label when there is none.',
    'hidden takes the layer out of the page and out of the accessibility tree, and keeps its content mounted.',
    'floating comes before the card in the page order, so a switcher in it is the first Tab stop; it still draws on the top edge of the card.',
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
  propsHash: '9aed0db4d9e61861',
} satisfies ComponentUsage;

export { usage };
