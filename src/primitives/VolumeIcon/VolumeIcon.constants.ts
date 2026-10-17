/* @layer renderer-components @kind data */
import type { VolumeWave } from './VolumeIcon.type';

const VOLUME_ICON_BOX = '0 0 24 24';

const VOLUME_SPEAKER = 'M10 4.702a.705.705 0 0 0-1.203-.498L5.413 7.587A1.4 1.4 0 0 1 4.416 8H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 10 19.298z';

const VOLUME_WAVES: readonly VolumeWave[] = [
  { up: 'M14 12A4 4 0 0 0 12.57 8.94', down: 'M14 12A4 4 0 0 1 12.57 15.06' },
  { up: 'M17 12A7 7 0 0 0 14.5 6.64', down: 'M17 12A7 7 0 0 1 14.5 17.36' },
  { up: 'M20 12A10 10 0 0 0 16.43 4.34', down: 'M20 12A10 10 0 0 1 16.43 19.66' },
  { up: 'M23 12A13 13 0 0 0 18.36 2.04', down: 'M23 12A13 13 0 0 1 18.36 21.96' },
];

const VOLUME_CROSS = ['M15 9l6 6', 'M21 9l-6 6'] as const;

const VOLUME_STEPS = 4;

const VOLUME_STROKE = 2;

export { VOLUME_CROSS, VOLUME_ICON_BOX, VOLUME_SPEAKER, VOLUME_STEPS, VOLUME_STROKE, VOLUME_WAVES };
