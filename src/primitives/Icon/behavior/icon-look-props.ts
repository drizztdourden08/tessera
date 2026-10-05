/* @layer renderer-components @kind logic */
import type { IconLook } from '../Icon.type';

const iconLookProps = (look: IconLook) => {
  const { size = 16, rotate = 0, flip, inline = false, label, className, ...rest } = look;
  return {
    ...rest,
    width: size,
    height: size,
    rotate: rotate / 90,
    hFlip: flip === 'horizontal' || flip === 'both',
    vFlip: flip === 'vertical' || flip === 'both',
    inline,
    className: className ? `icon ${className}` : 'icon',
    role: label ? 'img' : undefined,
    'aria-label': label,
    'aria-hidden': label === undefined,
  };
};

export { iconLookProps };
