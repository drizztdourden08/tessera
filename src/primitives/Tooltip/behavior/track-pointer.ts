/* @layer renderer-components @kind util */
import { POINTER_SPOTS, TRACKED_DOCUMENTS } from './pointer-spots.constants';

const trackPointer = (doc: Document): void => {
  if (TRACKED_DOCUMENTS.has(doc)) return;
  TRACKED_DOCUMENTS.add(doc);
  doc.addEventListener('mousemove', (event) => POINTER_SPOTS.set(doc, { x: event.clientX, y: event.clientY }));
};

export { trackPointer };
