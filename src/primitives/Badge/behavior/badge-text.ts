/* @layer renderer-components @kind util */
import { sanitiseBadgeText } from './sanitise-badge-text';

const countText = (value: number, max: number | undefined): string => {
  if (!Number.isFinite(value) || value < 0) return '';
  const count = Math.trunc(value);
  return max !== undefined && count > max ? `${Math.max(0, Math.trunc(max))}+` : String(count);
};

const badgeText = (value: number | string | undefined, max: number | undefined, hideZero = false): string => {
  if (value === undefined) return '';
  const text = sanitiseBadgeText(typeof value === 'number' ? countText(value, max) : value);
  return hideZero && text === '0' ? '' : text;
};

export { badgeText };
