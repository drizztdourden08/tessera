/* @layer stories @kind data */
import type { PlaygroundArgTypes } from '../../../_template/controls/playground.type';
import type { PreviewCardEntry } from '../../_shared/preview-card.type';
import type { SiteHeaderArgs } from './site-story.type';

const SITE_HEADER_ARGS: Partial<SiteHeaderArgs> = { links: true, actions: true, name: true, width: 'wide' };

const SITE_HEADER_ARG_TYPES: PlaygroundArgTypes<SiteHeaderArgs> = {
  links: { group: 'Content', control: 'boolean', description: 'Links to the main pages, for a site with no side nav.' },
  actions: { group: 'Content', control: 'boolean', description: 'Buttons at the end, such as the signed-in person.' },
  name: { group: 'Content', control: 'boolean', description: 'The name beside the mark; it hides on a very narrow screen.' },
  width: { group: 'Layout', control: 'select', options: ['wide', 'phone'], description: 'On a phone the links fold into one menu button.' },
};

const SITE_CHOICES: readonly PreviewCardEntry[] = [
  {
    name: 'A. SiteHeader, the rest built from what Tessera has',
    badge: 'Recommended',
    tone: 'success',
    text: 'One new part: the band at the top of every page of a site, with the brand as the home link, buttons at the end, and links that fold into one menu button on a phone. The frame, the section page, the side column and the list area are recipes of SideNavLayout, SettingsPage, Card, FilterBar and DataTable.',
  },
  {
    name: 'B. SiteHeader and SiteFooter',
    badge: 'Considered',
    text: 'Adds the foot of a public page: a small logo, one line of text and links such as rules, privacy and Discord. Neither site has a footer today, so it replaces nothing yet; it would serve a public store front.',
  },
  {
    name: 'C. No new part: SideNavLayout gains a header',
    badge: 'Considered',
    text: 'The layout draws the band with the brand above the nav and the page. One less part, but a page with no side nav, such as sign in, gets no header, and each site builds its own brand link and phone menu.',
  },
];

const SITE_MAPPING: readonly PreviewCardEntry[] = [
  { name: 'SiteFrame, signed in', badge: 'Exists', tone: 'success', text: 'SideNavLayout draws the side nav, the page beside it, the search results in place of the page and the menu on a phone. The band on top is SiteHeader.' },
  { name: 'SiteFrame, no nav', badge: 'Recipe', tone: 'info', text: 'Sign in, waiting and device pages: SiteHeader, or the brand alone, over a Card in the middle.' },
  { name: 'Brand', badge: 'Exists', tone: 'success', text: 'Logo.Combined for the four apps; BrandMark beside PixelWordmark for a site name such as Hookshop. SiteHeader makes it the home link.' },
  { name: 'SiteNav', badge: 'Exists', tone: 'success', text: 'SideNav, which RotP calls SectionNav. Which sections each person sees stays in the app.' },
  { name: 'SitePage', badge: 'Recipe', tone: 'info', text: 'SettingsPage holds the icon, the title, the tabs and the header buttons; the side column sits in a row beside it.' },
  { name: 'SideColumn', badge: 'Recipe', tone: 'info', text: 'A column of Cards with a set width beside the page.' },
  { name: 'Workbench', badge: 'Recipe', tone: 'info', text: 'FilterBar over a DataTable; ListDetailLayout when the detail sits beside the list.' },
  { name: 'Footer', badge: 'Not in RotP', tone: 'warning', text: 'Neither site has one. SiteFooter is option B.' },
];

const SITE_HEADER_CODE = `import { BrandMark, PixelWordmark, SideNavLayout, SiteHeader } from '@drizztdourden08/tessera';

<SiteHeader
  brand={{ mark: <BrandMark app="rotp" size="sm" />, name: <PixelWordmark text="Hookshop" colors={colors} size="sm" />, label: 'Hookshop home', href: '/' }}
  navigate={router.push}
  actions={<AccountMenu />}
/>
<SideNavLayout nav={nav} results={results}>{page}</SideNavLayout>`;

export { SITE_CHOICES, SITE_HEADER_ARG_TYPES, SITE_HEADER_ARGS, SITE_HEADER_CODE, SITE_MAPPING };
