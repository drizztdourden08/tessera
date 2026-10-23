/* @layer renderer-components @kind data */
import type { ControllerSilhouetteAnchors } from '../ControllerSilhouette.type';

const CONTROLLER_SILHOUETTE_ANCHORS: ControllerSilhouetteAnchors = {
  offset: {
    'stick.left': { x: 112, y: 112, r: 23 },
    'stick.right': { x: 248, y: 166, r: 23 },
    'dpad': { x: 152, y: 166, r: 24 },
    'face': { x: 288, y: 112, r: 34 },
    'shoulder.left': { x: 90, y: 38 },
    'shoulder.right': { x: 310, y: 38 },
    'trigger.left': { x: 96, y: 22 },
    'trigger.right': { x: 304, y: 22 },
    'meta.view': { x: 172, y: 104, r: 6 },
    'meta.menu': { x: 228, y: 104, r: 6 },
    'meta.guide': { x: 200, y: 80, r: 11 },
    'meta.capture': { x: 200, y: 128, r: 5 },
  },
  symmetric: {
    'stick.left': { x: 154, y: 164, r: 22 },
    'stick.right': { x: 246, y: 164, r: 22 },
    'dpad': { x: 106, y: 110, r: 26 },
    'face': { x: 294, y: 110, r: 33 },
    'shoulder.left': { x: 86, y: 44 },
    'shoulder.right': { x: 314, y: 44 },
    'trigger.left': { x: 88, y: 22 },
    'trigger.right': { x: 312, y: 22 },
    'meta.view': { x: 140, y: 76, r: 5 },
    'meta.menu': { x: 260, y: 76, r: 5 },
    'meta.guide': { x: 200, y: 164, r: 8 },
  },
  nintendo: {
    'stick.left': { x: 122, y: 112, r: 21 },
    'stick.right': { x: 242, y: 160, r: 21 },
    'dpad': { x: 158, y: 160, r: 21 },
    'face': { x: 278, y: 112, r: 30 },
    'shoulder.left': { x: 108, y: 46 },
    'shoulder.right': { x: 292, y: 46 },
    'trigger.left': { x: 106, y: 30 },
    'trigger.right': { x: 294, y: 30 },
    'meta.view': { x: 172, y: 92, r: 5 },
    'meta.menu': { x: 228, y: 92, r: 5 },
    'meta.guide': { x: 224, y: 124, r: 6 },
    'meta.capture': { x: 176, y: 124, r: 5 },
  },
  pad: {
    'dpad': { x: 112, y: 142, r: 30 },
    'face': { x: 288, y: 142, r: 36 },
    'shoulder.left': { x: 97, y: 54 },
    'shoulder.right': { x: 303, y: 54 },
    'meta.view': { x: 180, y: 150, r: 6 },
    'meta.menu': { x: 220, y: 150, r: 6 },
    'meta.guide': { x: 200, y: 112, r: 7 },
  },
};

export { CONTROLLER_SILHOUETTE_ANCHORS };
