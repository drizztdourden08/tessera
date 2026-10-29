/* @layer renderer-components @kind logic */
import { isElement } from '../../../primitives/dom/is-element';
import { gridDropCount } from './grid-drop-count';
import type { GridDropInput } from './grid-drop-handlers.type';
import type { GridHeaderDrop } from './useGridDropData.type';

const gridDropHandlers = (input: GridDropInput): GridHeaderDrop | undefined => {
  const { section, setHot, announce, said } = input;
  const receive = section.onDropData;
  if (!receive) return undefined;
  const takes = (data: DataTransfer) => section.accepts?.(data) ?? true;
  const cool = () => setHot((now) => (now === section.key ? null : now));
  const over: GridHeaderDrop['onDragOver'] = (event) => {
    if (!takes(event.dataTransfer)) {
      cool();
      return;
    }
    event.preventDefault();
    setHot(section.key);
  };
  return {
    onDragEnter: over,
    onDragOver: over,
    onDragLeave: (event) => {
      const next = event.relatedTarget;
      if (!isElement(next) || !event.currentTarget.contains(next)) cool();
    },
    onDrop: (event) => {
      cool();
      if (!takes(event.dataTransfer)) return;
      event.preventDefault();
      receive(event.dataTransfer);
      announce(said(gridDropCount(event.dataTransfer), typeof section.label === 'string' ? section.label : section.key));
    },
  };
};

export { gridDropHandlers };
