/* @layer stories @kind data */
import { GUIDE_LINKS } from './guide-links.constants';
import { LINT_POINTS, USAGE_TOPIC } from './guide-shared.constants';
import type { Guide } from './guide.type';

const APP_PARTS_GUIDE: Guide = {
  name: 'App primitives and composites',
  description: 'A primitive or composite that only one app needs, built in the app when it cannot live in Tessera.',
  points: [
    '**Not recommended:** almost every part belongs in Tessera, where every app gets it and the gallery shows it.',
    'It fits something only this app has, such as an Electron `webview`, a game canvas or a platform API.',
    'It follows the same rules as a Tessera part: data in by props, out by callbacks, a variant is a prop.',
    'Only the app primitives folder may write raw HTML.',
  ],
  instead: `${GUIDE_LINKS.compounds} when the part draws one of the app's concepts.`,
  topics: [
    {
      title: 'First, ask Tessera',
      points: [
        'Look through this gallery: the part may exist under another name.',
        'A Tessera part lacks a prop: ask for the prop. Never copy the part into the app to change it.',
        'A part any app could use is missing: open an issue on the Tessera repository with what it is for, which app needs it and a sketch of its props.',
        `Until it ships, build it as a compound from Tessera parts (${GUIDE_LINKS.compounds}), so it moves over with little change.`,
      ],
    },
    {
      title: 'When an app part is right',
      points: [
        'It wraps something only this app has, such as an Electron `webview`, a game canvas or a platform API.',
        'No other app could use it, and it is not one of the app\'s concepts. A concept is a compound.',
        'A primitive draws the raw HTML of one element. A composite combines primitives into layout and interaction.',
      ],
    },
    {
      title: 'Where files go',
      points: [
        'The `parts.primitives` and `parts.composites` folders of `tessera.config.json`, in the Tessera folder shape, usage file included. By default `src/primitives/<Name>/` and `src/composites/<Name>/`.',
        'Only the app primitives folder may write raw HTML. The Tessera extension of `@drizztdourden08/standards` reads that folder from `parts.primitives` in `tessera.config.json` and passes it to ESLint as `primitivesGlobs`, so the app `eslint.config.mjs` names no folder.',
      ],
      code: `import { standardsEslint } from '@drizztdourden08/standards/eslint';

export default standardsEslint();`,
      language: 'typescript',
    },
    {
      title: 'Same rules as Tessera',
      points: [
        'Presentational: data in by props, out by callbacks. No stores, IPC or router.',
        'A variant is a prop, never a second component.',
        'A composite is made of primitives, Tessera\'s or the app\'s, with no raw HTML.',
        `The full rules: ${GUIDE_LINKS.designSystem} and ${GUIDE_LINKS.codingStandards}.`,
      ],
    },
    USAGE_TOPIC,
    { title: 'Lint rules', points: [...LINT_POINTS, 'In the app primitives folder, `no-raw-html`, `no-as-element-with-primitive` and the inline style rules are off. Every other rule holds.'] },
    {
      title: 'Create one',
      points: ['Create one with the Tessera CLI: `brock tessera new primitive HelpWebview` or `brock tessera new composite <Name>` (`pnpm exec tessera` outside Brock). It first warns that most primitives and composites belong in Tessera and asks to confirm; `--yes` answers for you.'],
    },
  ],
  example: {
    name: 'HelpWebview.tsx',
    code: `import type { HelpWebviewProps } from './HelpWebview.type';
import './HelpWebview.css';

const HelpWebview = (props: HelpWebviewProps) => {
  const { src, className } = props;
  return <webview src={src} className={className ? \`help-webview \${className}\` : 'help-webview'} />;
};

export { HelpWebview };`,
  },
};

export { APP_PARTS_GUIDE };
