/* @layer renderer-components @kind logic */
import type { HTMLAttributes } from 'react';
import type { BarFrameInput } from './bar-frame.type';

const barFrame = ({ orientation, size, height, className }: BarFrameInput): HTMLAttributes<HTMLElement> => ({
  className: className ? `stacked-bar ${className}` : 'stacked-bar',
  style: orientation === 'vertical' && height !== undefined ? { height } : undefined,
  ...({ 'data-size': size, 'data-orientation': orientation } as HTMLAttributes<HTMLElement>),
});

export { barFrame };
