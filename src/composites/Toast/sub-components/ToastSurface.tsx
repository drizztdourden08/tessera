/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { ToastSurfaceProps } from '../Toast.type';
import './ToastSurface.css';

const ToastSurface = (props: ToastSurfaceProps) => {
  const { variant, className, children, ...rest } = props;
  return <Box className={`toast toast--${variant} ${className ?? ''}`} {...rest}>{children}</Box>;
};

export { ToastSurface };
