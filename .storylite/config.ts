/* @layer root-config @kind config */
import { defineConfig } from '@storylite/storylite';
import { appSwitcherScript } from './app-switcher';
import { GALLERY_APPS } from './app-switcher.constants';
import { componentPagesScript } from './component-pages';
import { HOME_LOGO_MOUNT, LEAVE_MAXIMIZED, ROOT } from './config.constants';
import { controlledReact } from './renderer/controlled-renderer';
import { buildHome } from './home';
import { HOME_CSS } from './home-css.constants';
import { MANAGER_CSS } from './manager-css.constants';
import { markSvg } from './mark-svg';
import { menuOrder } from './menu';
import { componentPages } from './story-index';
import { windowsFsPaths } from './windows-fs-paths';
import { wordmarkSvg } from './wordmark-svg';

export default defineConfig({
  stories: ['./stories/**/*.stories.tsx'],
  vitePlugins: [windowsFsPaths()],
  css: [
    './src/tokens/index.css',
    './stories/themes/rotp.css',
    './stories/themes/archipelia.css',
    './stories/storylite.css',
  ],
  renderers: [controlledReact()],
  home: buildHome(ROOT),
  managerHead: (defaults) => [defaults, LEAVE_MAXIMIZED].join('\n'),
  managerBodyEnd: (defaults) => [defaults, appSwitcherScript(), componentPagesScript(componentPages(ROOT)), HOME_LOGO_MOUNT].join('\n'),
  storyId: (_path, suggestedId) => suggestedId.replace(/^stories-/, ''),
  storySort: { order: menuOrder() },
  ui: {
    css: [MANAGER_CSS, HOME_CSS].join('\n'),
    brand: {
      markHtml: markSvg('tessera', '34px', 'gallery-mark'),
      titleHtml: wordmarkSvg('tessera', '20px', 'gallery-wordmark'),
      subtitle: 'Design system',
    },
    toolbar: (defaults) => [
      ...defaults,
      {
        type: 'select',
        id: 'palette',
        label: 'App',
        icon: 'flag',
        defaultValue: GALLERY_APPS[0]?.id ?? 'tessera',
        options: GALLERY_APPS.map((app) => ({ label: app.name, value: app.id })),
        target: { type: 'preview-attribute', name: 'data-palette' },
      },
    ],
  },
});
