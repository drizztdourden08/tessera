/* @layer renderer-components @kind util */
import type { SplashBar } from '../Splash.type';

const meterClass = (bar: SplashBar, determinate: boolean, failed: boolean): string => [
  'ts-progress', bar === 'edge' && 'ts-progress--edge', !determinate && 'ts-progress--indeterminate', failed && 'ts-progress--danger',
].filter(Boolean).join(' ');

export { meterClass };
