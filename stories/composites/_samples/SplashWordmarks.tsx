/* @layer stories @kind component */
import { BRAND_APPS, BRAND_FAMILY } from '../../../src/brand';
import { Splash } from '../../../src/composites';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { DARK_GROUND_MARKS } from './dark-ground-marks.constants';
import { LiveSplash } from './LiveSplash';
import { SplashFrame } from './SplashFrame';
import { SPLASH_WORDMARKS } from './splash-wordmarks.constants';
import { wordmarkSplashHtml } from './wordmark-splash-html';

const SIDES = ['Splash, wordmark', 'Static HTML, ts-wordmark'] as const;

const paletteOf = (app: string): string | undefined => (app === 'tessera' ? undefined : app);

const SplashWordmarks = () => (
  <Demonstrator
    className="splash-marks"
    fill
    rows={axis(BRAND_APPS)}
    columns={axis(SIDES)}
    cell={(app, side) => (side === 'Static HTML, ts-wordmark'
      ? <SplashFrame body={wordmarkSplashHtml(app)} palette={paletteOf(app)} label={`Static splash page with a wordmark, ${app}`} />
      : (
        <LiveSplash label={`Splash component with a wordmark, ${app}`} palette={app}>
          <Splash title={BRAND_FAMILY[app].name} wordmark={SPLASH_WORDMARKS[app]} mark={DARK_GROUND_MARKS[app]} status="Starting" />
        </LiveSplash>
      ))}
  />
);

export { SplashWordmarks };
