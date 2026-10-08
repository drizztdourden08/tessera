# SiteHeader

The band at the top of every page of a website: the logo and the site title as the link home, the main links and the signed-in person.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SiteHeader } from '@drizztdourden08/tessera';
```

The source is `src/composites/SiteHeader/SiteHeader.tsx`. Its gallery page is Composites · Layout/SiteHeader (`#/story/composites-siteheader--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Website chrome. Which part of the site? The band at the top.

SiteHeader is the one site-only part on top of the page; everything under it is an app part.

## Use it when

- A website such as a store or a community site needs the same band on every page, signed in or not.
- A page has no side nav and needs a few links to the main pages, such as Home, Browse and Rules.

## Use something else when

- A desktop app draws the title bar of its own window. Use [WindowTitleBar](WindowTitleBar.md) instead.
- The header belongs to one view or card inside the page. Use [ContentHeader](ContentHeader.md) instead.
- The page needs a menu down the left with its own search. Use `SideNavLayout` instead.

## Rules

- Pass brand with the logo, the site title, a label for the link and its href; the title hides on a very narrow screen.
- Pass links only for a page with no side nav, and activeId for the page shown; under 640 px they fold into one menu button.
- Pass profile, a WindowTitleBar dropdown action, for the signed-in person: the same action object works in an app title bar.
- Signed out, leave profile out and put a Sign in Button in actions.
- Build the rest of the page from the app parts: SideNavLayout for the left menu, SettingsPage for a page, Card, FilterBar and DataTable.
- Give navigate the app router so a link changes the page without a reload.

## Accessibility

- It is a header landmark; the logo and the title are one link home named by brand.label.
- The links are a nav named by label, with aria-current on the page shown.
- The phone menu and the profile are menu buttons with aria-haspopup, and their menus take the keys of DropdownMenu.

## Example

```tsx
import { BrandMark, SiteHeader } from '@drizztdourden08/tessera';
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
```

## Props

- `brand`: `SiteHeaderBrand`.
- `links` (optional): `readonly SiteLink[]`. Default `[]`.
- `activeId` (optional): `string`.
- `navigate` (optional): `(href: string) => void`.
- `profile` (optional): `WindowTitleBarDropdownAction`.
- `actions` (optional): `ReactNode`.
- `label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-bg`, `--c-border`, `--c-hover`, `--c-primary`, `--c-primary-soft`, `--c-text`, `--c-text-dim`, `--radius-md`, `--size-48`, `--size-56`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--transition-fast`, `--weight-semi`.
