/* @layer stories @kind data */
import type { ImageSaveSlot } from './ImageSaveSlots.type';

const roomUri = (floor: string, wall: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'>`
    + `<rect width='160' height='90' fill='${wall}'/>`
    + `<rect x='16' y='14' width='128' height='62' fill='${floor}'/>`
    + `<rect x='72' y='14' width='16' height='8' fill='#1a1a1a'/>`
    + `<rect x='40' y='40' width='10' height='10' fill='#d9a441'/>`
    + `<circle cx='110' cy='52' r='5' fill='#e8e8e8'/>`
    + `</svg>`,
  )}`;

const CELLAR_URI = roomUri('#6b6b7a', '#3a3a48');
const RUINS_URI = roomUri('#8a7a5a', '#4a3f2e');
const MISSING_URI = 'data:image/png;base64,bm90LWFuLWltYWdl';

const SAVE_SLOTS: readonly ImageSaveSlot[] = [
  { name: 'Slot 1', detail: 'Castle cellar, 2h 14m', src: CELLAR_URI },
  { name: 'Slot 2', detail: 'Eastern ruins, 3h 02m', src: RUINS_URI },
  { name: 'Slot 3', detail: 'Saving now', pending: true },
  { name: 'Slot 4', detail: 'Screenshot missing', src: MISSING_URI },
  { name: 'Slot 5', detail: 'Empty' },
];

const FRAME_SIZES = ['sm', 'md', 'lg'] as const;

export { FRAME_SIZES, MISSING_URI, RUINS_URI, SAVE_SLOTS };
