/* @layer stories @kind component */
import { Splash } from '../../../src/composites';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { LiveSplash } from './LiveSplash';
import { pixelWordmarkSplashHtml } from './pixel-wordmark-splash-html';
import { SplashFrame } from './SplashFrame';
import { WORDMARK_SPRITES } from './wordmark-sprites.constants';

const SPRITES = Object.keys(WORDMARK_SPRITES) as (keyof typeof WORDMARK_SPRITES)[];

const SIDES = ['Splash, wordmarkPixelated auto', 'Static HTML, ts-wordmark--pixelated'] as const;

const NAME = 'Moss Keep';

const SplashPixelWordmarks = () => (
  <Demonstrator
    className="splash-marks"
    fill
    rows={axis(SPRITES)}
    columns={axis(SIDES)}
    cell={(sprite, side) => (side === 'Static HTML, ts-wordmark--pixelated'
      ? <SplashFrame body={pixelWordmarkSplashHtml(WORDMARK_SPRITES[sprite], NAME)} palette="brock" label={`Static splash page with a pixel art wordmark, ${sprite}`} />
      : (
        <LiveSplash label={`Splash component with a pixel art wordmark, ${sprite}`} palette="brock">
          <Splash title={NAME} wordmark={WORDMARK_SPRITES[sprite]} wordmarkPixelated="auto" status="Starting" />
        </LiveSplash>
      ))}
  />
);

export { SplashPixelWordmarks };
