/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Logo } from '../../src/brand';
import { Box } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { FOOTER_LINKS, SITE_TEXT } from './SiteHeader/_samples/site-samples.constants';
import { SiteFooter } from './SiteFooter/SiteFooter';
import './SiteHeader.stories.css';

type FooterArgs = { width: 'wide' | 'phone' };

const meta = {
  title: 'Preview · For approval/SiteFooter',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FooterArgs>;

const Sample = ({ width }: FooterArgs) => (
  <Box className={`site-story__header-frame${width === 'phone' ? ' site-story__header-frame--phone' : ''}`} data-palette="rotp">
    <SiteFooter brand={<Logo brand="rotp" size="sm" />} note={SITE_TEXT.footerNote} links={FOOTER_LINKS} navigate={() => undefined} />
  </Box>
);

const Widths = {
  name: 'On a desktop and on a phone',
  render: () => <Demonstrator rows={axis(['wide', 'phone'] as const)} align="start" cell={(width) => <Sample width={width} />} />,
} satisfies StoryLiteStoryDefinition<FooterArgs>;

const Overview = overviewStory({
  component: 'SiteFooter',
  description: 'For approval, not a released part: the foot of a public page of a website, with a small logo, a line and links.',
  points: [
    '**For approval:** option B of [SiteHeader]; neither RotP site has a footer today.',
    '`brand` and `note` sit at the start; `links` wrap at the end and an `external` link opens a new tab.',
    'It has no behaviour of its own, so it would ship as a primitive.',
  ],
  variants: [Widths],
  code: false,
});

export default meta;
export { Overview, Widths };
