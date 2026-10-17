/* @layer renderer-components @kind data */
import type { VolumeWave } from './VolumeIcon.type';

const VOLUME_ICON_BOX = '0 0 24 24';

const VOLUME_SPEAKER = 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z';

const VOLUME_WAVES: readonly VolumeWave[] = [
  { up: 'M15.5 12A4.5 4.5 0 0 0 14.18 8.82', down: 'M15.5 12A4.5 4.5 0 0 1 14.18 15.18' },
  { up: 'M19 12A8 8 0 0 0 16.66 6.34', down: 'M19 12A8 8 0 0 1 16.66 17.66' },
  { up: 'M22.5 12A11.5 11.5 0 0 0 19.41 4.16', down: 'M22.5 12A11.5 11.5 0 0 1 19.41 19.84' },
];

const VOLUME_CROSS = ['M16 9l6 6', 'M22 9l-6 6'] as const;

const VOLUME_STEPS = 3;

const VOLUME_STROKE = 2;

export { VOLUME_CROSS, VOLUME_ICON_BOX, VOLUME_SPEAKER, VOLUME_STEPS, VOLUME_STROKE, VOLUME_WAVES };
