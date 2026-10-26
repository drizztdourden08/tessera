/* @layer stories @kind data */
import type { MenuGroup, MenuItem } from '../../../src/composites';

const ignore = (): void => undefined;

const entry = (id: string, label: string, shortcut?: string): MenuItem => ({ id, label, shortcut, onSelect: ignore });

const TRANSFORM_MENU: MenuGroup[] = [
  {
    id: 'flip',
    label: 'Flip and turn',
    items: [
      entry('flip-h', 'Flip horizontally', 'Ctrl+H'),
      entry('flip-v', 'Flip vertically', 'Ctrl+J'),
      entry('rotate-cw', 'Rotate 90 degrees clockwise', 'Ctrl+R'),
      entry('rotate-ccw', 'Rotate 90 degrees counter-clockwise', 'Ctrl+Shift+R'),
      entry('rotate-180', 'Rotate 180 degrees'),
    ],
  },
  {
    id: 'shift',
    label: 'Move the pixels',
    items: [
      entry('shift-left', 'Shift left'),
      entry('shift-right', 'Shift right'),
      entry('shift-up', 'Shift up'),
      entry('shift-down', 'Shift down'),
      {
        id: 'wrap',
        label: 'Wrap around the edges',
        children: [entry('wrap-x', 'Wrap sideways'), entry('wrap-y', 'Wrap up and down'), entry('wrap-both', 'Wrap both ways')],
      },
    ],
  },
  {
    id: 'size',
    label: 'Size',
    items: [
      entry('scale-2', 'Scale to 200 percent'),
      entry('scale-half', 'Scale to 50 percent'),
      entry('canvas-size', 'Canvas size', 'Ctrl+Alt+C'),
      entry('crop', 'Crop to the selection'),
      entry('trim', 'Trim empty borders'),
    ],
  },
];

const described = (id: string, label: string, description: string, shortcut?: string): MenuItem => ({ id, label, description, shortcut, onSelect: ignore });

const DESCRIBED_MENU: MenuGroup[] = [
  {
    id: 'turn',
    items: [
      described('flip-h', 'Flip horizontal', 'Mirror the pixels from left to right.', 'Shift+H'),
      described('rotate-ccw', 'Rotate 90 counterclockwise', 'Turn the pixels a quarter turn to the left.', 'Alt+Shift+R'),
      described('rotate', 'Rotate...', 'Turn the pixels by any angle. A preview opens first.'),
    ],
  },
  {
    id: 'canvas',
    items: [
      described('crop', 'Crop to selection', 'Cut the canvas down to the box around the selection. Every frame and layer is cut the same way.', 'Ctrl+Shift+X'),
      described('trim', 'Trim', 'Cut away the empty border around the drawing, over every frame. One undo step brings it back.', 'Ctrl+Shift+T'),
      described('canvas-size', 'Canvas size...', 'Make the canvas larger or smaller around an anchor. A dialog opens first.', 'Ctrl+Alt+C'),
    ],
  },
];

export { DESCRIBED_MENU, TRANSFORM_MENU };
