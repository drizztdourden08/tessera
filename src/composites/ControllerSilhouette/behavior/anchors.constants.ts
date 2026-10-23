/* @layer renderer-components @kind data */
import type { ControllerSilhouetteAnchors } from '../ControllerSilhouette.type';

const CONTROLLER_SILHOUETTE_ANCHORS: ControllerSilhouetteAnchors = {
  offset: {
    'stick.left': { x: 117, y: 70, r: 23 },
    'stick.right': { x: 242, y: 112, r: 23 },
    'dpad': { x: 155, y: 120, r: 24 },
    'face': { x: 281, y: 75, r: 32 },
    'shoulder.left': { x: 124, y: 34 },
    'shoulder.right': { x: 276, y: 34 },
    'trigger.left': { x: 124, y: 14 },
    'trigger.right': { x: 276, y: 14 },
    'meta.view': { x: 176, y: 73, r: 7 },
    'meta.menu': { x: 222, y: 73, r: 7 },
    'meta.guide': { x: 200, y: 48, r: 13 },
    'meta.capture': { x: 200, y: 88, r: 6 },
  },
  symmetric: {
    'stick.left': { x: 144, y: 140, r: 30 },
    'stick.right': { x: 256, y: 140, r: 30 },
    'dpad': { x: 89, y: 90, r: 37 },
    'face': { x: 311, y: 90, r: 39 },
    'shoulder.left': { x: 89, y: 37 },
    'shoulder.right': { x: 311, y: 37 },
    'trigger.left': { x: 89, y: 14 },
    'trigger.right': { x: 311, y: 14 },
    'meta.view': { x: 127, y: 56, r: 6 },
    'meta.menu': { x: 273, y: 56, r: 6 },
    'meta.guide': { x: 200, y: 144, r: 8 },
  },
  nintendo: {
    'stick.left': { x: 105, y: 83, r: 26 },
    'stick.right': { x: 250, y: 134, r: 26 },
    'dpad': { x: 150, y: 134, r: 28 },
    'face': { x: 295, y: 83, r: 36 },
    'shoulder.left': { x: 98, y: 40 },
    'shoulder.right': { x: 302, y: 40 },
    'trigger.left': { x: 98, y: 14 },
    'trigger.right': { x: 302, y: 14 },
    'meta.view': { x: 158, y: 62, r: 8 },
    'meta.menu': { x: 242, y: 62, r: 8 },
    'meta.guide': { x: 225, y: 86, r: 9 },
    'meta.capture': { x: 175, y: 86, r: 7 },
  },
  pad: {
    'dpad': { x: 92, y: 132, r: 33 },
    'face': { x: 307, y: 132, r: 43 },
    'shoulder.left': { x: 94, y: 51 },
    'shoulder.right': { x: 306, y: 51 },
    'meta.view': { x: 165, y: 144, r: 11 },
    'meta.menu': { x: 205, y: 144, r: 11 },
  },
};

export { CONTROLLER_SILHOUETTE_ANCHORS };
