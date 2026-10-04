/* @layer renderer-components @kind constants */
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { ClipRule } from './transition-rules.type';

/** Cross-fade of the body when nothing more specific applies, in milliseconds. */
const BLEND_MS = 220;

/** Extras (symbols, props, faces) fade a little slower than the body moves, so they never pop. */
const EXTRAS_FADE_MS = 320;

/** A turn squashes the mascot through its side view in this time. */
const TURN_MS = 240;

/** Priority at or above which a request cuts through a protected moment. */
const URGENT = 2;

/**
 * Per clip: how fast it blends in, a protected stretch (as a share of the clip) that ordinary requests
 * wait out, and whether asking for it is urgent. Mid-air jumps are protected; alerts cut through anything.
 */
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
