/* @layer renderer-components @kind util */
import type { BadgeProps } from '../Badge.type';

const badgeClass = <S extends string>(props: BadgeProps<S>, text: string, hosted: boolean): string => {
  const { variant = 'number', color = 'normal', translucent = false, anchor, className } = props;
  const place = hosted ? anchor ?? 'top-end' : anchor;
  return [
    'badge', `badge--${variant}`, `badge--${color}`,
    [...text].length === 1 && 'badge--round',
    translucent && 'badge--translucent',
    place !== undefined && `badge--anchored badge--${place}`,
    className,
  ].filter(Boolean).join(' ');
};

export { badgeClass };
