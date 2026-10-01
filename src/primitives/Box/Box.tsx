/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import type { ElementType } from 'react';
import { Link } from '../Link';
import type { BoxProps } from './Box.type';

const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const { as, children, ...rest } = props;
  const Tag: ElementType = as ?? (rest.href === undefined ? 'div' : Link);
  return <Tag ref={ref} {...rest}>{children}</Tag>;
});

export { Box };
