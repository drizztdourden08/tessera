/* @layer renderer-components @kind util */
import { hexInk } from '../../hex-ink/hex-ink';

const captionClass = (color: string, transparent: boolean): string => {
  const ink = transparent ? null : hexInk(color);
  return `color-swatch__caption color-swatch__caption--ink-${ink ?? 'light'}`;
};

export { captionClass };
