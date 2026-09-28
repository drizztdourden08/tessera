/* @layer renderer-components @kind util */
import { CAMERA } from '../ShortcutTour.constants';
import { clampAxis } from './clamp-axis';
import type { KeyRect } from '../../KeyboardLayout';
import type { CameraView, TourScene } from '../ShortcutTour.type';

const frameRect = (rect: KeyRect, scene: TourScene, margin: number): CameraView => {
  const { viewport, world } = scene;
  const fitWidth = viewport.width / (rect.width + margin * 2);
  const fitHeight = viewport.height / (rect.height + margin * 2);
  const scale = Math.min(fitWidth, fitHeight, CAMERA.maxScale);
  const x = viewport.width / 2 - (rect.x + rect.width / 2) * scale;
  const y = viewport.height / 2 - (rect.y + rect.height / 2) * scale;
  return {
    scale,
    x: clampAxis(x, viewport.width, world.width * scale),
    y: clampAxis(y, viewport.height, world.height * scale),
  };
};

export { frameRect };
