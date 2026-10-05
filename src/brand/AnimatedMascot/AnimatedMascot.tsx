/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Span } from '../../primitives/text-elements';
import type { AnimatedMascotProps } from './AnimatedMascot.type';
import { mascotBrandOf } from './behavior/mascot-brand-of';
import { usePaletteName } from './behavior/usePaletteName';
import { AnimatedMascotActor } from './sub-components/AnimatedMascotActor';
import './AnimatedMascot.css';

const AnimatedMascot = (props: AnimatedMascotProps) => {
  const { brand } = props;
  const ref = useRef<HTMLElement>(null);
  const palette = usePaletteName(ref, brand === 'auto');
  if (brand !== 'auto') return <AnimatedMascotActor {...props} brand={brand} />;
  const picked = mascotBrandOf(palette);
  return (
    <Span ref={ref} className="animated-mascot-auto" data-mascot={picked ?? 'none'}>
      {picked !== null && <AnimatedMascotActor {...props} brand={picked} />}
    </Span>
  );
};

export { AnimatedMascot };
