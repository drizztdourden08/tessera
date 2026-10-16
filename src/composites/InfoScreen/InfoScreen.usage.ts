/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'An informational window to read, such as About or credits: a small dialog sized to its content and centred, with the title bar, the close button and one column.',
  useWhen: [
    'About the app, credits, a licence or a welcome page.',
    'The user reads and changes nothing: the window has no tools.',
  ],
  avoidWhen: [
    { case: 'The screen holds settings or several pages.', use: 'WorkspaceScreen' },
    { case: 'The screen runs one short task with a status and actions.', use: 'UtilityScreen' },
    { case: 'The screen is one big custom surface.', use: 'StageScreen' },
  ],
  rules: [
    'It opens small: the card fits its content, centred, at most 512 px wide, and only the column scrolls, once the window is too short for it.',
    'Every informational window uses it, so About, credits and the like open at the same small size. A screen with tools is a WorkspaceScreen, a UtilityScreen or a StageScreen.',
    'It has no page header and nothing adds one: the window title bar names it, and the column sits right under it.',
    'Put a logo, the app name, a wordmark or a hero in lead, and the sections in the children.',
    'List credits one entry per line; never widen the window for a grid of cards.',
    'Put legal text in footer, never in the last section.',
    'In a window under 560 px wide the card fills it and the column takes its width; lay out lead and sections so they wrap.',
    'On an About screen, put the logo and the app name in lead and the build facts in a FactsPanel.',
  ],
  a11y: [
    'The card is a modal dialog named by the title.',
    'Give each section a heading, so a screen reader can jump between them.',
  ],
  tree: {
    path: ['a full screen view', 'an informational window with no tools, such as About or credits'],
    rule: 'A small dialog sized to its content, one column to read.',
  },
  example: `import { FactsPanel, H2, InfoScreen, Logo } from '@drizztdourden08/tessera';

const AboutScreen = ({ onClose }: { onClose: () => void }) => (
  <InfoScreen
    title="About"
    onClose={onClose}
    lead={<><Logo brand="rotp" variant="app-icon" size="xl" title="" /><H2>Relic of the Past</H2></>}
    footer="Names and marks belong to their owners."
  >
    <FactsPanel label="This build" groups={[[{ label: 'Version', value: '0.9.2', mono: true }]]} />
  </InfoScreen>
);
`,
  propsHash: 'c7adb144dd344a6b',
} satisfies ComponentUsage;

export { usage };
