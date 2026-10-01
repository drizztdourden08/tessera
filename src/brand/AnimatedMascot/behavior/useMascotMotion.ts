/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useReducedMotion } from '../../../primitives/dom/useReducedMotion';
import { MIN_SPEED } from '../AnimatedMascot.constants';
import { playClip } from './play-clip';
import type { MascotMotionOptions } from './useMascotMotion.type';

const useMascotMotion = (ref: RefObject<SVGSVGElement | null>, options: MascotMotionOptions): void => {
  const { motion, clip, loop, playing, speed, onFinish } = options;
  const still = useReducedMotion(ref);
  const running = useRef<readonly Animation[]>([]);
  const live = useRef({ playing, rate: Math.max(speed, MIN_SPEED), onFinish });

  useEffect(() => {
    live.current.playing = playing;
    for (const animation of running.current) {
      if (playing) animation.play();
      else animation.pause();
    }
  }, [playing]);

  useEffect(() => {
    live.current.rate = Math.max(speed, MIN_SPEED);
    for (const animation of running.current) animation.updatePlaybackRate(live.current.rate);
  }, [speed]);

  useEffect(() => {
    live.current.onFinish = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !motion || !clip || still) return undefined;
    const animations = playClip(svg, motion, clip, loop ?? clip.loop);
    const report = () => live.current.onFinish?.();
    for (const animation of animations) {
      animation.playbackRate = live.current.rate;
      if (!live.current.playing) animation.pause();
    }
    animations[0]?.addEventListener('finish', report);
    running.current = animations;
    return () => {
      animations[0]?.removeEventListener('finish', report);
      for (const animation of animations) animation.cancel();
      running.current = [];
    };
  }, [ref, motion, clip, loop, still]);
};

export { useMascotMotion };
