/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../primitives';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { GroupSection } from './sub-components/GroupSection';
import type { GroupTreeProps } from './GroupTree.type';
import '../../theme/focus-ring.css';
import './GroupTree.css';

const GroupTree = <T,>(props: GroupTreeProps<T>) => {
  const { root, renderItems, expandToDepth = 0, className, emptyLabel, expandedKeys, onToggleKey } = props;
  const { common } = useTesseraStrings();
  const classes = `group-tree${className ? ` ${className}` : ''}`;
  const openKeys = useMemo(() => (expandedKeys ? new Set(expandedKeys) : undefined), [expandedKeys]);

  if (root.children.length > 0) {
    return (
      <Box className={classes}>
        {root.children.map((child) => (
          <GroupSection
            key={child.key}
            node={child}
            depth={1}
            expandToDepth={expandToDepth}
            renderItems={renderItems}
            expandedKeys={openKeys}
            onToggle={onToggleKey}
          />
        ))}
      </Box>
    );
  }

  if (root.items.length > 0) return <Box className={classes}>{renderItems(root.items)}</Box>;

  return <Box className={`${classes} group-tree--empty`}>{emptyLabel ?? common.nothingToShow}</Box>;
};

export { GroupTree };
