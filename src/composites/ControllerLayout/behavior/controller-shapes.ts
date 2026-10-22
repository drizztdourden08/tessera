/* @layer renderer-components @kind logic */
import type { ControllerControlKind, ControllerPlace, ControllerShape, ControllerSlotId, ControllerTagAt } from '../ControllerLayout.type';

type StickSide = 'left' | 'right';

const TAG_GAP = 4;
const FACE_GAP = 24;
const FACE_R = 12;
const ARM_W = 18;
const ARM_L = 20;
const ARM_R = 3;
const HALF = ARM_W / 2;

const circle = (cx: number, cy: number, r: number): ControllerShape => ({ kind: 'circle', cx, cy, r });

const rect = (x: number, y: number, w: number, h: number, r: number): ControllerShape => ({ kind: 'rect', x, y, w, h, r });

const centerOf = (shape: ControllerShape) =>
  shape.kind === 'circle' ? { x: shape.cx, y: shape.cy } : { x: shape.x + shape.w / 2, y: shape.y + shape.h / 2 };

const bottomOf = (shape: ControllerShape): number => (shape.kind === 'circle' ? shape.cy + shape.r : shape.y + shape.h);

const place = (id: ControllerSlotId, kind: ControllerControlKind, shape: ControllerShape, at: ControllerTagAt = 'on'): ControllerPlace => {
  const center = centerOf(shape);
  const y = at === 'on' ? center.y : bottomOf(shape) + TAG_GAP;
  return { id, kind, shape, tag: { x: center.x, y, at } };
};

const face = (cx: number, cy: number): ControllerPlace[] => [
  place('face.north', 'button', circle(cx, cy - FACE_GAP, FACE_R)),
  place('face.east', 'button', circle(cx + FACE_GAP, cy, FACE_R)),
  place('face.south', 'button', circle(cx, cy + FACE_GAP, FACE_R)),
  place('face.west', 'button', circle(cx - FACE_GAP, cy, FACE_R)),
];

const dpad = (cx: number, cy: number): ControllerPlace[] => [
  place('dpad.up', 'button', rect(cx - HALF, cy - HALF - ARM_L, ARM_W, ARM_L, ARM_R)),
  place('dpad.down', 'button', rect(cx - HALF, cy + HALF, ARM_W, ARM_L, ARM_R)),
  place('dpad.left', 'button', rect(cx - HALF - ARM_L, cy - HALF, ARM_L, ARM_W, ARM_R)),
  place('dpad.right', 'button', rect(cx + HALF, cy - HALF, ARM_L, ARM_W, ARM_R)),
];

const dpadHub = (cx: number, cy: number): ControllerShape => rect(cx - HALF, cy - HALF, ARM_W, ARM_W, 0);

const stick = (side: StickSide, cx: number, cy: number, r: number): ControllerPlace =>
  place(`stick.${side}`, 'stick', circle(cx, cy, r), 'below');

const pill = (id: ControllerSlotId, cx: number, cy: number): ControllerPlace => place(id, 'button', rect(cx - 9, cy - 6, 18, 12, 6), 'below');

const dot = (id: ControllerSlotId, cx: number, cy: number, r: number): ControllerPlace => place(id, 'button', circle(cx, cy, r), 'below');

const square = (id: ControllerSlotId, cx: number, cy: number): ControllerPlace => place(id, 'button', rect(cx - 6, cy - 5, 12, 10, 3), 'below');

export { dot, dpad, dpadHub, face, pill, place, rect, square, stick };
