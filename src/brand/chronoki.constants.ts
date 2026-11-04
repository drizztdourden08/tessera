/* @layer renderer-components @kind data */
import type { BrandInfo } from './brand.type';
import { CHRONOKI_MARK } from './marks/chronoki.constants';

const CHRONOKI_BRAND: BrandInfo = {
  id: 'chronoki',
  name: 'ChronoKi',
  kind: 'App · native port project',
  colour: '#d4a537',
  colourName: 'Aged gold, its primary',
  tile: '#1a1008',
  appIcon: 'straight',
  summary: 'ChronoKi is a native port project. Its look is aged gold and oxblood around a clock.',
  placement: 'Last in the row, after Argus.',
  mark: CHRONOKI_MARK,
  wordmark: { text: 'ChronoKi', colors: ['#f0d58a', '#d4a537', '#a8802e', '#8c6a2e'] },
  gradient: { angle: 160, stops: ['#1c1208', '#120b05', '#0a0603'] },
  backdrop: {
    angle: 160,
    stops: ['#22170b', '#140d06'],
    glows: [
      { colour: '#d4a537', strength: 28, at: [72, 14], size: [44, 110] },
      { colour: '#7e1a1c', strength: 24, at: [10, 98], size: [46, 110] },
      { colour: '#8c6a2e', strength: 14, at: [96, 66], size: [26, 85] },
      { colour: '#f0d58a', strength: 6, at: [36, 0], size: [34, 55] },
      { colour: '#4a0e10', strength: 55, at: [60, 100], size: [52, 90] },
      { colour: '#3a2a12', strength: 50, at: [46, 46], size: [90, 140] },
    ],
  },
};

export { CHRONOKI_BRAND };
