/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import type { GroupTreeGroupBodyProps } from './GroupTreeGroupBody.type';

const GroupTreeGroupBody = <T,>({ row, showCounts }: GroupTreeGroupBodyProps<T>) => {
  const { node, expanded, count } = row;
  return (
    <>
      <Span className="group-tree__twisty" aria-hidden>
        <Icon name="chevron-right" className={expanded ? 'group-tree__chevron group-tree__chevron--open' : 'group-tree__chevron'} />
      </Span>
      <Span className="group-tree__icon" aria-hidden>{node.icon ?? <Icon name={expanded ? 'folder-open' : 'folder'} />}</Span>
      <Span className="group-tree__label">{node.label}</Span>
      {node.meta != null && <Span tone="muted" className="group-tree__meta">{node.meta}</Span>}
      {showCounts && <Badge variant="inline" color="tame" value={count} className="group-tree__count" />}
    </>
  );
};

export { GroupTreeGroupBody };
