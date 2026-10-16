/* @layer renderer-components @kind logic */
import { FLOAT_DROP } from '../DockLayout.constants';
import { allowsDrop } from './allows-drop';
import type { DragContext, DragSource, DragView } from './drag.type';
import { floatingRect } from './floating-rect';
import { placeFloating } from './place-floating';
import { snapEdgesOf } from './snap-edges';
import { snapGuidesOf } from './snap-guides';
import { snapWanted } from './snap-wanted';

const floatPreview = (ctx: DragContext, source: DragSource, view: DragView): Pick<DragView, 'preview' | 'refused' | 'guides'> => {
  const floats = view.hot?.kind === 'float' || (!source.isMain && source.fromKey !== null);
  const main = ctx.mainRect;
  if (!floats || !main || !allowsDrop(ctx, source, FLOAT_DROP)) return { preview: null, refused: false, guides: [] };
  const wanted = snapWanted(ctx, source, view.pointer);
  const others = ctx.layout.floating.filter((f) => f.id !== source.id).map((f) => floatingRect(f, main));
  const placed = placeFloating(main, others, wanted.rect);
  const guides = placed ? snapGuidesOf(placed, wanted.lines, snapEdgesOf(placed)) : [];
  return { preview: placed ?? wanted.rect, refused: placed === null, guides };
};

export { floatPreview };
