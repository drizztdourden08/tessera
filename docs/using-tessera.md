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
  find: new RegExp(`^@drizztdourden08/tessera${path.slice(1).replace('*', '(.*)')}$`),
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

Put the file at the root of the repo: next to `pnpm-workspace.yaml` in a monorepo, next to `package.json` otherwise. A tool looks for it in the folder it runs in, then in each folder above, and takes the first one it finds. It stops at the top of the repo, the folder with `.git` or `pnpm-workspace.yaml`, so a stray file in a parent folder is never read. Every path in it is relative to the file.

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
| `ai.usage` | `report` lists what the usage check finds and passes; `enforce` fails on it | `report` |
| `ai.out` | the folder `tessera ai` writes the app guide to | `ai` |
| `ai.tree` | the module whose `APP_TREE` adds the app branches to the decision tree | none |
| `ai.tsconfig` | the `tsconfig.json` the usage check reads every part with | the nearest one above each part |
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

Each key of `apps` is an app folder. Its value changes the settings above for a tool run inside that folder: objects merge key by key, and any other value replaces. Most apps set only `parts.views`, since the other parts are shared. Inside an app, the default views folder and theme file are that app's own `src/views` and `src/theme.css`.

### Reading it from a tool

`@drizztdourden08/tessera/config` reads the file from Node, with types:

```ts
import { findTesseraConfig, loadTesseraConfig } from '@drizztdourden08/tessera/config';

const config = loadTesseraConfig(process.cwd());
config?.parts.views; // absolute folders, the app ones when run inside an apps entry
```

`loadTesseraConfig` returns `undefined` when there is no file. Otherwise every path is absolute, every default is filled in, `root` is the folder of the file, and `app` is the app folder when the search started inside an `apps` entry. `findTesseraConfig` returns the path of the file alone.

### The standards extension

Tessera declares an extension for `@drizztdourden08/standards`, so an app that uses both gets it with no setup. From `tessera.config.json` it checks for `Name.usage.ts` in each part folder under `parts`, passes the primitives folders as `primitivesGlobs` to ESLint (only primitives may write raw HTML), and passes `theme.css` as a token file to stylelint. It reads the config at lint time from the root or package the standards factory passes, and a broken config shows as a structure finding instead of stopping the lint.

Its structure check also runs the usage check below on the parts of the package it checks. In `report` mode what it finds prints as notes and the check passes, a missing usage file included; in `enforce` mode each one is a finding.

## Usage rules for app parts

Every part in the `parts` folders of `tessera.config.json` has a `Name.usage.ts` in the same shape as a Tessera part, and the same checks run on it. `tessera new` writes one with each part.

`tessera check` checks the usage files of the app it runs in. In a Brock app, run `brock tessera check`. From the repo root it covers the root `parts` and the views of every `apps` entry; inside an app folder, the parts that app sees. It checks that:

- every part has a usage file, with every field filled;
- no field still holds a sentence `tessera new` wrote;
- each `avoidWhen.use` names a Tessera export or a part of the app;
- each `tree.path` follows the Tessera tree or the app tree down to an answer, and each answer the app tree adds leads to a part;
- each example type-checks against the app;
- `propsHash` matches the props in the code. When it does not, the finding gives the hash to set once the usage is read again.

`ai.usage` decides what a finding does. In `report` mode `tessera check` lists every finding and exits 0; in `enforce` mode any finding makes it exit 1. Start in `report`, fill the usage files, then switch to `enforce`.

`tessera ai` runs the same check, then writes the app guide to `ai.out`. Its `README.md` sends the reader to the Tessera guide in `node_modules/@drizztdourden08/tessera/ai/` first. Then come `decide.md` with the answers the app adds, `index.md` with every app part, a page per part and `registry.json`. A part whose usage still holds a sentence from `tessera new` gets no page. An alternative that names a Tessera part links to its Tessera page.

The check reads the props and the examples with TypeScript, so the app needs `typescript` installed. Each part is read with the nearest `tsconfig.json` above it, or with `ai.tsconfig`. An example is checked as a file in a `.ai-examples` folder beside the app views, so `../SaveList` reaches the view `SaveList`. A part of the `package` is checked beside its own folder and imports from the package name. A usage file and the tree module import types only: the check runs them without the app bundler.

In the Tessera repo, `pnpm ai --check` runs the same checks on Tessera's own parts.

### The app tree

`ai.tree` names a module that adds app branches to the Tessera decision tree. It exports `APP_TREE`, a list of branches. `at` lists the answers that lead to a question of the Tessera tree, `[]` for the first question. `answers` holds the new answers to that question: `null` for an answer that leads to parts, or a new question with its own answers.

```ts
// packages/design/src/ai/tree.ts
import type { AppTree } from '@drizztdourden08/tessera';

const APP_TREE = [
  {
    at: [],
    answers: {
      'a saved game': {
        question: 'What about the save?',
        answers: { 'one save': null, 'the list of saves': null },
      },
    },
  },
  { at: ['data'], answers: { 'a game log': null } },
] as const satisfies AppTree;

declare module '@drizztdourden08/tessera' {
  interface TesseraApps {
    archipelia: { parts: 'SaveSlot' | 'SaveList' | 'GameLog'; tree: typeof APP_TREE };
  }
}

export { APP_TREE };
```

The check refuses an answer the question already has and an `at` that does not end on a question. `tessera new --tree "a saved game > one save"` and the tree prompt of `tessera new` take the app answers too.

### App names and app answers in the types

`ComponentUsage` types `avoidWhen.use` and `tree.path` with the Tessera names and tree. The app adds its own once, by declaration merging into `TesseraApps`, as in the module above. Each key holds the `parts` of one package or app and the `tree` it adds; the names and answers of every key join, so two packages never clash. A usage file stays the same as in Tessera: it imports `ComponentUsage` from `@drizztdourden08/tessera` and ends with `satisfies ComponentUsage`. The module that merges must be in the tsconfig of every package whose usage files name those parts.

## Creating a part with the tessera command

The package ships a `tessera` command. `tessera new` writes a component folder in the shape `standards structure --check` expects, with a usage file and a gallery story, and prints what to fill in next. In a Brock app, run it through the Brock command line, which forwards every argument:

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

Each folder gets `<Name>.tsx` built from `Box` and `Text`, `<Name>.type.ts` with its props, `<Name>.css` with tokens only, `index.ts` and `<Name>.usage.ts`. Every field of the usage file holds a sentence that says what to write there: replace each one. Until then `tessera check` lists the field. `propsHash` matches the props it writes; change the props and `tessera check` gives the new hash (`pnpm ai --check` in Tessera).

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

Other tools run the same commands through `@drizztdourden08/tessera/cli`: `runTessera(['new', 'compound', 'SaveSlot'], { cwd })` and `runTessera(['check'], { cwd })` resolve to the exit code. `brock tessera` is built on it, so `brock tessera check` and `brock tessera ai` reach them too.

## Upgrading

`CHANGELOG.md` lists what changed in each version. `MIGRATION.md` explains each breaking change and what a consuming app does about it. `RENAMES.json` is the machine-readable part: every renamed custom property, component, prop, prop value and CSS class, and every removed export, grouped by the release it shipped in. When upgrading, replay each release between the old and the new version, oldest first, longer keys first inside a map. `brock upgrade` does this for a Brock app.

## Asking for a missing part

Check the gallery first: the part may exist under another name. If Tessera has no part for what you need, open an issue on the Tessera repository. Say what the part is for, which app needs it, and sketch its props. Until it ships, build it in the app from Tessera primitives, as a compound, so it moves over with little change. Do not copy a Tessera component into the app to change it: ask for the prop instead.
