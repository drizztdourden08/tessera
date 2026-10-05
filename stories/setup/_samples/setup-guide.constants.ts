/* @layer stories @kind data */
import { GUIDE_LINKS } from './guide-links.constants';
import type { Guide } from './guide.type';

const SETUP_GUIDE: Guide = {
  name: 'Setup',
  description: 'What an app does once to use Tessera: install it, load the tokens and its theme, set its palette and wrap the root.',
  points: [
    'Install it from GitHub Packages, with a `read:packages` token kept in your user `~/.npmrc`.',
    'Import `tokens.css` first in the entry file, then the app `theme.css`.',
    'Set the `--p-*` seeds in `theme.css`; every `--c-*` colour role derives from them.',
    'Wrap the root once in [TesseraProvider], naming only the parts the app draws its own way.',
    `The long form, with the registry and the local checkout alias: ${GUIDE_LINKS.usingTessera}.`,
  ],
  topics: [
    {
      title: 'Install',
      points: [
        'Tessera is on GitHub Packages. Point the `@drizztdourden08` scope at it in the app `.npmrc`.',
        'Reading needs a token with `read:packages`. Put it in your user `~/.npmrc`, never in the repo.',
        'React 19 and React DOM 19 are peer dependencies.',
        'Tessera ships TypeScript and CSS source. The app Vite build compiles it like its own code.',
      ],
      code: '@drizztdourden08:registry=https://npm.pkg.github.com\n\npnpm add @drizztdourden08/tessera',
      language: 'text',
    },
    {
      title: 'Tokens, then the theme',
      points: [
        'Import `tokens.css` once, first, in the entry file. Then the app `theme.css`.',
        'Tessera sits in the layers `ds.base`, `ds.palette` and `ds.semantic`. The theme is unlayered, so it wins over all of them.',
        'App CSS uses tokens only: `var(--space-md)`, not `12px`. Core · Tokens and Core · Colours list every one.',
      ],
      code: 'import \'@drizztdourden08/tessera/tokens.css\';\nimport \'./theme.css\';',
      language: 'typescript',
    },
    {
      title: 'Palette',
      points: [
        'The palette is the app look. Set the `--p-*` seeds in `theme.css`. Every `--c-*` role derives from them.',
        'Pin one role in `theme.css` when its derived value is not the one you want.',
        'Give one part of the page its own palette with `data-palette` on its element.',
        'There is no light or dark switch. Tessera has one set of dark neutrals.',
      ],
      code: ':root {\n  --p-primary: #c8a84e;\n  --p-secondary: #4a9966;\n  --p-tertiary: #9a9aa4;\n  --p-on-primary: #000;\n  --p-on-secondary: #000;\n  --p-on-tertiary: #000;\n}\n\n[data-palette="archipelia"] {\n  --p-primary: #7c4dff;\n  --p-on-primary: #fff;\n}',
      language: 'text',
    },
    {
      title: 'tessera.config.json',
      points: [
        'Tessera tools run from `node_modules`, so `tessera.config.json` tells them where the app parts live. Put it at the repo root, next to `pnpm-workspace.yaml` in a monorepo.',
        'A new single-app repo needs only the `$schema` line. Each folder then has its default: `src/primitives`, `src/composites`, `src/compounds`, `src/views`, `stories` and `src/theme.css`.',
        'In a monorepo, the shared parts live in `packages/design`, a workspace package named `@<scope>/design`. Each app sets its own `parts.views` under `apps`.',
        'Paths are relative to the file. A tool reads the first `tessera.config.json` in its folder or above it.',
        `Every key and its default: ${GUIDE_LINKS.usingTessera}.`,
      ],
      code: `{
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
    "apps/desktop": { "parts": { "views": "apps/desktop/src/views" } }
  }
}`,
      language: 'json',
    },
    {
      title: 'Wrap the root',
      points: [
        'Wrap the root once in `TesseraProvider`. Name only the parts the app draws its own way; the rest keep the Tessera default.',
        'Keep the overrides object a module constant, so Tessera does not render again on every app render.',
        `Every override, with a demo: ${GUIDE_LINKS.provider}.`,
        `Links are not an override. Use ${GUIDE_LINKS.link} for a URL, and ${GUIDE_LINKS.link} with \`navigate\` for a route in the app.`,
      ],
    },
    {
      title: 'Fonts',
      points: [
        '`tokens.css` loads Inter, Chakra Petch and the game face from the package. There is nothing else to load.',
        'Use the font tokens: `--font-sans` for text, `--font-title` for titles, `--font-mono` for code.',
        'Core · Typography shows each face, weight and size.',
      ],
    },
    {
      title: 'The gallery',
      points: [
        'In a Tessera checkout, `pnpm storylite` serves this gallery on `http://localhost:4400`.',
        'Every part has an Overview: what it is for, its variants, its states, a playground and the code to copy.',
        'The app switcher at the top of the menu redraws every page in an app palette. Look here before building anything.',
      ],
    },
    {
      title: 'Next',
      points: [
        `${GUIDE_LINKS.compounds}: the app's own parts, made of Tessera parts.`,
        `${GUIDE_LINKS.views}: the app's screens.`,
        `${GUIDE_LINKS.appParts}: rarely, a part only one app needs.`,
        `The long form of this page: ${GUIDE_LINKS.usingTessera}.`,
      ],
    },
  ],
  example: {
    name: 'Entry file',
    code: `import '@drizztdourden08/tessera/tokens.css';
import './theme.css';
import { createRoot } from 'react-dom/client';
import { TesseraProvider } from '@drizztdourden08/tessera';
import type { TesseraOverrides } from '@drizztdourden08/tessera';
import { App } from './App';
import { AppSpinner } from './compounds/AppSpinner';

const OVERRIDES: TesseraOverrides = {
  spinner: AppSpinner,
  strings: { common: { cancel: 'Annuler' } },
};

createRoot(document.getElementById('root')!).render(
  <TesseraProvider overrides={OVERRIDES}>
    <App />
  </TesseraProvider>,
);`,
  },
};

export { SETUP_GUIDE };
