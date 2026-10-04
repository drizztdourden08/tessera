/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_CONTENT: MascotAnimation = {
  name: 'Content',
  summary: 'A soft squint: the eyes curve into gentle arches and Sentri rises a pixel and sinks again, slow and easy, the pods swaying with it.',
  duration: 4000,
  loop: true,
  still: ['soft'],
  tracks: [
    stepTrack('rig', [{ at: 0 }, { at: 0.5, y: -1 }, { at: 1 }]),
    stepTrack('podLeft', [{ at: 0 }, { at: 0.5, rotate: 6 }, { at: 1 }]),
    stepTrack('podRight', [{ at: 0 }, { at: 0.5, rotate: -6 }, { at: 1 }]),
  ],
};

export { SENTRI_CONTENT };
