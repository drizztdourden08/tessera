/* @layer renderer-components @kind util */
import type { OverlayLooks } from '../Overlay.type';

const overlayClass = (looks: OverlayLooks): string => {
  const { visible, tone, blur, keepMounted, className } = looks;
  return [
    'overlay', `overlay--${tone}`, blur && 'overlay--blur', keepMounted && 'overlay--kept', !visible && 'overlay--hidden', className,
  ].filter(Boolean).join(' ');
};

export { overlayClass };
