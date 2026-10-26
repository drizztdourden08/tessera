/* @layer renderer-components @kind util */
import { POINTER_SPOTS } from './pointer-spots.constants';

const pointerMoved = (doc: Document, x: number, y: number): boolean => {
  const spot = POINTER_SPOTS.get(doc);
  return spot?.x !== x || spot.y !== y;
};

export { pointerMoved };
