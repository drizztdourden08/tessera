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

With Tessera checked out next to the app, one alias list in the app's `vite.config.ts` makes Vite read the checkout instead of the installed package. It maps every entry of Tessera's `exports`, so each import path keeps working. An entry with types, such as `./config`, is an object, and the alias takes its `default`:

```ts
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const TESSERA = fileURLToPath(new URL('../tessera/', import.meta.url));
const { exports } = JSON.parse(readFileSync(`${TESSERA}package.json`, 'utf8'));

const tessera = Object.entries(exports).map(([path, target]) => ({
  find: new RegExp(`^@drizztdourden08/tessera${path.slice(1).replace('*', '(.*)')}<!-- @layer docs @kind doc -->
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

),
  replacement: TESSERA + (target.default ?? target).slice(2).replace('*', '$1'),
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
| `/config` | `loadTesseraConfig` and `findTesseraConfig`, for Node tools that read `tessera.config.json` |
| `/tessera.config.schema.json` | the schema of `tessera.config.json` |

The colour pickers and the field kits have their own paths so an app that never uses them never loads them.

## The gallery

In a Tessera checkout, `pnpm storylite` serves the gallery on `http://localhost:4400`. Every part has an Overview page: what it is for, its variants, its states, a playground with controls, and the code to copy. The logo buttons at the top of the menu redraw every page in each app's palette. Look there first before building something.

## tessera.config.json

Tessera's tools run from `node_modules`, so they cannot guess where an app keeps its own parts. `tessera.config.json` tells them. `tessera new`, the standards extension and any other Tessera tool read it.

Put the file at the root of the repo: next to `pnpm-workspace.yaml` in a monorepo, next to `package.json` otherwise. A tool looks for it in the folder it runs in, then in each folder above, and takes the first one it finds. Every path in it is relative to the file.

A new single-app repo starts with only the schema line, which gives the editor its hints:

```json
{
  "$schema": "./node_modules/@drizztdourden08/tessera/tessera.config.schema.json"
}
```

Every key is optional:

| Key | What it says | Default |
|---|---|---|
| `package` | the workspace package that holds the shared parts, such as `@archipelia/design` | none |
| `parts.primitives` | the app primitives | `src/primitives` |
| `parts.composites` | the app composites | `src/composites` |
| `parts.compounds` | the compounds | `src/compounds` |
| `parts.views` | the views | `src/views` |
| `stories` | the gallery stories | `stories` |
| `theme.css` | the theme stylesheet | `src/theme.css` |
| `theme.palette` | the `data-palette` name of the app palette | none |
| `ai.usage` | `report` lists the parts with no usage file and passes; `enforce` fails on them | `report` |
| `ai.out` | the folder `pnpm ai` writes | `ai` |
| `ai.tree` | the module that holds the decision tree of the app parts | none |
| `gallery` | `title`, `port` and `review` of the StoryLite gallery, read only when `@storylite/storylite` is installed | none |
| `overrides` | the file that builds the app `TesseraOverrides` | none |
| `apps` | settings per app, below | none |

Each `parts` entry takes a folder, a glob, or a list of them. `tessera new` writes into the first one, and `--into <folder>` picks another one of the list.

A key the schema does not know, or a value of the wrong type, stops the tool with an error that names the key, such as `"gallery.port" is a string; it takes a whole number`.

### A monorepo

In a monorepo, the shared parts live in one workspace package, `packages/design`, named `@<scope>/design`. The compounds, the rare app primitives and composites, the stories and the theme sit there. Each app keeps its own views in its own folder.

```text
pnpm-workspace.yaml
tessera.config.json
packages/design/          @archipelia/design
  src/primitives/
  src/composites/
  src/compounds/
  src/theme.css
  stories/
apps/desktop/
  src/views/
apps/web/
  src/views/
```

```json
{
  "$schema": "./node_modules/@drizztdourden08/tessera/tessera.config.schema.json",
  "package": "@archipelia/design",
  "parts": {
    "primitives": "packages/design/src/primitives",
    "composites": "packages/design/src/composites",
    "compounds": "packages/design/src/compounds"
  },
  "stories": "packages/design/stories",
  "theme": { "css": "packages/design/src/theme.css", "palette": "archipelia" },
  "apps": {
    "apps/desktop": { "parts": { "views": "apps/desktop/src/views" } },
    "apps/web": { "parts": { "views": "apps/web/src/views" } }
  }
}
```

Each key of `apps` is an app folder. Its value changes the settings above for a tool run inside that folder: objects merge key by key, and any other value replaces. Most apps set only `parts.views`, since the other parts are shared.

### Reading it from a tool

`@drizztdourden08/tessera/config` reads the file from Node, with types:

```ts
import { findTesseraConfig, loadTesseraConfig } from '@drizztdourden08/tessera/config';

const config = loadTesseraConfig(process.cwd());
config?.parts.views; // absolute folders, the app ones when run inside an apps entry
```

`loadTesseraConfig` returns `undefined` when there is no file. Otherwise every path is absolute, every default is filled in, `root` is the folder of the file, and `app` is the app folder when the search started inside an `apps` entry. `findTesseraConfig` returns the path of the file alone.

### The standards extension

Tessera declares an extension for `@drizztdourden08/standards`, so an app that uses both gets it with no setup. From `tessera.config.json` it requires `Name.usage.ts` in each part folder under `parts`, passes the primitives and composites folders as `primitivesGlobs` to ESLint, and passes `theme.css` as a token file to stylelint.

## Creating a part with the tessera command

The package ships a `tessera` command. `tessera new` writes a component folder in the shape `brock structure --check` expects, with a usage file and a gallery story, and prints what to fill in next. In a Brock app, run it through the Brock command line, which forwards every argument:

```sh
brock tessera new compound SaveSlot
brock tessera new view SaveList --group Saves
brock tessera new primitive HelpWebview --yes
```

In a repo with its own command, use that one, as in `archipelia tessera new view Inventory --group Game`. Outside Brock, `pnpm exec tessera` runs the same commands.

In the Tessera repo, `pnpm tessera new primitive QuestBanner --group Layout` runs the same command.

It reads `tessera.config.json` to know where it runs and where each kind goes. Tessera must be installed in the app or at the root of the repo. A view goes to the `parts.views` of the app it runs in. With no `tessera.config.json`, it takes the nearest `package.json` that lists Tessera, writes to the default folders and prints a hint to add the file. The default folders:

| Kind | In an app | In the Tessera repo |
|---|---|---|
| `compound` | `src/compounds/<Name>/` | refused: a compound belongs to an app |
| `view` | `src/views/<Name>/` | refused: a view belongs to an app |
| `primitive` | `src/primitives/<Name>/`, after a warning | `src/primitives/<Name>/` |
| `composite` | `src/composites/<Name>/`, after a warning | `src/composites/<Name>/` |

It refuses a name already taken in any `parts` folder. The story goes under the `stories` folder, in `<kind>s/`, and imports the part by its relative path.

Each folder gets `<Name>.tsx` built from `Box` and `Text`, `<Name>.type.ts` with its props, `<Name>.css` with tokens only, `index.ts` and `<Name>.usage.ts`. Every field of the usage file holds a sentence that says what to write there: replace each one. `propsHash` matches the props it writes; change the props and `pnpm ai --check` gives the new hash.

In Tessera it also exports the part from its tier barrel, adds its entry to `.storylite/catalogue-*.constants.ts` and its icon to `.storylite/sidebar-icons.constants.ts`, writes an Overview story from the gallery template, then runs `pnpm ai`. In an app, it writes the story when `@storylite/storylite` is listed by the app, by the repo root or by the package that holds the `stories` folder.

An app primitive or composite starts with a warning: most primitives and composites belong in Tessera, so build it there unless only this app will ever need it. The command then asks to confirm. Without a terminal it stops unless `--yes` is given.

| Option | What it does |
|---|---|
| `--group <group>` | the gallery group of its page, such as `Layout`. In Tessera it asks when this is left out |
| `--tree <path>` | where the part sits in the decision tree of `ai/decide.md`, the answers joined by `>`, such as `"actions > one action > a visible word"`. Left out, it asks in a terminal; with no answer picked, the part is a building block |
| `--into <folder>` | the folder to write in, when `tessera.config.json` lists more than one for the kind |
| `--icon <name>` | the Lucide icon of its gallery page in Tessera, `component` by default |
| `--yes` | creates an app primitive or composite without asking |
| `--dry-run` | lists the files it would write and change, and writes nothing |

Other tools run the same commands through `@drizztdourden08/tessera/cli`: `runTessera(['new', 'compound', 'SaveSlot'], { cwd })` resolves to the exit code. `brock tessera` is built on it.

## Upgrading

`CHANGELOG.md` lists what changed in each version. `MIGRATION.md` explains each breaking change and what a consuming app does about it. `RENAMES.json` is the machine-readable part: every renamed custom property, component, prop, prop value and CSS class, and every removed export. Replay it over the app's code when upgrading, longer keys first.

## Asking for a missing part

Check the gallery first: the part may exist under another name. If Tessera has no part for what you need, open an issue on the Tessera repository. Say what the part is for, which app needs it, and sketch its props. Until it ships, build it in the app from Tessera primitives, as a compound, so it moves over with little change. Do not copy a Tessera component into the app to change it: ask for the prop instead.
