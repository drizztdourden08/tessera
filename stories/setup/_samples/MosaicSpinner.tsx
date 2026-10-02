/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import type { SpinnerProps } from '../../../src/primitives';
import { MOSAIC_TILES } from './MosaicSpinner.constants';
import './MosaicSpinner.css';

const MosaicSpinner = (props: SpinnerProps) => {
  const { size = 'md', label, className = '' } = props;
  return (
    <Box as="span" className={`mosaic-spinner${className ? ` ${className}` : ''}`} data-size={size} role="status" aria-label={label}>
      {MOSAIC_TILES.map((tile) => <Box key={tile} as="span" className={`mosaic-spinner__tile mosaic-spinner__tile--${tile}`} />)}
    </Box>
  );
};

export { MosaicSpinner };
