/* @layer renderer-components @kind types */
import type { MascotClip } from './mascot-clip.type';

type MascotClipGroupId = 'motion' | 'expressions' | 'interactions';

interface MascotClipGroup {
  id: MascotClipGroupId;
  label: string;
  clips: readonly MascotClip[];
}

export type { MascotClipGroup, MascotClipGroupId };
