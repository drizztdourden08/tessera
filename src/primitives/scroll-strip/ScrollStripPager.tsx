/* @layer renderer-components @kind component */
import type { MouseEvent } from 'react';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import type { ScrollStripPagerProps } from './scroll-strip.type';

const keepFocus = (event: MouseEvent): void => event.preventDefault();

const ScrollStripPager = (props: ScrollStripPagerProps) => (
  <IconButton
    type="button"
    className={`scroll-strip__pager scroll-strip__pager--${props.side}`}
    label={props.label}
    tabIndex={-1}
    onMouseDown={keepFocus}
    onClick={props.onPage}
  >
    <Icon name={props.side === 'back' ? 'chevron-left' : 'chevron-right'} />
  </IconButton>
);

export { ScrollStripPager };
