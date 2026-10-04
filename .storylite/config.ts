/* @layer root-config @kind config */
import { defineConfig } from '@storylite/storylite';
import { appSwitcherScript } from './app-switcher';
import { GALLERY_APPS } from './app-switcher.constants';
import { componentPagesScript } from './component-pages';
import { FAVICON, HOME_LOGO_MOUNT, LEAVE_MAXIMIZED, PREVIEW_ALLOWS_FULLSCREEN, ROOT } from './config.constants';
import { faviconPlugin } from './favicon-plugin';
import { frameCssPlugin } from './frame-css-plugin';
import { galleryBuild } from './gallery-build';
import { controlledReact } from './renderer/controlled-renderer';
import { buildHome } from './home';
import { HOME_CSS } from './home-css.constants';
import { homeLogoPlugin } from './home-logo-plugin';
import { MANAGER_CSS } from './manager-css.constants';
import { markSvg } from './mark-svg';
import { menuOrder } from './menu';
import { reviewControlScript } from './review-control';
import { reviewCss } from './review-css';
import { reviewPlugin } from './review-plugin';
import { sidebarDecorScript } from './sidebar-decor';
import { componentPages } from './story-index';
import { ssrBundle } from './ssr-bundle';
import { strictPort } from './strict-port';
import { windowsFsPaths } from './windows-fs-paths';
import { wordmarkSvg } from './wordmark-svg';

export default defineConfig({
  stories: ['./stories/**/*.stories.tsx'],
  vitePlugins: [windowsFsPaths(), ssrBundle(), strictPort(), reviewPlugin(ROOT), faviconPlugin(ROOT), frameCssPlugin(), homeLogoPlugin(ROOT)],
  css: [
    './src/tokens/index.css',
    './src/tokens/palettes/rotp.css',
    './src/tokens/palettes/archipelia.css',
    './src/tokens/palettes/brock.css',
    './stories/storylite.css',
  ],
  renderers: [controlledReact()],
  home: buildHome(ROOT),
  managerHead: (defaults) => [defaults, FAVICON, LEAVE_MAXIMIZED, PREVIEW_ALLOWS_FULLSCREEN].join('\n'),
  managerBodyEnd: (defaults) => [
    defaults, appSwitcherScript(), componentPagesScript(componentPages(ROOT)), sidebarDecorScript(ROOT, !galleryBuild()),
    galleryBuild() ? '' : reviewControlScript(ROOT), galleryBuild() ? HOME_LOGO_MOUNT.build : HOME_LOGO_MOUNT.dev,
  ].join('\n'),
  storyId: (_path, suggestedId) => suggestedId.replace(/^stories-/, ''),
  storySort: { order: menuOrder() },
  ui: {
    css: [MANAGER_CSS, reviewCss(ROOT), HOME_CSS].join('\n'),
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
