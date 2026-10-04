/* @layer renderer-components @kind component */
import { inBand } from '../behavior/in-band';
import { DEFAULT_BAND_TONE } from '../Sparkline.constants';
import type { SparklineDotProps } from './SparklineDot.type';

const SparklineDot = (props: SparklineDotProps) => {
  const { end, latest, band } = props;
  if (!end) return null;
  return (
    <path
      className="sparkline__dot"
      d={`M${end.x} ${end.y}h0`}
      data-tone={band && inBand(latest, band) ? band.tone ?? DEFAULT_BAND_TONE : undefined}
      vectorEffect="non-scaling-stroke"
    />
  );
};

export { SparklineDot };
