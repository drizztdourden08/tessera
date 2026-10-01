/* @layer renderer-components @kind component */
import type { MouseEvent } from 'react';
import { Glyph } from '../../Glyph';
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
    <Glyph name={props.side === 'back' ? 'chevronLeft' : 'chevronRight'} />
  </IconButton>
);

export { TabsPager };
