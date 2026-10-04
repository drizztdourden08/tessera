/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ProgressBar } from '../../../primitives/ProgressBar';
import { Text } from '../../../primitives/Text';
import type { UtilityProgressProps } from './UtilityProgress.type';

const UtilityProgress = (props: UtilityProgressProps) => {
  const { value, max = 100, label } = props.progress;
  const percent = `${Math.round((value / max) * 100)}%`;
  return (
    <Box className="utility-screen__progress">
      <ProgressBar value={value} max={max} label={label} live />
      <Text className="utility-screen__percent" aria-hidden="true">{percent}</Text>
    </Box>
  );
};

export { UtilityProgress };
