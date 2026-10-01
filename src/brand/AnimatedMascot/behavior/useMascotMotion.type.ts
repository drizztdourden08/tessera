/* @layer renderer-components @kind types */
import type { MascotAnimation, MascotMotion } from '../../motion/motion.type';

interface MascotMotionOptions {
  motion: MascotMotion | undefined;
  clip: MascotAnimation | undefined;
  loop: boolean | undefined;
  playing: boolean;
  speed: number;
  onFinish: (() => void) | undefined;
}

export type { MascotMotionOptions };
