/* @layer renderer-components @kind logic */
import type { MascotAnimation, MascotMotion } from '../../motion/motion.type';

const pickClip = (motion: MascotMotion | undefined, animation: string | undefined): MascotAnimation | undefined =>
  motion && (motion.animations[animation ?? motion.rest] ?? motion.animations[motion.rest]);

export { pickClip };
