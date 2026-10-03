/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Span } from '../../primitives/text-elements';
import { AnimatedMascot } from '../AnimatedMascot';
import { MASCOTS } from './ChosenMascot.constants';
import { mascotFor } from './behavior/mascot-for';
import { usePaletteName } from './behavior/usePaletteName';
import type { ChosenMascotProps } from './ChosenMascot.type';
import './ChosenMascot.css';

const ChosenMascot = (props: ChosenMascotProps) => {
  const { mascot = 'auto', brand, animation, playing, loop, size, scale, title, className } = props;
  const ref = useRef<HTMLElement>(null);
  const palette = usePaletteName(ref, mascot === 'auto' && brand === undefined);
  const name = mascotFor(mascot, brand, palette);
  return (
    <Span ref={ref} className="chosen-mascot" data-mascot={name}>
      <AnimatedMascot
        brand={MASCOTS[name]}
        animation={animation}
        playing={playing}
        loop={loop}
        size={size}
        scale={scale}
        title={title}
        className={className}
      />
    </Span>
  );
};

export { ChosenMascot };
