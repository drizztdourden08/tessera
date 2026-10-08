/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { SITE_HEADER_ARG_TYPES, SITE_HEADER_ARGS, SITE_HEADER_CODE } from './_samples/site-story.constants';
import type { SiteHeaderArgs } from './_samples/site-story.type';
import { SiteHeaderDemo } from './_samples/SiteHeaderDemo';
import { SitePublicPage } from './_samples/SitePublicPage';
import { SiteSignIn } from './_samples/SiteSignIn';
import { SiteStore } from './_samples/SiteStore';
import './SiteHeader.stories.css';

const meta = {
  title: 'Composites · Layout/SiteHeader',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SiteHeaderArgs>;

const Playground = {
  name: 'Playground',
  args: SITE_HEADER_ARGS,
  argTypes: SITE_HEADER_ARG_TYPES,
  render: (args) => <SiteHeaderDemo {...args} />,
} satisfies PlaygroundStory<SiteHeaderArgs>;

const SignedInOut = {
  name: 'Signed in and signed out',
  render: () => (
    <Demonstrator rows={axis(['signed in', 'signed out'] as const)} align="start" cell={(state) => <SiteHeaderDemo {...SITE_HEADER_ARGS} signedIn={state === 'signed in'} />} />
  ),
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const Widths = {
  name: 'Links fold into one menu on a phone',
  render: () => (
    <Demonstrator rows={axis(['wide', 'phone'] as const)} align="start" cell={(width) => <SiteHeaderDemo {...SITE_HEADER_ARGS} width={width} />} />
  ),
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const SitePage = {
  name: 'Recipe: a signed-in site page, the app parts marked',
  render: () => <SiteStore labels />,
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const SitePhone = {
  name: 'Recipe: the signed-in page on a phone',
  render: () => <SiteStore phone />,
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const SignIn = {
  name: 'Recipe: sign in on the brand gradient, dark and light',
  render: () => <Demonstrator columns={axis(['dark', 'light'] as const)} align="start" cell={(_, ground) => <SiteSignIn ground={ground} />} />,
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const PublicPage = {
  name: 'Recipe: a page with no side nav, signed out',
  render: () => <SitePublicPage />,
} satisfies StoryLiteStoryDefinition<SiteHeaderArgs>;

const Overview = overviewStory({
  component: 'SiteHeader',
  description: 'The band at the top of every page of a website: the logo and the title, the main links and the person.',
  points: [
    '`brand` is the logo and the site title; the pair is the link home, and the title hides under 320 px.',
    '`links` with `activeId` lead to the main pages; under 640 px they fold into one menu button.',
    '`profile` is the person as a [WindowTitleBar] dropdown action, drawn by the title bar\'s own button.',
    'Signed out, pass a Sign in Button in `actions`; `navigate` hands each link to the app router.',
    'Pages under it are the app\'s own: [SideNavLayout], [SettingsPage], [Card], [FilterBar], [DataTable].',
    'Sign in is a [Card] on the palette gradient of the [Splash], with no band; [SiteFooter] sits at the foot.',
  ],
  instead: '[WindowTitleBar] for the title bar of a desktop window; [ContentHeader] for the head of one view.',
  playground: Playground,
  variants: [SignedInOut, Widths, SitePage, SitePhone, SignIn, PublicPage],
  code: SITE_HEADER_CODE,
});

export default meta;
export { Overview, Playground, PublicPage, SignedInOut, SignIn, SitePage, SitePhone, Widths };
