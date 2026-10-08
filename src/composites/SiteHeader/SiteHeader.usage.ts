/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The band at the top of every page of a website: the logo and the site title as the link home, the main links and the signed-in person.',
  useWhen: [
    'A website such as a store or a community site needs the same band on every page, signed in or not.',
    'A page has no side nav and needs a few links to the main pages, such as Home, Browse and Rules.',
  ],
  avoidWhen: [
    { case: 'A desktop app draws the title bar of its own window.', use: 'WindowTitleBar' },
    { case: 'The header belongs to one view or card inside the page.', use: 'ContentHeader' },
    { case: 'The page needs a menu down the left with its own search.', use: 'SideNavLayout' },
  ],
  rules: [
    'Pass brand with the logo, the site title, a label for the link and its href; the title hides on a very narrow screen.',
    'Pass links only for a page with no side nav, and activeId for the page shown; under 640 px they fold into one menu button.',
    'Pass profile, a WindowTitleBar dropdown action, for the signed-in person: the same action object works in an app title bar.',
    'Signed out, leave profile out and put a Sign in Button in actions.',
    'Build the rest of the page from the app parts: SideNavLayout for the left menu, SettingsPage for a page, Card, FilterBar and DataTable.',
    'Give navigate the app router so a link changes the page without a reload.',
  ],
  a11y: [
    'It is a header landmark; the logo and the title are one link home named by brand.label.',
    'The links are a nav named by label, with aria-current on the page shown.',
    'The phone menu and the profile are menu buttons with aria-haspopup, and their menus take the keys of DropdownMenu.',
  ],
  tree: {
    path: ['layout', 'website chrome', 'the band at the top'],
    rule: 'SiteHeader is the one site-only part on top of the page; everything under it is an app part.',
  },
  example: `import { BrandMark, SiteHeader } from '@drizztdourden08/tessera';
import type { MenuGroup, SiteLink, WindowTitleBarDropdownAction } from '@drizztdourden08/tessera';

interface StoreHeaderProps {
  page: string;
  person: string | null;
  account: MenuGroup[];
  links: SiteLink[];
  go: (href: string) => void;
}

const StoreHeader = ({ page, person, account, links, go }: StoreHeaderProps) => {
  const profile: WindowTitleBarDropdownAction | undefined = person === null
    ? undefined
    : { id: 'profile', icon: 'user', label: person, bar: 'dropdown', groups: account };
  return (
    <SiteHeader
      brand={{ logo: <BrandMark app="rotp" size="md" />, title: 'Hookshop', label: 'Hookshop home', href: '/' }}
      links={links}
      activeId={page}
      navigate={go}
      profile={profile}
    />
  );
};
`,
  propsHash: '969b8aa4f98402c8',
} satisfies ComponentUsage;

export { usage };
