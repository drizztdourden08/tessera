<!-- @layer docs @kind doc -->
# Tessera

The design system shared by Relic of the Past, Brock and Archipelia: tokens, primitives, composites and the headless data engine. Compounds and views stay in each app.

## Using it

The full guide is [docs/using-tessera.md](docs/using-tessera.md): installing, theming, the provider, the import paths and upgrading. The basics:

```ts
import '@drizztdourden08/tessera/tokens.css';   // once, first
import './theme.css';                            // the app's palette, after it
import { Button } from '@drizztdourden08/tessera/primitives';
import { DataTable } from '@drizztdourden08/tessera/composites';
```

The colour pickers and the field kits have their own paths, `@drizztdourden08/tessera/color-picker`, `/color-picker-popover` and `/field-kits`, so an app that never uses them never loads them.

An app's `theme.css` sets the palette seeds, unlayered, so they beat every Tessera layer:

```css
:root { --p-primary: #7c4dff; --p-secondary: #ece6ff; --p-tertiary: #3b2a7a; --p-on-primary: #fff; --p-on-secondary: #3b2a7a; --p-on-tertiary: #fff; }
```

Every accent role (`--c-primary-bright`, `-dim`, `-soft`, `--c-selected`, the secondary set) derives from those seeds; any one of them can still be pinned. There is one set of neutrals, dark: Tessera has no light and dark themes, because an app's look is its branding, set by its palette. `data-palette` on an element re-derives the accents there.

An app that draws some parts its own way hands them to `TesseraProvider` once, at the root: the spinner, the clipboard writer behind every copy button, the image placeholder, Tessera's wording (`TESSERA_STRINGS`, whole or key by key), the `ErrorBoundary` crash screen, the `EmptyState` art, the document portals render into and the icon set behind `Icon` names. Every Tessera component below the provider uses them, including the ones in portaled dialogs.

```tsx
const OVERRIDES: TesseraOverrides = { spinner: AppSpinner, strings: { common: { cancel: 'Annuler' } } };

<TesseraProvider overrides={OVERRIDES}><App /></TesseraProvider>
```

Links are not an override: `Link` draws a URL and `RouterLink` a route in the app, taking the router's navigate as a prop. The gallery's Core · Setup pages walk through the setup, the provider and where the app's own compounds and views go.

The package ships TypeScript and CSS source: its consumers are Vite apps, which compile it like their own code. That also means a sibling checkout can stand in for the installed package with one Vite alias while editing both.

## Status

| Phase | State |
|---|---|
| 1. Copy out of relic-of-the-past, lint green | done |
| 2. Semantic token layer: `--p-*` seeds, `ds.base` / `ds.palette` / `ds.semantic` layers, role-named colours | done |
| 3. App couplings cut: generic Widget, view-state session store and storage provider, configurable id pattern | done |
| 4. Storylite gallery: 225 stories for every component, palette switch, contrast story passing in every palette | done |
| 5. Package: exports map, `npm pack` checked, a Vite app built against the tarball | done; publishing to GitHub Packages waits for the repo |

`MIGRATION.md` lists every change relic-of-the-past applies when it becomes a consumer. `BACKLOG.md` lists the component issues found while writing the stories, fixed and open.

## Layout

```
src/
  tokens/       CSS custom properties, single entry index.css
  primitives/   tier 1, presentational
  composites/   tier 2, presentational
  data/         headless schema, table, filter and view-state engine
stories/        Storylite gallery, one file per component
brand/          the logo and why it looks the way it does
docs/           the standards this repo follows
```

## Commands

```
pnpm install
pnpm storylite   the gallery on http://localhost:4400
pnpm lint        tsc, eslint, stylelint
pnpm lint:md
```

How Tessera is built, its tiers and where an app's own parts go: [docs/design-system.md](docs/design-system.md). How code is written: [docs/coding-standards.md](docs/coding-standards.md).

## The gallery

- **Menu.** One folder per tier and group, like `Primitives · Inputs`, in the order of `.storylite/catalogue.constants.ts`. The home page shows the interactive logo and how to find your way; it does not repeat the menu.
- **Adding a component.** Add its entry to the catalogue, write `stories/<tier>/<Name>.stories.tsx` with the title `<Tier> · <Group>/<Name>`, and put its controls (`args`, `argTypes`) on the stories whose render reads them, never on the file's `meta`: a control on `meta` shows up, dead, on every story in the file.
- **Looks.** The logo buttons at the top of the menu redraw every story as Tessera's own greys, Relic of the Past or Archipelia. There is no light and dark switch: each look is shown on its dark ground.

## Credits

- Icons from [Lucide](https://lucide.dev) (ISC licence) and [Phosphor Icons](https://phosphoricons.com) (MIT licence, copyright Phosphor Icons). The Shortcut mouse buttons for the wheel tilt, wheel scroll arrows and side buttons are built from Phosphor's own shapes.
- Fonts: Inter and Chakra Petch under the SIL Open Font License, and the game dialogue face under CC BY 3.0; each licence ships beside its font.
