/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../ai/usage.type';

const usage = {
  job: 'A screen to read, such as About or credits: wide margins and one centred column that scrolls.',
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
    'Put a logo, a wordmark or a hero in lead, and the sections in the children.',
    'Keep width="readable" for text; use width="wide" for a grid of cards, as credits need.',
    'Put legal text in footer, never in the last section.',
    'An AboutPanel goes in as the children of an About screen.',
  ],
  a11y: [
    'The card is a modal dialog named by the title.',
    'Give each section a heading, so a screen reader can jump between them.',
  ],
  tree: {
    path: ['a full screen view', 'reading, such as About or credits'],
    rule: 'One centred column to read.',
  },
  example: `import { AboutPanel, InfoScreen } from '@drizztdourden08/tessera';

const AboutScreen = ({ onClose }: { onClose: () => void }) => (
  <InfoScreen title="About" onClose={onClose} footer="Names and marks belong to their owners.">
    <AboutPanel title="Relic of the Past" brand="rotp" rows={[{ label: 'Version', value: '0.9.2' }]} />
  </InfoScreen>
);
`,
  propsHash: '2a8ecba5773d489b',
} satisfies ComponentUsage;

export { usage };
