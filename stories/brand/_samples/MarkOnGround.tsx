/* @layer stories @kind component */
import { Logo } from '../../../src/brand';
import { Box } from '../../../src/primitives';
import type { MarkOnGroundProps } from './MarkOnGround.type';
import './MarkOnGround.css';

const MarkOnGround = (props: MarkOnGroundProps) => {
  const { brand, ground } = props;
  return (
    <Box className="mark-on-ground" data-palette={brand === 'tessera' ? undefined : brand}>
      <Logo brand={brand} size="xl" ground={ground} title="" />
    </Box>
  );
};

export { MarkOnGround };
