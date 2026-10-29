/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { MARQUEE_KEY_ATTRIBUTE } from '../../marquee';
import { INDEX_ATTRIBUTE, INDEX_PROPERTY } from '../VirtualList.constants';
import type { CSSProperties } from 'react';
import type { VirtualItemProps } from './VirtualItem.type';
import '../../../theme/focus-ring.css';

const VirtualItem = (props: VirtualItemProps) => {
  const { index, count, tabbable, selected, itemKey, onActivate, onKeyDown, onPick, children } = props;
  const placed = { [INDEX_PROPERTY]: index } as CSSProperties;
  const choosing = selected !== undefined;
  return (
    <Box
      role={choosing ? 'option' : 'listitem'}
      className="virtual-list__item focus-ring-inset"
      style={placed}
      tabIndex={tabbable ? 0 : -1}
      aria-posinset={index + 1}
      aria-setsize={count}
      aria-selected={selected}
      {...{ [INDEX_ATTRIBUTE]: index, [MARQUEE_KEY_ATTRIBUTE]: choosing ? itemKey : undefined }}
      onFocus={() => onActivate(index)}
      onKeyDown={onKeyDown}
      onClick={onPick}
      onMouseDown={choosing ? (event) => { if (event.shiftKey) event.preventDefault(); } : undefined}
    >
      {children}
    </Box>
  );
};

export { VirtualItem };
