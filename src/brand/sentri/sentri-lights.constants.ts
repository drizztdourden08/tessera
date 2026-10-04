/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';

const SENTRI_LIGHTS: Readonly<Record<'bulbOff' | 'bulb' | 'rays' | 'battery' | 'batteryCell' | 'laptop', BrandPiece>> = {
  bulbOff: {
    name: 'Bulb, off',
    w: 9,
    h: 11,
    paths: [
      { ink: '#000000', d: 'M3 0h3v1h-3zM2 1h1v1h-1zM6 1h1v1h-1zM1 2h1v1h-1zM7 2h1v1h-1zM0 3h1v1h-1zM8 3h1v1h-1zM0 4h1v1h-1zM8 4h1v1h-1zM0 5h1v1h-1zM8 5h1v1h-1zM1 6h1v1h-1zM7 6h1v1h-1zM2 7h1v1h-1zM6 7h1v1h-1zM2 8h1v1h-1zM6 8h1v1h-1zM2 9h1v1h-1zM6 9h1v1h-1zM3 10h3v1h-3z' },
      { ink: '#5f6b7d', d: 'M3 1h3v1h-3zM2 2h1v1h-1zM6 2h1v1h-1zM1 3h1v1h-1zM6 3h1v1h-1zM1 4h1v1h-1zM5 4h2v1h-2zM1 5h2v1h-2zM4 5h2v1h-2zM2 6h3v1h-3zM3 7h1v1h-1z' },
      { ink: '#7d8a9c', d: 'M3 2h3v1h-3zM2 3h1v1h-1zM5 3h1v1h-1zM2 4h1v1h-1zM4 4h1v1h-1zM3 5h1v1h-1z' },
      { ink: '#9aa7b8', d: 'M3 3h2v1h-2zM3 4h1v1h-1z' },
      { ink: '#4a5464', d: 'M7 3h1v1h-1zM7 4h1v1h-1zM6 5h2v1h-2zM5 6h2v1h-2zM4 7h2v1h-2z' },
      { ink: '#b5c3d1', d: 'M3 8h1v1h-1zM5 8h1v1h-1zM4 9h1v1h-1z' },
      { ink: '#677f97', d: 'M4 8h1v1h-1zM3 9h1v1h-1zM5 9h1v1h-1z' },
    ],
  },
  bulb: {
    name: 'Bulb, lit',
    w: 9,
    h: 11,
    paths: [
      { ink: '#000000', d: 'M3 0h3v1h-3zM2 1h1v1h-1zM6 1h1v1h-1zM1 2h1v1h-1zM7 2h1v1h-1zM0 3h1v1h-1zM8 3h1v1h-1zM0 4h1v1h-1zM8 4h1v1h-1zM0 5h1v1h-1zM8 5h1v1h-1zM1 6h1v1h-1zM7 6h1v1h-1zM2 7h1v1h-1zM6 7h1v1h-1zM2 8h1v1h-1zM6 8h1v1h-1zM2 9h1v1h-1zM6 9h1v1h-1zM3 10h3v1h-3z' },
      { ink: '#ffdb49', d: 'M3 1h3v1h-3zM2 2h1v1h-1zM6 2h1v1h-1zM1 3h1v1h-1zM6 3h1v1h-1zM1 4h1v1h-1zM5 4h2v1h-2zM1 5h2v1h-2zM4 5h2v1h-2zM2 6h3v1h-3zM3 7h1v1h-1z' },
      { ink: '#fff3a0', d: 'M3 2h3v1h-3zM2 3h1v1h-1zM5 3h1v1h-1zM2 4h1v1h-1zM4 4h1v1h-1zM3 5h1v1h-1z' },
      { ink: '#fffbe6', d: 'M3 3h2v1h-2zM3 4h1v1h-1z' },
      { ink: '#ffb509', d: 'M7 3h1v1h-1zM7 4h1v1h-1zM6 5h2v1h-2zM5 6h2v1h-2zM4 7h2v1h-2z' },
      { ink: '#b5c3d1', d: 'M3 8h1v1h-1zM5 8h1v1h-1zM4 9h1v1h-1z' },
      { ink: '#677f97', d: 'M4 8h1v1h-1zM3 9h1v1h-1zM5 9h1v1h-1z' },
    ],
  },
  rays: {
    name: 'Bulb rays',
    w: 19,
    h: 8,
    paths: [
      { ink: '#ffdb49', d: 'M1 0h1v1h-1zM17 0h1v1h-1zM2 1h1v1h-1zM16 1h1v1h-1zM0 4h2v1h-2zM17 4h2v1h-2zM2 7h1v1h-1zM16 7h1v1h-1z' },
    ],
  },
  battery: {
    name: 'Battery',
    w: 14,
    h: 7,
    paths: [
      { ink: '#000000', d: 'M1 0h11v1h-11zM0 1h1v1h-1zM12 1h1v1h-1zM0 2h1v1h-1zM13 2h1v1h-1zM0 3h1v1h-1zM13 3h1v1h-1zM0 4h1v1h-1zM13 4h1v1h-1zM0 5h1v1h-1zM12 5h1v1h-1zM1 6h11v1h-11z' },
      { ink: '#d7e3ee', d: 'M1 1h11v1h-11zM1 2h1v1h-1zM11 2h1v1h-1zM1 3h1v1h-1zM11 3h1v1h-1zM1 4h1v1h-1zM11 4h1v1h-1z' },
      { ink: '#1b2230', d: 'M2 2h9v1h-9zM2 3h9v1h-9zM2 4h9v1h-9z' },
      { ink: '#9fb3c8', d: 'M12 2h1v1h-1zM12 3h1v1h-1zM12 4h1v1h-1zM1 5h11v1h-11z' },
    ],
  },
  batteryCell: {
    name: 'Battery cell',
    w: 2,
    h: 3,
    paths: [
      { ink: '#ff4040', d: 'M0 0h2v1h-2zM0 1h2v1h-2z' },
      { ink: '#c62828', d: 'M0 2h2v1h-2z' },
    ],
  },
  laptop: {
    name: 'Laptop',
    w: 24,
    h: 14,
    paths: [
      { ink: '#000000', d: 'M2 0h9v1h-9zM1 1h1v1h-1zM11 1h1v1h-1zM1 2h1v1h-1zM11 2h1v1h-1zM2 3h1v1h-1zM12 3h1v1h-1zM2 4h1v1h-1zM12 4h1v1h-1zM3 5h1v1h-1zM13 5h1v1h-1zM3 6h1v1h-1zM13 6h1v1h-1zM4 7h1v1h-1zM14 7h1v1h-1zM4 8h1v1h-1zM14 8h1v1h-1zM5 9h1v1h-1zM15 9h7v1h-7zM5 10h1v1h-1zM15 10h1v1h-1zM22 10h1v1h-1zM6 11h1v1h-1zM16 11h1v1h-1zM23 11h1v1h-1zM5 12h1v1h-1zM23 12h1v1h-1zM6 13h17v1h-17z' },
      { ink: '#26303d', d: 'M17 10h1v1h-1zM19 10h1v1h-1zM21 10h1v1h-1zM8 11h7v1h-7zM17 11h1v1h-1zM19 11h1v1h-1zM21 11h1v1h-1z' },
      { ink: '#3a4658', d: 'M2 2h8v1h-8zM3 3h8v1h-8zM3 4h4v1h-4zM8 4h3v1h-3zM4 5h2v1h-2zM9 5h3v1h-3zM4 6h3v1h-3zM8 6h4v1h-4zM5 7h8v1h-8zM5 8h8v1h-8zM7 9h7v1h-7z' },
      { ink: '#4e5d74', d: 'M6 9h1v1h-1zM6 10h8v1h-8zM7 11h1v1h-1zM15 11h1v1h-1zM6 12h17v1h-17z' },
      { ink: '#6b7d96', d: 'M2 1h8v1h-8zM7 4h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM7 6h1v1h-1z' },
      { ink: '#8a9bb3', d: 'M10 1h1v1h-1zM10 2h1v1h-1zM11 3h1v1h-1zM11 4h1v1h-1zM12 5h1v1h-1zM12 6h1v1h-1zM13 7h1v1h-1zM13 8h1v1h-1zM14 9h1v1h-1zM14 10h1v1h-1zM16 10h1v1h-1zM18 10h1v1h-1zM20 10h1v1h-1zM18 11h1v1h-1zM20 11h1v1h-1zM22 11h1v1h-1z' },
      { ink: '#c4d3e3', d: 'M7 5h1v1h-1z' },
      { ink: '#20c7ff', opacity: 0.45, d: 'M12 1h1v1h-1zM12 2h1v1h-1zM13 3h1v1h-1zM13 4h1v1h-1zM14 5h1v1h-1zM14 6h1v1h-1zM15 7h1v1h-1zM15 8h1v1h-1z' },
    ],
  },
};

export { SENTRI_LIGHTS };
