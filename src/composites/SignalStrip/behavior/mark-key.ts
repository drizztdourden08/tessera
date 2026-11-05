/* @layer renderer-components @kind logic */
import type { SignalMark } from '../SignalStrip.type';

const markKey = (mark: SignalMark | undefined): string => {
  if (mark === undefined) return '';
  if (mark.brand !== undefined) return `brand:${mark.brand}`;
  if (mark.avatar === undefined) return mark.icon;
  const { label, initials, src, icon } = mark.avatar;
  return `avatar:${label}:${initials ?? ''}:${src ?? ''}:${icon ?? ''}`;
};

export { markKey };
