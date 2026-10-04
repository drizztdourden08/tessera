/* @layer stories @kind constants */
import type { MascotClip } from '../../../../src/brand/motion/mascot-clip.type';
import type { ClipRule } from './transition-rules.type';

const BLEND_MS = 220;

const EXTRAS_FADE_MS = 320;

const TURN_MS = 240;

const URGENT = 2;

const CLIP_RULES: Readonly<Partial<Record<MascotClip, ClipRule>>> = {
  'idle': { blendIn: 320 },
  'default': { blendIn: 320 },
  'move': { blendIn: 160 },
  'move-wobble': { blendIn: 160 },
  'jump': { blendIn: 120, protect: [0.18, 0.72] },
  'jump-hop': { blendIn: 120, protect: [0.12, 0.8] },
  'spin': { blendIn: 160, protect: [0.12, 0.5] },
  'alert': { blendIn: 110, urgent: true },
  'alert-exclaim': { blendIn: 110, urgent: true },
  'worried': { blendIn: 160, urgent: true },
  'sleep': { blendIn: 600 },
  'resting': { blendIn: 500 },
  'low-power': { blendIn: 500 },
};

export { BLEND_MS, CLIP_RULES, EXTRAS_FADE_MS, TURN_MS, URGENT };
