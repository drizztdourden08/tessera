/* @layer renderer-components @kind data */
import type { ControllerSilhouetteAnchors } from '../ControllerSilhouette.type';

const CONTROLLER_SILHOUETTE_ANCHORS: ControllerSilhouetteAnchors = {
  offset: {
    'stick.left': { x: 121, y: 72, r: 23 },
    'stick.right': { x: 240, y: 113, r: 23 },
    'dpad': { x: 158, y: 120, r: 26 },
    'face': { x: 278, y: 76, r: 32 },
    'shoulder.left': { x: 126, y: 31 },
    'shoulder.right': { x: 274, y: 31 },
    'trigger.left': { x: 126, y: 14 },
    'trigger.right': { x: 274, y: 14 },
    'meta.view': { x: 178, y: 74, r: 7 },
    'meta.menu': { x: 222, y: 74, r: 7 },
    'meta.guide': { x: 200, y: 48, r: 12 },
    'meta.capture': { x: 200, y: 88, r: 9 },
  },
  symmetric: {
    'stick.left': { x: 145, y: 117, r: 23 },
    'stick.right': { x: 255, y: 117, r: 23 },
    'dpad': { x: 95, y: 77, r: 29 },
    'face': { x: 305, y: 77, r: 36 },
    'shoulder.left': { x: 94, y: 30 },
    'shoulder.right': { x: 306, y: 30 },
    'trigger.left': { x: 94, y: 14 },
    'trigger.right': { x: 306, y: 14 },
    'meta.view': { x: 121, y: 46, r: 7 },
    'meta.menu': { x: 279, y: 46, r: 7 },
    'meta.guide': { x: 200, y: 117, r: 11 },
  },
  nintendo: {
    'stick.left': { x: 105, y: 92, r: 26 },
    'stick.right': { x: 251, y: 138, r: 26 },
    'dpad': { x: 149, y: 138, r: 27 },
    'face': { x: 295, y: 92, r: 39 },
    'shoulder.left': { x: 108, y: 35 },
    'shoulder.right': { x: 292, y: 35 },
    'trigger.left': { x: 108, y: 14 },
    'trigger.right': { x: 292, y: 14 },
    'meta.view': { x: 158, y: 68, r: 8 },
    'meta.menu': { x: 242, y: 68, r: 8 },
    'meta.guide': { x: 225, y: 93, r: 9 },
    'meta.capture': { x: 175, y: 93, r: 7 },
  },
  pad: {
    'dpad': { x: 93, y: 132, r: 33 },
    'face': { x: 307, y: 132, r: 50 },
    'shoulder.left': { x: 95, y: 49 },
    'shoulder.right': { x: 305, y: 49 },
    'meta.view': { x: 165, y: 143, r: 14 },
    'meta.menu': { x: 205, y: 143, r: 14 },
  },
};

export { CONTROLLER_SILHOUETTE_ANCHORS };
