/* @layer stories @kind component */
import { useEffect, useRef, useState } from 'react';
import { Box, Icon, Svg, SvgCircle } from '../../src/primitives';
import type { IconEffect, IconName } from '../../src/primitives';
import { readIconSamples } from '../../src/primitives/Icon/behavior/read-icon-samples';
import type { IconSamples } from '../../src/primitives/Icon/sub-components/IconEffectHost.type';
import './icons.stories.css';

interface IconEffectSpecimenProps {
  name: IconName;
  effect?: IconEffect;
  size: number;
  showSamples: boolean;
  className?: string;
}

const DOT_SHARE = 64;

const IconEffectSpecimen = (props: IconEffectSpecimenProps) => {
  const { name, effect, size, showSamples, className } = props;
  const ref = useRef<HTMLElement>(null);
  const [samples, setSamples] = useState<IconSamples | null>(null);

  useEffect(() => {
    if (!showSamples) return undefined;
    const frame = requestAnimationFrame(() => {
      const svg = ref.current?.querySelector<SVGSVGElement>('svg.icon');
      setSamples(svg ? readIconSamples(svg) : null);
    });
    return () => cancelAnimationFrame(frame);
  }, [showSamples, name, size]);

  return (
    <Box ref={ref} as="span" className={`icon-effect-specimen${className ? ` ${className}` : ''}`}>
      <Icon name={name} size={size} effect={effect} />
      {showSamples && samples && (
        <Svg className="icon-effect-specimen__samples" viewBox={samples.viewBox} aria-hidden="true">
          {samples.points.map((point, i) => (
            <SvgCircle key={i} cx={point.x} cy={point.y} r={samples.span / DOT_SHARE} />
          ))}
        </Svg>
      )}
    </Box>
  );
};

export { IconEffectSpecimen };
