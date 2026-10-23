/* @layer renderer-components @kind logic */
import { VIEW_W } from '../ControllerSilhouette.constants';

const flip = (x: number): number => VIEW_W - x;

export { flip };
