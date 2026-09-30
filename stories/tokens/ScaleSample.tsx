/* @layer stories @kind component */
import { Box } from '../../src/primitives';
import { SPECIMEN_STYLE } from './ScaleSample.constants';
import { TokenValue } from './TokenValue';
import type { ScaleSampleProps } from './scale-stories.type';
import './scale-stories.css';

const stacking = (declared: string): string => `stacks above anything lower than ${declared}`;

const ScaleSample = ({ token, specimen }: ScaleSampleProps) => {
  if (specimen === 'z') return <TokenValue token={token} format={stacking} />;
  return (
    <Box className={`scale-row__track scale-row__track--${specimen}`}>
      <Box className={`scale-row__specimen scale-row__specimen--${specimen}`} style={SPECIMEN_STYLE[specimen](token)} />
    </Box>
  );
};

export { ScaleSample };
