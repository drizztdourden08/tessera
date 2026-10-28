/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { rowClasses } from '../behavior/row-classes';
import { rowIndent } from '../behavior/row-indent';
import { INDENT_PROPERTY, INDEX_ATTRIBUTE, INDEX_PROPERTY, KEY_ATTRIBUTE } from '../Tree.constants';
import { TreeRowContent } from './TreeRowContent';
import type { CSSProperties } from 'react';
import type { TreeRowProps } from './TreeRow.type';

const TreeRow = <T,>(props: TreeRowProps<T>) => {
  const { row, at, bind, openOnPick, ...content } = props;
  const placed = { [INDEX_PROPERTY]: at, [INDENT_PROPERTY]: rowIndent(row.depth) } as CSSProperties;

  return (
    <Box
      role="treeitem"
      className={rowClasses(row.branch, bind.state.selected, bind.dragging)}
      style={placed}
      tabIndex={bind.tabIndex}
      aria-level={row.depth}
      aria-setsize={row.setSize}
      aria-posinset={row.position}
      aria-expanded={row.branch ? row.expanded : undefined}
      aria-selected={bind.selected}
      aria-busy={row.loading || undefined}
      data-drop={bind.mark}
      {...{ [INDEX_ATTRIBUTE]: at, [KEY_ATTRIBUTE]: row.key }}
      {...bind.pointer}
      onFocus={bind.onFocus}
      onKeyDown={bind.onKeyDown}
      onClick={bind.onClick}
      onDoubleClick={bind.onDoubleClick}
    >
      <TreeRowContent row={row} state={bind.state} onToggle={openOnPick ? undefined : bind.onToggle} {...content} />
    </Box>
  );
};

export { TreeRow };
