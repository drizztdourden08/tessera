/* @layer renderer-components @kind util */
import { CAMERA } from '../ShortcutTour.constants';
import { boundsOf } from './bounds-of';
import { frameRect } from './frame-rect';
import type { KeyRect } from '../../KeyboardLayout';
import type { CameraView, TourFocus, TourScene } from '../ShortcutTour.type';

const cameraFor = (focus: TourFocus, rects: readonly KeyRect[], scene: TourScene): CameraView | null => {
  const target = focus === 'all' ? boundsOf(rects) : rects[focus];
  if (!target || scene.viewport.width === 0 || scene.viewport.height === 0) return null;
  const unit = Math.min(...rects.map((rect) => rect.height));
  const margin = unit * (focus === 'all' ? CAMERA.overviewMargin : CAMERA.keyMargin);
  return frameRect(target, scene, margin);
};

export { cameraFor };
