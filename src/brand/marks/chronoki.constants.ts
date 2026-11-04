/* @layer renderer-components @kind data */
import type { BrandMarkData } from '../brand.type';

const INK = {
  outline: '#1a1008',
  gold: '#d4a537',
  bronze: '#8c6a2e',
  oxblood: '#7e1a1c',
  face: '#4a0e10',
  glint: '#f0d58a',
  onDarkOutline: '#8c6a2e',
  onDarkFace: '#b34a44',
  onDarkGem: '#d0463f',
} as const;

const CHRONOKI_MARK: BrandMarkData = {
  viewBox: '0 0 64 64',
  grounds: { dark: { inks: 'onDark' }, light: { outline: 'dark' } },
  paths: [
    { ink: INK.outline, onDark: INK.onDarkOutline, d: 'M32 2a30 30 0 1 0 0 60a30 30 0 1 0 0-60z' },
    { ink: INK.gold, evenOdd: true, d: 'M32 4a28 28 0 1 0 0 56a28 28 0 1 0 0-56zM32 10a22 22 0 1 1 0 44a22 22 0 1 1 0-44z' },
    { ink: INK.bronze, evenOdd: true, d: 'M32 8.4a23.6 23.6 0 1 0 0 47.2a23.6 23.6 0 1 0 0-47.2zM32 10a22 22 0 1 1 0 44a22 22 0 1 1 0-44z' },
    { ink: INK.face, onDark: INK.onDarkFace, d: 'M32 10a22 22 0 1 0 0 44a22 22 0 1 0 0-44z' },
    { ink: INK.gold, d: 'M30.5 14h3v5h-3zM30.5 45h3v5h-3zM14 30.5h5v3h-5zM45 30.5h5v3h-5z' },
    { ink: INK.oxblood, onDark: INK.onDarkGem, d: 'M32 3.8l3.2 3.7-3.2 3.7-3.2-3.7z' },
    { ink: INK.glint, d: 'M24.5 6.2a28 28 0 0 1 7.5-1.2v1.6a26.4 26.4 0 0 0-7 1.2z' },
    { ink: INK.gold, d: 'M30.6 33.4L32 17l1.4 16.4zM31.3 33.2L42 37.8L32.7 30.8z' },
    { ink: INK.gold, d: 'M32 28.6a3.4 3.4 0 1 0 0 6.8a3.4 3.4 0 1 0 0-6.8z' },
    { ink: INK.oxblood, onDark: INK.onDarkGem, d: 'M32 30.4a1.6 1.6 0 1 0 0 3.2a1.6 1.6 0 1 0 0-3.2z' },
  ],
};

export { CHRONOKI_MARK };
