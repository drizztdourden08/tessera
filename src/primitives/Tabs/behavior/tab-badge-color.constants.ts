/* @layer renderer-components @kind data */
import type { BadgeColor } from '../../Badge';
import type { TabBadgeTone } from '../Tabs.type';

const TONE_COLOR: Record<TabBadgeTone, BadgeColor> = {
  neutral: 'tame',
  warn: 'warning',
  danger: 'danger',
  success: 'success',
  info: 'info',
};

export { TONE_COLOR };
