/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { SITE_FOOTER_ARG_TYPES, SITE_FOOTER_ARGS } from './_samples/site-story.constants';
import type { SiteFooterArgs } from './_samples/site-story.type';
import { SiteFooterDemo } from './_samples/SiteFooterDemo';
import { SitePublicPage } from './_samples/SitePublicPage';
import './SiteHeader.stories.css';

const meta = {
  title: 'Composites · Layout/SiteFooter',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SiteFooterArgs>;

const Playground = {
  name: 'Playground',
  args: SITE_FOOTER_ARGS,
  argTypes: SITE_FOOTER_ARG_TYPES,
  render: (args) => <SiteFooterDemo {...args} />,
} satisfies PlaygroundStory<SiteFooterArgs>;

const Widths = {
  name: 'On a desktop and on a phone',
  render: () => <Demonstrator rows={axis(['wide', 'phone'] as const)} align="start" cell={(width) => <SiteFooterDemo {...SITE_FOOTER_ARGS} width={width} />} />,
} satisfies StoryLiteStoryDefinition<SiteFooterArgs>;

const AtTheFoot = {
  name: 'At the foot of a page, under SiteHeader',
  render: () => <SitePublicPage />,
} satisfies StoryLiteStoryDefinition<SiteFooterArgs>;

const OnAPhone = {
  name: 'The same page on a phone',
  render: () => <SitePublicPage phone />,
} satisfies StoryLiteStoryDefinition<SiteFooterArgs>;

const Overview = overviewStory({
  component: 'SiteFooter',
  description: 'The foot of a page of a website: a small logo, one line and a few links.',
  points: [
    '`logo` and `note` sit at the start: a small [Logo] and one line, such as who makes the site.',
    '`links` sit at the end, such as rules, privacy and Discord, and wrap under the logo when narrow.',
    'A link with `external` opens a new tab and says so to a screen reader.',
    '`navigate` hands each local link to the app router, as in [SiteHeader].',
    'It is a `footer` landmark, and its links are a `nav` named by `label`.',
    'Put it last in the page column, under the content; [SiteHeader] holds the band at the top.',
  ],
  instead: '[SaveBar] for the buttons at the foot of a form; [ActionBar] for actions on one item.',
  playground: Playground,
  variants: [Widths, AtTheFoot, OnAPhone],
  code: false,
});

export default meta;
export { AtTheFoot, OnAPhone, Overview, Playground, Widths };
