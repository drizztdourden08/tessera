/* @layer renderer-components @kind constants */
import type { MascotClipGroup } from './mascot-clip-group.type';

const MASCOT_CLIP_GROUPS: readonly MascotClipGroup[] = [
  { id: 'motion', label: 'Motion', clips: ['idle', 'idle-bounce', 'move', 'move-wobble', 'jump', 'jump-hop', 'spin', 'wave', 'scan', 'point', 'link', 'blink'] },
  { id: 'expressions', label: 'Expressions', clips: ['default', 'happy', 'happy-grin', 'content', 'curious', 'focused', 'sleep', 'alert', 'alert-exclaim', 'love'] },
  { id: 'interactions', label: 'Interactions', clips: ['working', 'idea', 'success', 'confused', 'worried', 'low-power', 'resting'] },
];

export { MASCOT_CLIP_GROUPS };
