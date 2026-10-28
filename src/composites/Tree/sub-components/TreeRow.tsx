/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { rowIndent } from '../behavior/row-indent';
import { INDENT_PROPERTY, INDEX_ATTRIBUTE, INDEX_PROPERTY, KEY_ATTRIBUTE } from '../Tree.constants';
import { TreeGuides } from './TreeGuides';
import { TreeTwisty } from './TreeTwisty';
import type { CSSProperties } from 'react';
import type { TreeRowProps } from './TreeRow.type';

const TreeRow = <T,>(props: TreeRowProps<T>) => {
  const { row, at, bind, activeBranch, openOnPick, getLabel, renderLead, renderLabel, renderTrail } = props;
  const { state } = bind;
  const lead = renderLead?.(row.item, state);
  const trail = renderTrail?.(row.item, state);
  const classes = [
    'tree__row row-inset focus-ring-inset',
    row.branch && 'tree__row--branch',
    state.selected && 'tree__row--selected',
    bind.dragging && 'tree__row--dragging',
  ].filter(Boolean).join(' ');
  const placed = { [INDEX_PROPERTY]: at, [INDENT_PROPERTY]: rowIndent(row.depth) } as CSSProperties;

  return (
    <Box
      role="treeitem"
      className={classes}
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
      {activeBranch && <TreeGuides ancestors={row.ancestors} activeBranch={activeBranch} />}
      <TreeTwisty branch={row.branch} expanded={row.expanded} loading={row.loading} onToggle={openOnPick ? undefined : bind.onToggle} />
      {lead != null && <Span className="tree__lead" aria-hidden>{lead}</Span>}
      <Span className="tree__label">{renderLabel ? renderLabel(row.item, state) : getLabel(row.item)}</Span>
      {trail != null && <Span className="tree__trail">{trail}</Span>}
    </Box>
  );
};

export { TreeRow };
