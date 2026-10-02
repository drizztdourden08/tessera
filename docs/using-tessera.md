<!-- @layer docs @kind doc -->
# Using Tessera in an app

How an app installs Tessera, themes it and keeps up with it. For how Tessera itself is organised, see `design-system.md`.

The gallery's Core · Setup pages give the short version of each step with code to copy: Setup, TesseraProvider, Building compounds, Building views, and App primitives and composites.

## Install

Tessera is published to GitHub Packages. Point the scope at that registry in the app's `.npmrc`:

```ini
@drizztdourden08:registry=https://npm.pkg.github.com
```

GitHub Packages asks for a token even to read. Put one with the `read:packages` scope in your user `~/.npmrc`, not in the repo:

```ini
//npm.pkg.github.com/:_authToken=<token>
```

Then:

```sh
pnpm add @drizztdourden08/tessera
```

React 19 and React DOM 19 are peer dependencies. The package ships TypeScript and CSS source, not a build: the app's Vite compiles it like its own code.

### Working on Tessera and an app together

With Tessera checked out next to the app, one alias list in the app's `vite.config.ts` makes Vite read the checkout instead of the installed package. It maps every entry of Tessera's `exports`, so each import path keeps working:

```ts
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const TESSERA = fileURLToPath(new URL('../tessera/', import.meta.url));
const { exports } = JSON.parse(readFileSync(`${TESSERA}package.json`, 'utf8'));

const tessera = Object.entries(exports).map(([path, target]) => ({
  find: new RegExp(`^@drizztdourden08/tessera${path.slice(1).replace('*', '(.*)')}$`),
  replacement: TESSERA + target.slice(2).replace('*', '$1'),
}));

export default defineConfig({
  resolve: { alias: tessera, dedupe: ['react', 'react-dom'] },
});
```

Run `pnpm install` in the checkout too, since its files import their own dependencies. `dedupe` keeps one copy of React. The alias is for Vite only: `tsc` still reads the types of the installed version, so keep the package installed.

## Import order

Import Tessera's tokens once, first, then the app's own theme:

```ts
import '@drizztdourden08/tessera/tokens.css';
import './theme.css';
```

`tokens.css` puts everything in the cascade layers `ds.base`, `ds.palette` and `ds.semantic`. The app's `theme.css` is unlayered, so anything it sets wins over every Tessera layer, whatever the selector.

## Theming by palette

An app's look is its palette. `theme.css` sets the seeds:

```css
:root {
  --p-primary: #c8a84e;
  --p-secondary: #4a9966;
  --p-tertiary: #9a9aa4;
  --p-on-primary: #000;
  --p-on-secondary: #000;
  --p-on-tertiary: #000;
}
```

The `--p-on-*` seeds are the text colour on a solid fill of that seed. Every colour role derives from the seeds: `--c-primary`, `--c-primary-bright`, `-dim`, `-soft`, `--c-selected`, the secondary and tertiary sets, the surfaces and the text greys. Any role can still be pinned in `theme.css` when the derived value is not the one you want. The status seeds (`--p-danger`, `--p-warning`, `--p-info`, `--p-success`) and the tag colours can be set the same way.

To give one part of the page another palette, set its seeds under a `data-palette` selector and put the attribute on that element:

```css
[data-palette="archipelia"] {
  --p-primary: #7c4dff;
  --p-secondary: #ece6ff;
  --p-on-primary: #fff;
  --p-on-secondary: #3b2a7a;
}
```

```tsx
<Box data-palette="archipelia">...</Box>
```

The roles are declared on `:root, [data-palette]`, so they derive again inside that subtree from its own seeds.

There is no light or dark switch, because an app's look is its branding and its palette sets it. Tessera has one set of neutrals, dark, and each palette paints its accents over them.

## Tokens

App CSS uses tokens, never raw values: `var(--space-md)`, not `12px`; `var(--c-text-dim)`, not a hex. The families:

| Prefix | What |
|---|---|
| `--p-*` | palette seeds and the ramps built from them |
| `--c-*` | colour roles: surfaces, text, borders, accents, status |
| `--space-*`, `--size-*` | gaps and padding, fixed sizes |
| `--radius-*`, `--border-*`, `--shadow-*` | corners, borders, shadows |
| `--text-*`, `--weight-*`, `--leading-*`, `--tracking-*`, `--font-*` | type |
| `--duration-*`, `--ease-*`, `--transition-*` | motion |
| `--z-*`, `--opacity-*` | stacking and opacity |
| `--brand-*` | each brand's gradient and backdrop |

The gallery's Colours and Tokens sections show every token with its value.

`tokens.json` (`@drizztdourden08/tessera/tokens.json`) holds the same theme as plain values, for code that cannot read CSS custom properties, such as an Electron main process or a native splash window. `brands.<app>` holds each brand's gradient and backdrop, `theme.dark` the main colours as opaque hex, `theme.radius` and `theme.space` the scales, and `palettes.<palette>` the colours for each palette. `splash-tokens.css` sets the same values as literal custom properties, for a static page that loads before the app.

## TesseraProvider

An app that draws some parts its own way hands them to `TesseraProvider` once, at the root. It takes eight overrides, each optional:

| Override | Replaces |
|---|---|
| `spinner` | the loading spinner, also inside buttons and fields |
| `writeText` | what every copy button calls |
| `imagePlaceholder` | what `Image` and `Thumbnail` show while loading, broken or empty |
| `strings` | Tessera's wording, whole or key by key |
| `errorFallback` | the crash screen of `ErrorBoundary` |
| `emptyArt` | the art of `EmptyState` |
| `portalDocument` | the document portals render into |
| `icons` | the icon set behind `Icon` names |

Keep the overrides object a module constant. A new object on each render makes every Tessera component below it render again.

```tsx
const OVERRIDES: TesseraOverrides = { spinner: AppSpinner, strings: { common: { cancel: 'Annuler' } } };

createRoot(root).render(
  <TesseraProvider overrides={OVERRIDES}>
    <App />
  </TesseraProvider>,
);
```

Every Tessera component below the provider uses the overrides, including the ones in portaled dialogs. A provider inside another one keeps the outer overrides and replaces only the ones it names.

## Links and the router

Links are not an override. Two primitives draw them:

- `Link` draws a URL in the Tessera look. `external` opens it in a new tab.
- `RouterLink` draws a route in the app. It renders a real `href`, so middle click and Copy link work, and a plain click calls `onNavigate(to)` instead of loading the page.

Wrap `RouterLink` once in an app compound that passes the router's navigate, then use that compound everywhere:

```tsx
const AppLink = (props: Omit<RouterLinkProps, 'onNavigate' | 'href'>) => {
  const navigate = useNavigate();
  return <RouterLink {...props} href={useHref(props.to)} onNavigate={navigate} />;
};
```

## Import paths

| Path | Holds |
|---|---|
| `@drizztdourden08/tessera` | everything below, from one place |
| `/primitives` | tier 1: layout, text, icons, buttons, inputs, feedback, `TesseraProvider` |
| `/composites` | tier 2: dialogs, menus, navigation, tables, wizards, widgets |
| `/data` | the headless schema, table, filter and view-state engine |
| `/brand` | logos, wordmarks, mascots and brand data |
| `/color-picker`, `/color-picker-popover` | the colour pickers |
| `/field-kits` | the editor and filter control for each field type, and `registerFieldKit` for new ones |
| `/tokens.css` | every token, imported once |
| `/tokens.json`, `/splash-tokens.css` | the theme as plain values |
| `/brand/*` | the brand files: SVG marks, icons, PNGs and `.ico` |

The colour pickers and the field kits have their own paths so an app that never uses them never loads them.

## The gallery

In a Tessera checkout, `pnpm storylite` serves the gallery on `http://localhost:4400`. Every part has an Overview page: what it is for, its variants, its states, a playground with controls, and the code to copy. The logo buttons at the top of the menu redraw every page in each app's palette. Look there first before building something.

## Creating a part with the tessera command

The package ships a `tessera` command. `tessera new` writes a component folder in the shape `brock structure --check` expects, with a usage file and a gallery story, and prints what to fill in next. In an app, run it through pnpm:

```sh
pnpm exec tessera new compound SaveSlot
pnpm exec tessera new view SaveList --group Saves
pnpm exec tessera new primitive HelpWebview --yes
```

In the Tessera repo, `pnpm tessera new primitive QuestBanner --group Layout` runs the same command.

It looks for the nearest `package.json` to know where it runs, and puts each kind in its folder:

| Kind | In an app | In the Tessera repo |
|---|---|---|
| `compound` | `src/compounds/<Name>/` | refused: a compound belongs to an app |
| `view` | `src/views/<Name>/` | refused: a view belongs to an app |
| `primitive` | `src/primitives/<Name>/`, after a warning | `src/primitives/<Name>/` |
| `composite` | `src/composites/<Name>/`, after a warning | `src/composites/<Name>/` |

Each folder gets `<Name>.tsx` built from `Box` and `Text`, `<Name>.type.ts` with its props, `<Name>.css` with tokens only, `index.ts` and `<Name>.usage.ts`. Every field of the usage file holds a sentence that says what to write there: replace each one. `propsHash` matches the props it writes; change the props and `pnpm ai --check` gives the new hash.

In Tessera it also exports the part from its tier barrel, adds its entry to `.storylite/catalogue-*.constants.ts` and its icon to `.storylite/sidebar-icons.constants.ts`, writes an Overview story from the gallery template, then runs `pnpm ai`. In an app that lists `@storylite/storylite`, it writes a story under `stories/`.

An app primitive or composite starts with a warning: most primitives and composites belong in Tessera, so build it there unless only this app will ever need it. The command then asks to confirm. Without a terminal it stops unless `--yes` is given.

| Option | What it does |
|---|---|
| `--group <group>` | the gallery group of its page, such as `Layout`. In Tessera it asks when this is left out |
| `--tree <path>` | where the part sits in the decision tree of `ai/decide.md`, the answers joined by `>`, such as `"actions > one action > a visible word"`. Left out, it asks in a terminal; with no answer picked, the part is a building block |
| `--icon <name>` | the Lucide icon of its gallery page in Tessera, `component` by default |
| `--yes` | creates an app primitive or composite without asking |
| `--dry-run` | lists the files it would write and change, and writes nothing |

## Upgrading

`CHANGELOG.md` lists what changed in each version. `MIGRATION.md` explains each breaking change and what a consuming app does about it. `RENAMES.json` is the machine-readable part: every renamed custom property, component, prop, prop value and CSS class, and every removed export. Replay it over the app's code when upgrading, longer keys first.

## Asking for a missing part

Check the gallery first: the part may exist under another name. If Tessera has no part for what you need, open an issue on the Tessera repository. Say what the part is for, which app needs it, and sketch its props. Until it ships, build it in the app from Tessera primitives, as a compound, so it moves over with little change. Do not copy a Tessera component into the app to change it: ask for the prop instead.
