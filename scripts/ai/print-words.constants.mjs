/* @layer tooling-scripts @kind data */
import { APP_TIER_ORDER, TIER_ORDER } from './ai.constants.mjs';

const TESSERA_PRINT = {
  prefix: 'ai',
  unit: 'components',
  noun: 'component',
  tree: 'src/ai/tree.constants.ts',
  verbose: 'pnpm ai --check --verbose',
  tiers: TIER_ORDER,
  intro: {
    report: 'Coverage gaps are listed and do not fail; set it to "enforce" once every component has its usage.',
    enforce: 'Coverage gaps fail the check.',
  },
};

const APP_PRINT = {
  prefix: 'tessera',
  unit: 'parts',
  noun: 'part',
  tree: 'the app tree',
  verbose: 'tessera check --verbose',
  tiers: APP_TIER_ORDER,
  intro: {
    report: 'Every finding is listed and none fails; set it to "enforce" once every part has its usage.',
    enforce: 'Every finding fails the check.',
  },
};

export { APP_PRINT, TESSERA_PRINT };
