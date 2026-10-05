/* @layer stories @kind data */
import type { IconPath } from '../../src/primitives';

const OWN_PATHS = {
  plus: { d: 'M7 2h2v5h5v2H9v5H7V9H2V7h5z' },
  close: { d: 'M3.4 2 8 6.6 12.6 2 14 3.4 9.4 8l4.6 4.6-1.4 1.4L8 9.4 3.4 14 2 12.6 6.6 8 2 3.4z' },
  check: { d: 'M6 10.6 12.6 4 14 5.4l-8 8-4-4L3.4 8z' },
  folder: { d: 'M1 3h5l2 2h7v8H1z' },
  play: { d: 'M4 2v12l10-6z' },
  overflow: { circles: [{ cx: 3, cy: 8, r: 1.5 }, { cx: 8, cy: 8, r: 1.5 }, { cx: 13, cy: 8, r: 1.5 }] },
} as const satisfies Record<string, IconPath>;

const OWN_PATH_SIZES = ['12px', '16px', '24px', '32px'] as const;

export { OWN_PATH_SIZES, OWN_PATHS };
