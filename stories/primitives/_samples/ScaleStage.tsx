/* @layer stories @kind component */
import { Box, ScaleLabels } from '../../../src/primitives';
import type { ScaleLabelsProps } from '../../../src/primitives';
import './ScaleStage.css';

type ScaleStageProps = ScaleLabelsProps & { width?: 'narrow' | 'medium' | 'wide' };

const ScaleStage = (props: ScaleStageProps) => {
  const { width = 'wide', orientation = 'horizontal', ...rest } = props;
  return (
    <Box className={`scale-stage scale-stage--${orientation} scale-stage--${width}`}>
      <Box className="scale-stage__axis" />
      <ScaleLabels orientation={orientation} {...rest} />
    </Box>
  );
};

export { ScaleStage };
