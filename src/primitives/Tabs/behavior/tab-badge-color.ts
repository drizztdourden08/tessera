/* @layer renderer-components @kind logic */
import type { BadgeColor } from '../../Badge';
import type { TabBadgeTone } from '../Tabs.type';
import { TONE_COLOR } from './tab-badge-color.constants';

const tabBadgeColor = (tone: TabBadgeTone | undefined, active: boolean): BadgeColor => {
  if (tone !== undefined) return TONE_COLOR[tone];
  return active ? 'primary' : 'tame';
};

export { tabBadgeColor };
