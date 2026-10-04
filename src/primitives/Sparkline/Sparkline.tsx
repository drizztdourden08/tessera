/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { sparklineBandBox } from './behavior/sparkline-band-box';
import { sparklineDomain } from './behavior/sparkline-domain';
import { sparklineFrame } from './behavior/sparkline-frame';
import { sparklineGeometry } from './behavior/sparkline-geometry';
import { useSparklineName } from './behavior/useSparklineName';
import { SparklineArea } from './sub-components/SparklineArea';
import { SparklineBandView } from './sub-components/SparklineBandView';
import { SparklineDot } from './sub-components/SparklineDot';
import { DEFAULT_BAND_TONE, VIEW_BOX } from './Sparkline.constants';
import type { SparklineProps } from './Sparkline.type';
import './Sparkline.css';

const Sparkline = (props: SparklineProps) => {
  const { values, variant = 'line', length, min, max, band, dot = false, tone = 'primary', width, height, label, format, className } = props;
  const domain = useMemo(() => sparklineDomain(values, min, max), [values, min, max]);
  const geometry = useMemo(() => sparklineGeometry(values, domain, length), [values, domain, length]);
  const bandBox = useMemo(() => sparklineBandBox(band, domain), [band, domain]);
  const name = useSparklineName(label, values, format);

  return (
    <svg
      className={className ? `sparkline ${className}` : 'sparkline'}
      viewBox={VIEW_BOX}
      preserveAspectRatio="none"
      data-tone={tone}
      focusable="false"
      {...sparklineFrame(name, width, height)}
    >
      {bandBox && <SparklineBandView box={bandBox} tone={band?.tone ?? DEFAULT_BAND_TONE} />}
      {variant === 'area' && <SparklineArea d={geometry.area} />}
      <path className="sparkline__line" d={geometry.line} vectorEffect="non-scaling-stroke" />
      {dot && <SparklineDot end={geometry.end} latest={values[values.length - 1]} band={band} />}
    </svg>
  );
};

export { Sparkline };
