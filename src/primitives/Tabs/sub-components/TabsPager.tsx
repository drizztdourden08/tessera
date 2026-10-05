/* @layer renderer-components @kind component */
import type { MouseEvent } from 'react';
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import type { TabsPagerProps } from '../Tabs.type';

const keepFocus = (event: MouseEvent): void => event.preventDefault();

const TabsPager = (props: TabsPagerProps) => (
  <IconButton
    type="button"
    className={`tabs__pager tabs__pager--${props.side}`}
    label={props.label}
    tabIndex={-1}
    onMouseDown={keepFocus}
    onClick={props.onPage}
  >
    <Icon name={props.side === 'back' ? 'chevron-left' : 'chevron-right'} />
  </IconButton>
);

export { TabsPager };
