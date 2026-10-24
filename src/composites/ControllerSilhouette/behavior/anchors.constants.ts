/* @layer renderer-components @kind data */
import type { ControllerSilhouetteAnchors } from '../ControllerSilhouette.type';

const CONTROLLER_SILHOUETTE_ANCHORS: ControllerSilhouetteAnchors = {
  offset: {
    'stick.left': { x: 120, y: 90, r: 20 },
    'stick.right': { x: 240, y: 137, r: 20 },
    'dpad': { x: 159, y: 141, r: 24 },
    'face': { x: 279, y: 92, r: 31 },
    'shoulder.left': { x: 128, y: 30 },
    'shoulder.right': { x: 272, y: 30 },
    'trigger.left': { x: 128, y: 14 },
    'trigger.right': { x: 272, y: 14 },
    'meta.view': { x: 176, y: 88, r: 6 },
    'meta.menu': { x: 224, y: 88, r: 6 },
    'meta.guide': { x: 200, y: 61, r: 13 },
    'meta.capture': { x: 200, y: 106, r: 5 },
  },
  symmetric: {
    'stick.left': { x: 142, y: 141, r: 30 },
    'stick.right': { x: 258, y: 141, r: 30 },
    'dpad': { x: 91, y: 96, r: 30 },
    'face': { x: 309, y: 96, r: 39 },
    'shoulder.left': { x: 95, y: 30 },
    'shoulder.right': { x: 305, y: 30 },
    'trigger.left': { x: 95, y: 14 },
    'trigger.right': { x: 305, y: 14 },
    'meta.view': { x: 126, y: 58, r: 8 },
    'meta.menu': { x: 274, y: 58, r: 8 },
    'meta.guide': { x: 200, y: 142, r: 10 },
  },
  nintendo: {
    'stick.left': { x: 113, y: 94, r: 22 },
    'stick.right': { x: 241, y: 139, r: 22 },
    'dpad': { x: 152, y: 139, r: 27 },
    'face': { x: 282, y: 95, r: 32 },
    'shoulder.left': { x: 110, y: 35 },
    'shoulder.right': { x: 290, y: 35 },
    'trigger.left': { x: 110, y: 14 },
    'trigger.right': { x: 290, y: 14 },
    'meta.view': { x: 160, y: 72, r: 6 },
    'meta.menu': { x: 240, y: 72, r: 6 },
    'meta.guide': { x: 222, y: 95, r: 6 },
    'meta.capture': { x: 178, y: 95, r: 6 },
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
