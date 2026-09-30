/* @layer stories @kind component */
import { Text } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import type { WeightRampProps } from './WeightRamp.type';
import './variable-type.css';

const stepsOf = (from: number, to: number, step: number): string[] =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_unused, index) => String(from + index * step));

const WeightRamp = ({ from, to, step, word }: WeightRampProps) => (
  <Demonstrator
    rows={axis(stepsOf(from, to, step))}
    cell={(weight) => <Text className="weight-ramp__word" weight={Number(weight)}>{word}</Text>}
  />
);

export { WeightRamp };
