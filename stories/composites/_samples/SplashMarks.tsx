/* @layer stories @kind component */
import { BRAND_APPS, BRAND_FAMILY, BrandMark } from '../../../src/brand';
import { Splash } from '../../../src/composites';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { SplashFrame } from './SplashFrame';
import { DARK_GROUND_MARKS } from './dark-ground-marks.constants';
import { LiveSplash } from './LiveSplash';

const SIDES = ['Splash, BrandMark', 'Static HTML, dark-ground file'] as const;

const paletteOf = (app: string): string | undefined => (app === 'tessera' ? undefined : app);

const staticPage = (app: string, name: string): string => `<main class="ts-stage">
  <img class="ts-mark" src="${DARK_GROUND_MARKS[app] ?? ''}" alt="" />
  <h1 class="ts-title">${name}</h1>
  <p class="ts-status" aria-live="polite">Starting</p>
</main>`;

const SplashMarks = () => (
  <Demonstrator
    className="splash-marks"
    fill
    rows={axis(BRAND_APPS)}
    columns={axis(SIDES)}
    cell={(app, side) => (side === 'Static HTML, dark-ground file'
      ? <SplashFrame body={staticPage(app, BRAND_FAMILY[app].name)} palette={paletteOf(app)} label={`Static splash page, ${app}`} />
      : (
        <LiveSplash label={`Splash component, ${app}`} palette={app}>
          <Splash title={BRAND_FAMILY[app].name} mark={<BrandMark app={app} size="lg" />} status="Starting" />
        </LiveSplash>
      ))}
  />
);

export { SplashMarks };
