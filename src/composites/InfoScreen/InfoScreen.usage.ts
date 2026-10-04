/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A screen to read, such as About or credits: the page header with its icon and heading, then wide margins and one centred column that scrolls.',
  useWhen: [
    'About the app, credits, a licence or a welcome page.',
    'The user reads and changes nothing.',
  ],
  avoidWhen: [
    { case: 'The screen holds settings or several pages.', use: 'WorkspaceScreen' },
    { case: 'The screen runs one short task with a status and actions.', use: 'UtilityScreen' },
    { case: 'The screen is one big custom surface.', use: 'StageScreen' },
  ],
  rules: [
    'Give it an icon and a heading for the page header, which every screen kind shows and nothing turns off.',
    'Put a logo, a wordmark or a hero in lead, and the sections in the children.',
    'Keep width="readable" for text; use width="wide" for a grid of cards, as credits need.',
    'Put legal text in footer, never in the last section.',
    'On an About screen, put the app name in heading, the logo in lead and the build facts in a FactsPanel.',
  ],
  a11y: [
    'The card is a modal dialog named by the title.',
    'Give each section a heading, so a screen reader can jump between them.',
  ],
  tree: {
    path: ['a full screen view', 'reading, such as About or credits'],
    rule: 'One centred column to read.',
  },
  example: `import { FactsPanel, Icon, InfoScreen, Logo } from '@drizztdourden08/tessera';

const AboutScreen = ({ onClose }: { onClose: () => void }) => (
  <InfoScreen
    title="About"
    icon={<Icon name="info" />}
    heading="Relic of the Past"
    onClose={onClose}
    lead={<Logo brand="rotp" variant="app-icon" size="xl" title="" />}
    footer="Names and marks belong to their owners."
  >
    <FactsPanel label="This build" groups={[[{ label: 'Version', value: '0.9.2', mono: true }]]} />
  </InfoScreen>
);
`,
  propsHash: 'a7556a8bb109c292',
} satisfies ComponentUsage;

export { usage };
