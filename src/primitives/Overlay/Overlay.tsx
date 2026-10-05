/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { overlayClass } from './behavior/overlay-class';
import './Overlay.css';
import type { OverlayProps } from './Overlay.type';

const Overlay = (props: OverlayProps) => {
  const { visible, tone = 'glass', blur = false, keepMounted = false, className, children, ...rest } = props;
  if (!visible && !keepMounted) return null;
  return <Box {...rest} className={overlayClass({ visible, tone, blur, keepMounted, className })}>{children}</Box>;
};

export { Overlay };
