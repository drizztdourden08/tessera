# SiteFooter

The foot of a page of a website: a small logo, one line of text and a few links such as rules, privacy and Discord.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SiteFooter } from '@drizztdourden08/tessera';
```

The source is `src/composites/SiteFooter/SiteFooter.tsx`. Its gallery page is Composites · Layout/SiteFooter (`#/story/composites-sitefooter--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Website chrome. Which part of the site? The line at the foot.

SiteFooter is the one line at the foot of a website page, under the app parts.

## Use it when

- A public page of a website ends with the same small line on every page.
- A site needs a fixed place for its rules, its privacy page and its community links.

## Use something else when

- The buttons at the foot of a form that save or cancel. Use [SaveBar](SaveBar.md) instead.
- The band at the top of the site with the main links. Use [SiteHeader](SiteHeader.md) instead.

## Rules

- Keep it small: a Logo at sm, one line in note and a few links; the main pages belong in SiteHeader.
- Mark a link to another site external, so it opens a new tab.
- Put it last in the page column, under the content, and give navigate the app router.

## Accessibility

- It is a footer landmark, and its links are a nav named by label.
- An external link says it opens a new tab to a screen reader.

## Example

```tsx
import { Logo, SiteFooter } from '@drizztdourden08/tessera';
import type { SiteLink } from '@drizztdourden08/tessera';

const LINKS: SiteLink[] = [
  { id: 'rules', label: 'Publishing rules', href: '/rules' },
  { id: 'privacy', label: 'Privacy', href: '/privacy' },
  { id: 'discord', label: 'Discord', href: 'https://discord.com', external: true },
];

const StoreFooter = ({ go }: { go: (href: string) => void }) => (
  <SiteFooter logo={<Logo brand="rotp" size="sm" />} note="Made by players for Relic of the Past." links={LINKS} navigate={go} />
);
```

## Props

- `logo` (optional): `ReactNode`.
- `note` (optional): `ReactNode`.
- `links` (optional): `readonly SiteLink[]`. Default `[]`.
- `navigate` (optional): `(href: string) => void`.
- `label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-bg`, `--c-border`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xl`, `--space-xs`, `--text-sm`.
