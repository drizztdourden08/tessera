/* @layer renderer-components @kind util */
import { cameraFor } from './camera-for';
import type { KeyRect } from '../../KeyboardLayout';
import type { CameraView, TourFrame, TourScene } from '../ShortcutTour.type';

const tourView = (frame: TourFrame | null, rects: readonly KeyRect[] | null, scene: TourScene | null): CameraView | null =>
  (frame && rects && scene ? cameraFor(frame.focus, rects, scene) : null);

export { tourView };
