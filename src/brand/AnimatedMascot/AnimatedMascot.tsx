/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import { BrandScene } from '../BrandScene';
import { BRAND_FAMILY } from '../family.constants';
import type { AnimatedMascotBrand, AnimatedMascotProps } from './AnimatedMascot.type';
import { animatedMascotClass } from './behavior/animated-mascot-class';
import { mascotStage } from './behavior/mascot-stage';
import { pickClip } from './behavior/pick-clip';
import { useMascotMotion } from './behavior/useMascotMotion';
import './AnimatedMascot.css';

const AnimatedMascot = <B extends AnimatedMascotBrand>(props: AnimatedMascotProps<B>) => {
  const { brand, animation, playing = true, speed = 1, loop, scale, title, onFinish } = props;
  const { mascot } = BRAND_FAMILY[brand];
  const motion = mascot?.motion;
  const ref = useRef<SVGSVGElement>(null);
  const clip = pickClip(motion, animation);
  const scene = useMemo(() => mascotStage(mascot), [mascot]);
  useMascotMotion(ref, { motion, clip, loop, playing, speed, onFinish });
  if (!mascot || !scene) return null;
  return <BrandScene ref={ref} scene={scene} scale={scale} title={title ?? mascot.name} className={animatedMascotClass(props)} />;
};

export { AnimatedMascot };
