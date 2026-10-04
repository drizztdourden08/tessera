/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { formatReading } from './behavior/format-reading';
import { gaugeAria } from './behavior/gauge-aria';
import { gaugeFraction } from './behavior/gauge-fraction';
import { gaugeThresholds } from './behavior/gauge-thresholds';
import { gaugeTone } from './behavior/gauge-tone';
import { gaugeZones } from './behavior/gauge-zones';
import { GaugeDial } from './sub-components/GaugeDial';
import { GaugeReading } from './sub-components/GaugeReading';
import { NO_ZONES } from './Gauge.constants';
import type { GaugeProps } from './Gauge.type';
import './Gauge.css';

const Gauge = (props: GaugeProps) => {
  const { value, min = 0, max = 100, thresholds, tone, unit, label, size = 'md', zones = false, format = formatReading, className } = props;
  const { charts } = useTesseraStrings();
  const edges = useMemo(() => gaugeThresholds(min, max, thresholds), [min, max, thresholds]);
  const zoneArcs = useMemo(() => (zones ? gaugeZones(min, max, edges) : NO_ZONES), [zones, min, max, edges]);
  const fraction = gaugeFraction(value, min, max);
  const reading = format(value);
  const aria = gaugeAria({ name: label ?? charts.meter, min, max, fraction, reading, unit });

  return (
    <div className={className ? `gauge ${className}` : 'gauge'} data-size={size} data-tone={tone ?? gaugeTone(value, edges)} {...aria}>
      <div className="gauge__dial">
        <GaugeDial fraction={fraction} zones={zoneArcs} />
        <GaugeReading reading={reading} unit={unit} />
      </div>
      {label && <span className="gauge__label">{label}</span>}
    </div>
  );
};

export { Gauge };
