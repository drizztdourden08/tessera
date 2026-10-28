/* @layer renderer-components @kind logic */
import type { BreadcrumbsProps, OverSetter, SegmentDropHandlers } from '../Breadcrumbs.type';

const segmentDropHandlers = (
  id: string,
  rules: Pick<BreadcrumbsProps, 'onDropOn' | 'canDrop'>,
  setOver: OverSetter,
): SegmentDropHandlers => {
  const { onDropOn, canDrop } = rules;
  return {
    onDragOver: (event) => {
      if (onDropOn === undefined || canDrop?.(id, event) === false) return;
      event.preventDefault();
      setOver(() => id);
    },
    onDragLeave: () => setOver((was) => (was === id ? null : was)),
    onDrop: (event) => {
      if (onDropOn === undefined || canDrop?.(id, event) === false) return;
      event.preventDefault();
      setOver(() => null);
      onDropOn(id, event);
    },
  };
};

export { segmentDropHandlers };
