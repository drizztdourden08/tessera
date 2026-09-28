/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import type { FloatingProps } from './Floating.type';
import './Floating.css';

const Floating = forwardRef<HTMLDivElement, FloatingProps>((props, ref) => {
  const { placement, className = '', children, ...rest } = props;
  return (
    <div ref={ref} className={`floating${className ? ` ${className}` : ''}`} style={placement ?? undefined} {...rest}>
      {children}
    </div>
  );
});

export { Floating };
