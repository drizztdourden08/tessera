/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { rowIndent } from '../behavior/row-indent';
import { GroupTreeGuides } from './GroupTreeGuides';
import { GroupTreeGroupBody } from './GroupTreeGroupBody';
import { GroupTreeItemBody } from './GroupTreeItemBody';
import type { GroupTreeRowProps } from './GroupTreeRow.type';

const GroupTreeRow = <T,>(props: GroupTreeRowProps<T>) => {
  const { row, selected, focusable, activeBranch, showCounts, renderItem, itemIcon, onChoose, onActivate } = props;
  const classes = `group-tree__row focus-ring-inset group-tree__row--${row.kind}${selected ? ' group-tree__row--selected' : ''}`;

  return (
    <Box
      role="treeitem"
      className={classes}
      aria-level={row.depth}
      aria-setsize={row.setSize}
      aria-posinset={row.position}
      aria-expanded={row.kind === 'group' ? row.expanded : undefined}
      aria-selected={selected}
      tabIndex={focusable ? 0 : -1}
      data-tree-key={row.key}
      style={{ paddingInlineStart: rowIndent(row.depth) }}
      onClick={() => onChoose(row)}
      onDoubleClick={row.kind === 'item' ? () => onActivate?.(row.item) : undefined}
    >
      <GroupTreeGuides ancestors={row.ancestors} activeBranch={activeBranch} />
      {row.kind === 'group'
        ? <GroupTreeGroupBody row={row} showCounts={showCounts} />
        : <GroupTreeItemBody row={row} renderItem={renderItem} itemIcon={itemIcon} />}
    </Box>
  );
};

export { GroupTreeRow };
