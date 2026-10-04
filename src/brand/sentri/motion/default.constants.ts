/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_DEFAULT: MascotAnimation = {
  name: 'Default',
  summary: 'The neutral face, still and calm: Sentri holds its place and only blinks now and then.',
  duration: 5000,
  loop: true,
  tracks: [stepTrack('closed', [{ at: 0 }, { at: 0.6, opacity: 1 }, { at: 0.63 }, { at: 1 }])],
};

export { SENTRI_DEFAULT };
