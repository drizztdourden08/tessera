/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { INDEX_ATTRIBUTE, INDEX_PROPERTY } from '../VirtualList.constants';
import type { CSSProperties } from 'react';
import type { VirtualItemProps } from './VirtualItem.type';
import '../../../theme/focus-ring.css';

const VirtualItem = (props: VirtualItemProps) => {
  const { index, count, tabbable, onActivate, onNavigate, children } = props;
  const placed = { [INDEX_PROPERTY]: index } as CSSProperties;
  return (
    <Box
      role="listitem"
      className="virtual-list__item focus-ring-inset"
      style={placed}
      tabIndex={tabbable ? 0 : -1}
      aria-posinset={index + 1}
      aria-setsize={count}
      {...{ [INDEX_ATTRIBUTE]: index }}
      onFocus={() => onActivate(index)}
      onKeyDown={(event) => onNavigate(event, index)}
    >
      {children}
    </Box>
  );
};

export { VirtualItem };
