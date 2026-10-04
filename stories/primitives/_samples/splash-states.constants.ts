/* @layer stories @kind data */
import type { SplashSample, SplashState } from './splash-states.type';

const MARK_URLS = import.meta.glob<string>('../../../brand/archipelia/mark/mark-256.png', { eager: true, query: '?url', import: 'default' });

const SPLASH_MARK = MARK_URLS['../../../brand/archipelia/mark/mark-256.png'] ?? '';

const SPLASH_STATES: readonly SplashState[] = ['starting', 'failed', 'update', 'reconnecting'];

const SPLASH_SAMPLES: Readonly<Record<SplashState, SplashSample>> = {
  starting: {
    status: 'Loading the engine · 3 of 7',
    progress: 0.42,
    actions: [],
  },
  failed: {
    status: 'Loading the engine failed',
    detail: 'Port 38281 is taken by another program.',
    failed: true,
    progress: 0.42,
    actions: [{ label: 'Retry', primary: true }, { label: 'Report a bug' }, { label: 'Quit' }],
  },
  update: {
    status: 'Installing version 0.5.0',
    detail: 'The app starts again by itself when it is done.',
    progress: 0.7,
    actions: [],
  },
  reconnecting: {
    status: 'Reconnecting to the engine',
    progress: 'indeterminate',
    actions: [{ label: 'Quit' }],
  },
};

const SPLASH_TITLE = 'Archipelia';

const SPLASH_VERSION = 'v0.4.2';

export { SPLASH_MARK, SPLASH_SAMPLES, SPLASH_STATES, SPLASH_TITLE, SPLASH_VERSION };
