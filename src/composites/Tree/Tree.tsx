/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DragGhost } from '../DragGhost';
import { useTree } from './behavior/useTree';
import { TreeRow } from './sub-components/TreeRow';
import { COUNT_PROPERTY } from './Tree.constants';
import type { CSSProperties } from 'react';
import type { TreeProps } from './Tree.type';
import '../../theme/focus-ring.css';
import '../../theme/row-inset.css';
import '../../theme/visually-hidden.css';
import './Tree.css';

const Tree = <T,>(props: TreeProps<T>) => {
  const { label, rowSize = 'normal', emptyLabel, openOnPick = false, getLabel, renderLead, renderLabel, renderTrail, selection, className } = props;
  const { common } = useTesseraStrings();
  const { rows, nav, drag, bindOf, activeBranch } = useTree(props);
  const classes = ['tree', className].filter(Boolean).join(' ');

  if (rows.length === 0) return <Box className={`${classes} tree--empty`}>{emptyLabel ?? common.nothingToShow}</Box>;

  return (
    <Box ref={nav.rootRef} className={classes} data-row-size={rowSize} onScroll={nav.onScroll}>
      <Box
        ref={nav.bodyRef}
        role="tree"
        aria-label={label}
        aria-multiselectable={selection && (selection.mode ?? 'multiple') === 'multiple' ? true : undefined}
        className="tree__body"
        style={{ [COUNT_PROPERTY]: rows.length } as CSSProperties}
        onFocus={nav.onFocus}
        onBlur={nav.onBlur}
      >
        {nav.indices.map((at) => {
          const row = rows[at];
          const bind = bindOf(at);
          if (!row || !bind) return null;
          return (
            <TreeRow
              key={row.key}
              row={row}
              at={at}
              bind={bind}
              activeBranch={activeBranch}
              openOnPick={openOnPick}
              getLabel={getLabel}
              renderLead={renderLead}
              renderLabel={renderLabel}
              renderTrail={renderTrail}
            />
          );
        })}
      </Box>
      {drag.ghost && <DragGhost count={drag.ghost.count} thumbnails={drag.ghost.thumbnails} point={drag.ghost.point} />}
      {drag.enabled && <Box className="visually-hidden" aria-live="polite">{drag.message}</Box>}
    </Box>
  );
};

export { Tree };
