/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import type { BrandApp } from '../../../src/brand/brand.type';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { SplashFrame } from './SplashFrame';
import { wordmarkSplashHtml } from './wordmark-splash-html';

const APPS: readonly BrandApp[] = ['brock', 'rotp'];

const WIDTHS = ['640 px window', '288 px window'] as const;

const StaticSplashWordmarks = () => (
  <Demonstrator
    className="splash-wordmark-widths"
    rows={axis(APPS)}
    columns={axis(WIDTHS)}
    cell={(app, width) => (
      <Box className={width === '640 px window' ? 'splash-wordmark-wide' : 'splash-wordmark-narrow'}>
        <SplashFrame body={wordmarkSplashHtml(app)} palette={app} label={`Static splash page with a wordmark, ${app}, ${width}`} />
      </Box>
    )}
  />
);

export { StaticSplashWordmarks };
