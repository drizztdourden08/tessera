/* @layer renderer-components @kind util */
import { observeResize } from '../../../primitives/dom/observe-resize';

const watchSpot = (view: Window, nodes: readonly HTMLElement[], again: () => void, follow: () => void = again): (() => void) => {
  const doc = view.document;
  const fonts = doc.fonts as FontFaceSet | undefined;
  let live = true;
  const stopResize = observeResize([...nodes, doc.body], again);
  view.addEventListener('resize', follow);
  doc.addEventListener('scroll', follow, true);
  fonts?.addEventListener('loadingdone', again);
  void fonts?.ready.then(() => {
    if (live) again();
  });
  return () => {
    live = false;
    stopResize();
    view.removeEventListener('resize', follow);
    doc.removeEventListener('scroll', follow, true);
    fonts?.removeEventListener('loadingdone', again);
  };
};

export { watchSpot };
