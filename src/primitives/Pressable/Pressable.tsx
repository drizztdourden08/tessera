/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import type { PressableProps } from './Pressable.type';
import './Pressable.css';

const Pressable = forwardRef<HTMLButtonElement, PressableProps>((props, ref) => {
  const { className = '', type = 'button', children, ...rest } = props;
  return (
    <button ref={ref} type={type} className={`pressable${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </button>
  );
});

Pressable.displayName = 'Pressable';

export { Pressable };
