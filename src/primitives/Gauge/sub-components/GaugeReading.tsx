/* @layer renderer-components @kind component */
import type { GaugeReadingProps } from './GaugeReading.type';

const GaugeReading = (props: GaugeReadingProps) => {
  const { reading, unit } = props;
  return (
    <span className="gauge__reading">
      <span className="gauge__value">{reading}</span>
      {unit && <span className="gauge__unit">{unit}</span>}
    </span>
  );
};

export { GaugeReading };
