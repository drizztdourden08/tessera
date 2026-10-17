/* @layer stories @kind data */
import type { ArmedIconCase } from './armed-icon.type';

const ARMED_ICON_CASES: Readonly<Record<string, ArmedIconCase>> = {
  'Still 16px': { armed: false, size: 16 },
  'Still 24px': { armed: false, size: 24 },
  'Armed 16px': { armed: true, size: 16 },
  'Armed 24px': { armed: true, size: 24 },
  'Armed 48px': { armed: true, size: 48 },
};

export { ARMED_ICON_CASES };
