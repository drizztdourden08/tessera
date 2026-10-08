/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The foot of a page of a website: a small logo, one line of text and a few links such as rules, privacy and Discord.',
  useWhen: [
    'A public page of a website ends with the same small line on every page.',
    'A site needs a fixed place for its rules, its privacy page and its community links.',
  ],
  avoidWhen: [
    { case: 'The buttons at the foot of a form that save or cancel.', use: 'SaveBar' },
    { case: 'The band at the top of the site with the main links.', use: 'SiteHeader' },
  ],
  rules: [
    'Keep it small: a Logo at sm, one line in note and a few links; the main pages belong in SiteHeader.',
    'Mark a link to another site external, so it opens a new tab.',
    'Put it last in the page column, under the content, and give navigate the app router.',
  ],
  a11y: [
    'It is a footer landmark, and its links are a nav named by label.',
    'An external link says it opens a new tab to a screen reader.',
  ],
  tree: {
    path: ['layout', 'website chrome', 'the line at the foot'],
    rule: 'SiteFooter is the one line at the foot of a website page, under the app parts.',
  },
  example: `import { Logo, SiteFooter } from '@drizztdourden08/tessera';
import type { SiteLink } from '@drizztdourden08/tessera';

const LINKS: SiteLink[] = [
  { id: 'rules', label: 'Publishing rules', href: '/rules' },
  { id: 'privacy', label: 'Privacy', href: '/privacy' },
  { id: 'discord', label: 'Discord', href: 'https://discord.com', external: true },
];

const StoreFooter = ({ go }: { go: (href: string) => void }) => (
  <SiteFooter logo={<Logo brand="rotp" size="sm" />} note="Made by players for Relic of the Past." links={LINKS} navigate={go} />
);
`,
  propsHash: '505122ce17d6b89c',
} satisfies ComponentUsage;

export { usage };
