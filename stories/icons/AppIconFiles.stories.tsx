/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BRAND_APPS } from '../../src/brand';
import { Box, Image, Text } from '../../src/primitives';
import './app-icon-files.css';

const FILE_TREE = `brand/<app>/icon/icon.svg              master art, rounded tile
brand/<app>/icon/icon.ico              Windows: 16, 24, 32, 48, 64, 128, 256
brand/<app>/icon/png/icon-<N>.png      16, 24, 32, 48, 64, 128, 256, 512, 1024 (1024 is the master)
brand/<app>/icon/maskable-512.png      PWA, full bleed
brand/<app>/icon/android/icon-foreground.png  1024, art inside the 66% safe zone
brand/<app>/icon/android/icon-background.png  1024, flat tile colour
brand/<app>/splash/splash.svg
brand/<app>/splash/splash-2732.png     2732 square, mark centred on a flat ground`;

const meta = {
  title: 'Icons/App icon files',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Files = {
  name: 'Files',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">
        Every app's icon files, built from its brand mark by pnpm icons and shipped in the package under brand/. Brock's build points electron-builder, Capacitor and the PWA manifest at them.
      </Text>
      <Box as="pre" className="app-icon-files__tree">{FILE_TREE}</Box>
      <Box className="story-list">
        {BRAND_APPS.map((app) => (
          <Box key={app} className="story-list__item">
            <Text className="story-label">{app}</Text>
            <Box className="app-icon-files__row">
              {[256, 64, 32, 16].map((size) => (
                <Image key={size} className={`app-icon-files__icon app-icon-files__icon--${size}`} src={`/brand/${app}/icon/png/icon-${size}.png`} alt={`${app} ${size}`} />
              ))}
              <Image className="app-icon-files__icon app-icon-files__icon--128" src={`/brand/${app}/icon/maskable-512.png`} alt={`${app} maskable`} />
              <Image className="app-icon-files__icon app-icon-files__icon--128" src={`/brand/${app}/splash/splash-2732.png`} alt={`${app} splash`} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

export default meta;
export { Files };
