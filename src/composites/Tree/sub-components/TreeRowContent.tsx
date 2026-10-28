/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { TreeGuides } from './TreeGuides';
import { TreeTwisty } from './TreeTwisty';
import type { TreeRowContentProps } from './TreeRowContent.type';

const TreeRowContent = <T,>(props: TreeRowContentProps<T>) => {
  const { row, state, activeBranch, onToggle, getLabel, renderLead, renderLabel, renderTrail } = props;
  const lead = renderLead?.(row.item, state);
  const trail = renderTrail?.(row.item, state);
  return (
    <>
      {activeBranch && <TreeGuides ancestors={row.ancestors} activeBranch={activeBranch} />}
      <TreeTwisty branch={row.branch} expanded={row.expanded} loading={row.loading} onToggle={onToggle} />
      {lead != null && <Span className="tree__lead" aria-hidden>{lead}</Span>}
      <Span className="tree__label">{renderLabel ? renderLabel(row.item, state) : getLabel(row.item)}</Span>
      {trail != null && <Span className="tree__trail">{trail}</Span>}
    </>
  );
};

export { TreeRowContent };
