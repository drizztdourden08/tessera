/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useReducedMotion } from '../../../primitives/dom/useReducedMotion';
import { MIN_SPEED } from '../AnimatedMascot.constants';
import { lastToEnd } from './last-to-end';
import { playClip } from './play-clip';
import { startAnimations } from './start-animations';
import type { MascotMotionOptions, MotionLive } from './useMascotMotion.type';

const useMascotMotion = (ref: RefObject<SVGSVGElement | null>, options: MascotMotionOptions): void => {
  const { motion, clip, loop, playing, speed, onFinish } = options;
  const still = useReducedMotion(ref);
  const running = useRef<readonly Animation[]>([]);
  const drifting = useRef<readonly Animation[]>([]);
  const live = useRef<MotionLive>({ playing, rate: Math.max(speed, MIN_SPEED), onFinish });

  useEffect(() => {
    live.current.playing = playing;
    for (const animation of [...running.current, ...drifting.current]) {
      if (playing) animation.play();
      else animation.pause();
    }
  }, [playing]);

  useEffect(() => {
    live.current.rate = Math.max(speed, MIN_SPEED);
    for (const animation of [...running.current, ...drifting.current]) animation.updatePlaybackRate(live.current.rate);
  }, [speed]);

  useEffect(() => {
    live.current.onFinish = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !motion?.ambient || still) return undefined;
    const animations = playClip(svg, motion, motion.ambient, true);
    startAnimations(animations, live.current);
    drifting.current = animations;
    return () => {
      for (const animation of animations) animation.cancel();
      drifting.current = [];
    };
  }, [ref, motion, still]);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !motion || !clip || still) return undefined;
    const animations = playClip(svg, motion, clip, loop ?? clip.loop);
    const last = lastToEnd(animations);
    const report = () => live.current.onFinish?.();
    startAnimations(animations, live.current);
    last?.addEventListener('finish', report);
    running.current = animations;
    return () => {
      last?.removeEventListener('finish', report);
      for (const animation of animations) animation.cancel();
      running.current = [];
    };
  }, [ref, motion, clip, loop, still]);
};

export { useMascotMotion };
