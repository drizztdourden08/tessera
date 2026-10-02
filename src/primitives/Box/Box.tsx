/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import type { ElementType } from 'react';
import type { BoxProps } from './Box.type';

const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const { as, children, ...rest } = props;
  const Tag: ElementType = as ?? 'div';
  return <Tag ref={ref} {...rest}>{children}</Tag>;
});

export { Box };
