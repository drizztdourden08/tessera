/* @layer renderer-components @kind logic */
import type { MotionTrack } from '../motion/motion.type';
import type { IsletBeat } from './pelago.type';
import { PELAGO_ISLETS } from './pelago-islets.constants';
import { PELAGO_RIG } from './pelago-rig.constants';
import { threadFrames } from './thread-frames';

const isletTracks = (beats: readonly IsletBeat[], lag?: number): MotionTrack[] => {
  const islets = PELAGO_ISLETS.map((id) => ({
    part: `islet${id.toUpperCase()}`,
    frames: beats.map((beat) => ({ at: beat.at, ...(beat.ease ? { ease: beat.ease } : {}), ...beat.moves?.[id] })),
  }));
  const threads = PELAGO_RIG.threads.map((thread) => ({ part: thread.id, frames: threadFrames(thread, beats) }));
  return [...islets, ...threads].map((track) => (lag === undefined ? track : { ...track, lag }));
};

export { isletTracks };
