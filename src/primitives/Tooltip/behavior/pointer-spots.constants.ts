/* @layer renderer-components @kind data */
import type { PointerSpot } from './pointer-placement.type';

const POINTER_SPOTS = new WeakMap<Document, PointerSpot>();

const TRACKED_DOCUMENTS = new WeakSet<Document>();

export { POINTER_SPOTS, TRACKED_DOCUMENTS };
