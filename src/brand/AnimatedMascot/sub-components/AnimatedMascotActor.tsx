/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import { BrandScene } from '../../BrandScene';
import { actorRig } from '../../MascotStage/behavior/actor-rig';
import { actorStartScene } from '../../MascotStage/behavior/actor-start-scene';
import type { MascotClip } from '../../motion/mascot-clip.type';
import { animatedMascotClass } from '../behavior/animated-mascot-class';
import { useMascotActor } from '../behavior/useMascotActor';
import type { AnimatedMascotActorProps } from './AnimatedMascotActor.type';

const AnimatedMascotActor = (props: AnimatedMascotActorProps) => {
  const { brand, animation, scale, title } = props;
  const ref = useRef<SVGSVGElement>(null);
  const rig = actorRig(brand);
  const firstClip = useRef(animation);
  const scene = useMemo(() => (rig ? actorStartScene(rig, firstClip.current) : undefined), [rig]);
  useMascotActor(ref, { ...props, rest: (rig?.motion.rest ?? 'idle') as MascotClip, scene });
  if (!rig || !scene) return null;
  return <BrandScene ref={ref} scene={scene} scale={scale} title={title ?? rig.mascot.name} className={animatedMascotClass(props)} />;
};

export { AnimatedMascotActor };
