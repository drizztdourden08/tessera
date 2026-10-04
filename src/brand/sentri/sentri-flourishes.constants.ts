/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';

const SENTRI_FLOURISHES: Readonly<Record<'swirlFront' | 'swirlBack' | 'sparkCyan' | 'sparkGold' | 'confettiNear' | 'confettiFar' | 'dust' | 'lift' | 'landing' | 'whoosh', BrandPiece>> = {
  swirlFront: {
    name: 'Swirl, front',
    w: 41,
    h: 11,
    paths: [
      { ink: '#e6f7ff', d: 'M1 7h3v1h-3zM37 7h3v1h-3zM3 8h4v1h-4zM34 8h4v1h-4zM6 9h6v1h-6zM29 9h6v1h-6zM11 10h7v1h-7zM24 10h6v1h-6z' },
    ],
  },
  swirlBack: {
    name: 'Swirl, back',
    w: 41,
    h: 11,
    paths: [
      { ink: '#61e8ff', opacity: 0.8, d: 'M6 1h3v1h-3zM33 1h2v1h-2zM3 2h4v1h-4zM34 2h4v1h-4zM1 3h3v1h-3zM37 3h3v1h-3zM0 4h2v1h-2zM39 4h2v1h-2zM0 5h1v1h-1zM40 5h1v1h-1z' },
    ],
  },
  sparkCyan: {
    name: 'Sparkles',
    w: 39,
    h: 25,
    paths: [
      { ink: '#61e8ff', d: 'M14 0h1v1h-1zM32 2h1v1h-1zM31 3h3v1h-3zM32 4h1v1h-1zM31 21h1v1h-1zM30 22h3v1h-3zM31 23h1v1h-1z' },
      { ink: '#e6f7ff', d: 'M4 6h1v1h-1zM4 7h1v1h-1zM2 8h5v1h-5zM4 9h1v1h-1zM4 10h1v1h-1z' },
      { ink: '#20c7ff', d: 'M35 7h1v1h-1zM6 22h1v1h-1z' },
    ],
  },
  sparkGold: {
    name: 'Gold sparkles',
    w: 39,
    h: 25,
    paths: [
      { ink: '#fff3a0', d: 'M29 0h1v1h-1zM29 1h1v1h-1zM27 2h5v1h-5zM29 3h1v1h-1zM29 4h1v1h-1z' },
      { ink: '#ffdb49', d: 'M5 3h1v1h-1zM4 4h3v1h-3zM5 5h1v1h-1zM36 6h1v1h-1zM35 7h3v1h-3zM36 8h1v1h-1z' },
      { ink: '#ffb509', d: 'M1 20h1v1h-1zM34 20h1v1h-1z' },
    ],
  },
  confettiNear: {
    name: 'Confetti, near',
    w: 37,
    h: 18,
    paths: [
      { ink: '#20c7ff', d: 'M24 1h1v1h-1zM8 9h2v1h-2zM8 10h2v1h-2z' },
      { ink: '#ff7a1a', d: 'M14 4h1v1h-1z' },
      { ink: '#ff4040', d: 'M21 6h2v1h-2zM21 7h2v1h-2z' },
      { ink: '#ffdb49', d: 'M26 10h1v1h-1zM11 14h1v1h-1z' },
    ],
  },
  confettiFar: {
    name: 'Confetti, far',
    w: 37,
    h: 19,
    paths: [
      { ink: '#ff7a1a', d: 'M12 0h1v1h-1zM26 0h2v1h-2zM26 1h2v1h-2zM4 16h2v1h-2zM4 17h2v1h-2z' },
      { ink: '#20c7ff', d: 'M20 2h1v1h-1zM2 7h2v1h-2zM2 8h2v1h-2z' },
      { ink: '#ff4040', d: 'M30 3h2v1h-2zM30 4h2v1h-2z' },
      { ink: '#ffdb49', d: 'M35 9h1v1h-1zM33 17h2v1h-2zM33 18h2v1h-2z' },
    ],
  },
  dust: {
    name: 'Bounce lines',
    w: 4,
    h: 3,
    paths: [
      { ink: '#61e8ff', d: 'M0 0h1v1h-1zM0 1h1v1h-1zM0 2h1v1h-1z' },
      { ink: '#e6f7ff', d: 'M2 1h1v1h-1zM2 2h1v1h-1z' },
    ],
  },
  lift: {
    name: 'Lift lines',
    w: 7,
    h: 5,
    paths: [
      { ink: '#e6f7ff', d: 'M3 0h1v1h-1zM3 1h1v1h-1zM3 2h1v1h-1zM3 3h1v1h-1zM3 4h1v1h-1z' },
      { ink: '#61e8ff', d: 'M0 1h1v1h-1zM6 1h1v1h-1zM0 2h1v1h-1zM6 2h1v1h-1zM0 3h1v1h-1zM6 3h1v1h-1z' },
    ],
  },
  landing: {
    name: 'Landing sparkles',
    w: 41,
    h: 4,
    paths: [
      { ink: '#e6f7ff', d: 'M1 0h1v1h-1zM39 0h1v1h-1zM0 1h3v1h-3zM38 1h3v1h-3zM1 2h1v1h-1zM39 2h1v1h-1z' },
      { ink: '#61e8ff', d: 'M5 3h1v1h-1zM35 3h1v1h-1z' },
    ],
  },
  whoosh: {
    name: 'Wobble lines',
    w: 43,
    h: 4,
    paths: [
      { ink: '#61e8ff', d: 'M1 0h1v1h-1zM41 0h1v1h-1zM0 1h1v1h-1zM42 1h1v1h-1zM0 2h1v1h-1zM42 2h1v1h-1zM1 3h1v1h-1zM41 3h1v1h-1z' },
      { ink: '#e6f7ff', d: 'M4 0h1v1h-1zM38 0h1v1h-1zM3 1h1v1h-1zM39 1h1v1h-1zM3 2h1v1h-1zM39 2h1v1h-1zM4 3h1v1h-1zM38 3h1v1h-1z' },
    ],
  },
};

export { SENTRI_FLOURISHES };
