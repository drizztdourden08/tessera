/* @layer stories @kind component */
import { useLayoutEffect, useMemo, useRef } from 'react';
import { REDUCED_MOTION_QUERY } from '../../../../src/primitives/dom/reduced-motion.constants';
import { BrandScene } from '../../../../src/brand/BrandScene';
import type { MascotClip } from '../../../../src/brand/motion/mascot-clip.type';
import { actorRig } from '../behavior/actor-rig';
import { actorScale } from '../behavior/actor-scale';
import { actorScene } from '../behavior/actor-scene';
import type { StageActorProps } from './StageActor.type';
import { Box } from '../../../../src/primitives';

const reducedNow = (node: Element): boolean => node.ownerDocument.defaultView?.matchMedia(REDUCED_MOTION_QUERY).matches ?? false;

const StageActor = (props: StageActorProps) => {
  const { cast, index, count, height, engine } = props;
  const rig = actorRig(cast.brand);
  const wrapRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const firstClip = useRef(cast.clip);
  const scene = useMemo(() => {
    if (!rig) return undefined;
    const rest = rig.motion.rest as MascotClip;
    const clip = rig.clips.get(firstClip.current ?? rest) ?? rig.clips.get(rest);
    return actorScene(rig, clip?.still ?? new Set());
  }, [rig]);
  const scale = rig ? actorScale(rig, height, cast.size) : 1;
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return undefined;
    wrap.style.insetInlineStart = '0';
    return engine.attach(cast.id, wrap, svg, reducedNow(wrap));
  }, [engine, cast.id, scale]);
  if (!rig || !scene) return null;
  const shift = rig.anchor * scale;
  const style = cast.x === undefined
    ? { insetInlineStart: `${((index + 1) * 100) / (count + 1)}%`, transform: `translateX(${-shift}px)` }
    : { transform: `translateX(${cast.x - shift}px)` };
  return (
    <Box ref={wrapRef} className="mascot-stage__actor" style={style}>
      <BrandScene ref={svgRef} scene={scene} scale={scale} title={rig.mascot.name} />
    </Box>
  );
};

export { StageActor };
