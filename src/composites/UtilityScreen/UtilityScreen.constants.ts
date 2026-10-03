/* @layer renderer-components @kind data */
import type { IconName } from '../../primitives/Icon';
import type { UtilityScreenTone } from './UtilityScreen.type';

const TONE_ICONS: Readonly<Record<Exclude<UtilityScreenTone, 'busy'>, IconName>> = {
  info: 'info',
  success: 'circle-check',
  warning: 'triangle-alert',
  danger: 'circle-x',
};

const NO_ACTIONS: readonly never[] = [];

export { NO_ACTIONS, TONE_ICONS };
