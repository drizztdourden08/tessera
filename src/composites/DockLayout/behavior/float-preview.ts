/* @layer renderer-components @kind logic */
import type { DragContext, DragSource, DragView } from './drag.type';
import { floatingRect } from './floating-rect';
import { placeFloating } from './place-floating';
import { wantedRect } from './wanted-rect';

const floatPreview = (ctx: DragContext, source: DragSource, view: DragView): Pick<DragView, 'preview' | 'refused'> => {
  const floats = view.hot?.kind === 'float' || (!source.isMain && source.fromKey !== null);
  const main = ctx.mainRect;
  if (!floats || !main) return { preview: null, refused: false };
  const wanted = wantedRect(source, view.pointer);
  const others = ctx.layout.floating.filter((f) => f.id !== source.id).map((f) => floatingRect(f, main));
  const placed = placeFloating(main, others, wanted);
  return { preview: placed ?? wanted, refused: placed === null };
};

export { floatPreview };
