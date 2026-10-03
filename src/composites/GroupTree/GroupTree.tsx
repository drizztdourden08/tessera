/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { activeBranchOf } from './behavior/active-branch-of';
import { flattenTree } from './behavior/flatten-tree';
import { selectionKey } from './behavior/selection-key';
import { useTreeExpansion } from './behavior/useTreeExpansion';
import { useTreeNavigation } from './behavior/useTreeNavigation';
import { GroupTreeRow } from './sub-components/GroupTreeRow';
import type { GroupTreeProps } from './GroupTree.type';
import '../../theme/focus-ring.css';
import './GroupTree.css';

const GroupTree = <T,>(props: GroupTreeProps<T>) => {
  const {
    root, getItemKey, renderItem, itemIcon, selectedKey = null, onSelect, onActivate,
    expandToDepth = 0, expandedKeys, onExpandedChange, showCounts = true, label, emptyLabel, className,
  } = props;
  const { common } = useTesseraStrings();
  const expansion = useTreeExpansion({ root, expandToDepth, expandedKeys, onExpandedChange });
  const rows = useMemo(() => flattenTree(root, { open: expansion.open, getItemKey }), [root, expansion.open, getItemKey]);
  const nav = useTreeNavigation({ rows, expansion, selectedKey, onSelect, onActivate });
  const activeBranch = useMemo(() => activeBranchOf(rows, selectedKey), [rows, selectedKey]);
  const classes = `group-tree${className ? ` ${className}` : ''}`;

  if (rows.length === 0) return <Box className={`${classes} group-tree--empty`}>{emptyLabel ?? common.nothingToShow}</Box>;

  return (
    <Box ref={nav.listRef} role="tree" aria-label={label ?? root.label} className={classes} onKeyDown={nav.onKeyDown}>
      {rows.map((row) => (
        <GroupTreeRow
          key={row.key}
          row={row}
          selected={selectionKey(row) === selectedKey}
          focusable={row.key === nav.activeKey}
          activeBranch={activeBranch}
          showCounts={showCounts}
          renderItem={renderItem}
          itemIcon={itemIcon}
          onChoose={nav.choose}
          onActivate={onActivate}
        />
      ))}
    </Box>
  );
};

export { GroupTree };
