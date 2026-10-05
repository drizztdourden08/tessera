/* @layer renderer-components @kind component */
import { useLayoutEffect, useMemo, useRef } from 'react';
import { BrandScene } from '../../BrandScene';
import { actorRig } from '../behavior/actor-rig';
import { actorScale } from '../behavior/actor-scale';
import { actorStartScene } from '../behavior/actor-start-scene';
import { reducedNow } from '../behavior/reduced-now';
import type { StageActorProps } from './StageActor.type';
import { Box } from '../../../primitives/Box';

const StageActor = (props: StageActorProps) => {
  const { cast, index, count, height, engine } = props;
  const rig = actorRig(cast.brand);
  const wrapRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const firstClip = useRef(cast.clip);
  const scene = useMemo(() => (rig ? actorStartScene(rig, firstClip.current) : undefined), [rig]);
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
