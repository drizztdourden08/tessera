/* @layer stories @kind component */
import { useState } from 'react';
import { Slider } from '../../../src/primitives';
import type { ControlSize, SliderLabels } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';

type StatefulSliderProps = {
  initial: number | readonly [number, number];
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  keyStep?: number;
  stops?: readonly string[];
  labels?: SliderLabels;
  format?: (value: number) => string;
  showValue?: boolean;
  withMute?: boolean;
  disabled?: boolean;
  size?: ControlSize;
  ariaLabel?: string;
};

const SingleSlider = (props: StatefulSliderProps & { initial: number }) => {
  const { initial, format, withMute, ariaLabel, ...rest } = props;
  const [value, setValue] = useState(initial);
  return (
    <ValueReadout value={rest.stops?.[value] ?? value}>
      <Slider {...rest} value={value} onChange={setValue} formatValue={format} mute={withMute ? value === 0 : undefined} aria-label={ariaLabel} />
    </ValueReadout>
  );
};

const PairSlider = (props: StatefulSliderProps & { initial: readonly [number, number] }) => {
  const { initial, format, withMute, ariaLabel, stops, ...rest } = props;
  const [value, setValue] = useState<[number, number]>([initial[0], initial[1]]);
  const shown = value.map((at) => stops?.[at] ?? (format ? format(at) : String(at)));
  return (
    <ValueReadout value={shown}>
      <Slider {...rest} range stops={stops} value={value} onChange={setValue} formatValue={format} aria-label={ariaLabel} />
    </ValueReadout>
  );
};

const StatefulSlider = (props: StatefulSliderProps) => {
  const { initial } = props;
  return typeof initial === 'number' ? <SingleSlider {...props} initial={initial} /> : <PairSlider {...props} initial={initial} />;
};

export { StatefulSlider };
