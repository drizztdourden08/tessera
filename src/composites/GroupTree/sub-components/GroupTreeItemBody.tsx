/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import type { GroupTreeItemBodyProps } from './GroupTreeItemBody.type';

const GroupTreeItemBody = <T,>({ row, renderItem, itemIcon }: GroupTreeItemBodyProps<T>) => {
  const icon = itemIcon?.(row.item);
  return (
    <>
      <Span className="group-tree__twisty" aria-hidden />
      {icon != null && <Span className="group-tree__icon" aria-hidden>{icon}</Span>}
      <Span className="group-tree__label">{renderItem(row.item)}</Span>
    </>
  );
};

export { GroupTreeItemBody };
