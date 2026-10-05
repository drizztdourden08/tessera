/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Building block: the page header container WorkspaceScreen and StageScreen show, a card with a header of icon, title and fading backdrop over a body that compacts the header once it scrolls.',
  useWhen: [
    'You build a new kind of screen and it must look like the others, with the same header.',
    'A page in an app frame needs the same header as the pages of a screen.',
  ],
  avoidWhen: [
    { case: 'The screen has pages the user moves between from a side list.', use: 'WorkspaceScreen' },
    { case: 'The screen is read, such as About or credits.', use: 'InfoScreen' },
    { case: 'The screen runs one short task with a status and actions.', use: 'UtilityScreen' },
    { case: 'The screen is one big custom surface.', use: 'StageScreen' },
    { case: 'The page holds settings with a pill per section.', use: 'SettingsPage' },
    { case: 'Only the header, on a card or a panel of your own.', use: 'ContentHeader' },
  ],
  rules: [
    'WorkspaceScreen and StageScreen render it, and neither can turn it off. UtilityScreen shows its header at the top of the window instead, and InfoScreen has none.',
    'Always pass an icon and a title; without them it warns in development.',
    'Leave backdrop out for the default art, pass your own scene, or pass null for a plain header.',
    'Use strip for a few controls after the title, such as section pills or a status, and actions for the end of the header.',
    'On a sub-page, pass back with the name of the parent page and what returns to it; the header draws Back to and that name before the icon.',
    'Put buttons that stay in view in footer; the body scrolls between the header and the footer.',
    'Set scroll={false} when the content scrolls by itself; the header then stays full size.',
  ],
  a11y: [
    'The card is a section named by its title, which is a level 2 heading.',
    'With live, a screen reader reads each new title, as a status does.',
  ],
  buildingBlock: true,
  example: `import { Icon, ScreenPage, ScreenWindow } from '@drizztdourden08/tessera';

const SessionsScreen = ({ onClose }: { onClose: () => void }) => (
  <ScreenWindow title="Sessions" onClose={onClose}>
    <ScreenPage icon={<Icon name="layers" />} title="Friday async">
      Sessions list
    </ScreenPage>
  </ScreenWindow>
);
`,
  propsHash: 'f2961d164b031fe1',
} satisfies ComponentUsage;

export { usage };
