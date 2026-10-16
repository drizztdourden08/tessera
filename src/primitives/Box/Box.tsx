/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import type { ElementType } from 'react';
import type { BoxProps } from './Box.type';
import './Box.css';

const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const { as, surface, children, ...rest } = props;
  const Tag: ElementType = as ?? 'div';
  const attributes = surface ? { ...rest, className: [`box--${surface}`, rest.className].filter(Boolean).join(' ') } : rest;
  return <Tag ref={ref} {...attributes}>{children}</Tag>;
});

export { Box };
