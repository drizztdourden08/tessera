/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { PreviewCards } from './_shared/PreviewCards';
import { HeaderDemo } from './SiteHeader/_samples/HeaderDemo';
import { SignInPage } from './SiteHeader/_samples/SignInPage';
import { SITE_CHOICES, SITE_HEADER_ARG_TYPES, SITE_HEADER_ARGS, SITE_HEADER_CODE, SITE_MAPPING } from './SiteHeader/_samples/site-story.constants';
import type { SiteHeaderArgs } from './SiteHeader/_samples/site-story.type';
import { StoreSite } from './SiteHeader/_samples/StoreSite';
import './SiteHeader.stories.css';

const meta = {
  title: 'Preview · For approval/SiteHeader',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SiteHeaderArgs>;

const Playground = {
  name: 'Playground',
  args: SITE_HEADER_ARGS,
  argTypes: SITE_HEADER_ARG_TYPES,
  render: (args) => <HeaderDemo {...args} />,
} satisfies PlaygroundStory<SiteHeaderArgs>;

const SignedInDesktop = {
  name: 'A signed-in page of the Hookshop, desktop',
  render: () => <StoreSite />,
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const SignedInPhone = {
  name: 'The signed-in page on a phone',
  render: () => <StoreSite phone />,
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const PublicDesktop = {
  name: 'A page with no side nav, with SiteFooter',
  render: () => <SignInPage />,
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const PublicPhone = {
  name: 'The page with no side nav on a phone',
  render: () => <SignInPage phone />,
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const Widths = {
  name: 'Links fold into one menu on a phone',
  render: () => (
    <Demonstrator rows={axis(['wide', 'phone'] as const)} align="start" cell={(width) => <HeaderDemo {...SITE_HEADER_ARGS} width={width} />} />
  ),
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const Overview = overviewStory({
  component: 'SiteHeader',
  description: 'For approval, not a released part: the band at the top of every page of a website, with the brand, links and buttons.',
  points: [
    '**For approval:** this page lives in the gallery only; nothing on it ships until the owner picks an option.',
    '`brand` is the mark and the name; the pair is the link home, and the name hides on a very narrow screen.',
    '`links` with `activeId` lead to the main pages; under 640 px they fold into one menu button.',
    '`actions` sit at the end, such as the signed-in person; `navigate` hands each link to the app router.',
    'With a side nav, put [SideNavLayout] under it: the nav, the search and the phone menu are already there.',
  ],
  instead: '[WindowTitleBar] for the title bar of a desktop window; [ContentHeader] for the head of one view.',
  playground: Playground,
  variants: [SignedInDesktop, SignedInPhone, PublicDesktop, PublicPhone, Widths],
  sections: [
    { title: 'What each part of the site kit becomes', node: <PreviewCards entries={SITE_MAPPING} /> },
    { title: 'Options weighed', node: <PreviewCards entries={SITE_CHOICES} /> },
  ],
  code: SITE_HEADER_CODE,
});

export default meta;
export { Overview, Playground, PublicDesktop, PublicPhone, SignedInDesktop, SignedInPhone, Widths };
