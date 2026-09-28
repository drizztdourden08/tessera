/* @layer stories @kind component */
import { Box, Text } from '../../src/primitives';
import './variable-type.css';

interface WeightRampProps {
  from: number;
  to: number;
  step: number;
  word: string;
}

const stepsOf = (from: number, to: number, step: number): number[] =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_unused, index) => from + index * step);

const WeightRamp = ({ from, to, step, word }: WeightRampProps) => (
  <Box className="story-list">
    {stepsOf(from, to, step).map((weight) => (
      <Box key={weight} className="story-list__item">
        <Text className="weight-ramp__value">{weight}</Text>
        <Text className="weight-ramp__word" weight={weight}>{word}</Text>
      </Box>
    ))}
  </Box>
);

export { WeightRamp };
