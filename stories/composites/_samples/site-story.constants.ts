/* @layer stories @kind data */
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { SiteFooterArgs, SiteHeaderArgs } from './site-story.type';

const SITE_HEADER_ARGS: Partial<SiteHeaderArgs> = { links: true, signedIn: true, title: true, width: 'wide' };

const SITE_HEADER_ARG_TYPES: PlaygroundArgTypes<SiteHeaderArgs> = {
  links: { group: 'Content', control: 'boolean', description: 'Links to the main pages, for a page with no side nav.' },
  signedIn: { group: 'Content', control: 'boolean', description: 'Signed in, the person is the title bar\'s profile action; signed out, a Sign in button.' },
  title: { group: 'Content', control: 'boolean', description: 'The site title beside the logo; it hides on a very narrow screen.' },
  width: { group: 'Layout', control: 'select', options: ['wide', 'phone'], description: 'On a phone the links fold into one menu button.' },
};

const SITE_FOOTER_ARGS: Partial<SiteFooterArgs> = { logo: true, note: true, links: true, width: 'wide' };

const SITE_FOOTER_ARG_TYPES: PlaygroundArgTypes<SiteFooterArgs> = {
  logo: { group: 'Content', control: 'boolean', description: 'A small logo at the start.' },
  note: { group: 'Content', control: 'boolean', description: 'One line of text beside the logo.' },
  links: { group: 'Content', control: 'boolean', description: 'Links at the end; they wrap on a narrow screen.' },
  width: { group: 'Layout', control: 'select', options: ['wide', 'phone'], description: 'On a phone the links wrap under the logo.' },
};

const SITE_HEADER_CODE = `import { BrandMark, PixelWordmark, SideNavLayout, SiteHeader } from '@drizztdourden08/tessera';
import type { WindowTitleBarDropdownAction } from '@drizztdourden08/tessera';

const profile: WindowTitleBarDropdownAction = { id: 'profile', icon: 'user', label: person.name, bar: 'dropdown', groups: accountMenu };

<SiteHeader
  brand={{ logo: <BrandMark app="rotp" size="md" />, title: <PixelWordmark text="Hookshop" colors={colors} size="sm" />, label: 'Hookshop home', href: '/' }}
  navigate={router.push}
  profile={profile}
/>
<SideNavLayout nav={nav} results={results}>{page}</SideNavLayout>`;

export { SITE_FOOTER_ARG_TYPES, SITE_FOOTER_ARGS, SITE_HEADER_ARG_TYPES, SITE_HEADER_ARGS, SITE_HEADER_CODE };
