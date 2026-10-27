/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import { FILL_WIDTHS } from './FillBoxes.constants';
import type { FillBoxesProps } from './FillBoxes.type';
import './FillBoxes.css';

const FillBoxes = (props: FillBoxesProps) => {
  const { draw } = props;
  return (
    <Box className="fill-boxes">
      {FILL_WIDTHS.map((width) => (
        <Box key={width} className={`fill-boxes__box fill-boxes__box--${width}`}>{draw()}</Box>
      ))}
    </Box>
  );
};

export { FillBoxes };
