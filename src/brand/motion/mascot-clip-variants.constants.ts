/* @layer renderer-components @kind constants */
import type { MascotClip } from './mascot-clip.type';

const MASCOT_CLIP_VARIANTS: Readonly<Partial<Record<MascotClip, MascotClip>>> = {
  'idle-bounce': 'idle',
  'move-wobble': 'move',
  'jump-hop': 'jump',
  'happy-grin': 'happy',
  'alert-exclaim': 'alert',
};

export { MASCOT_CLIP_VARIANTS };
