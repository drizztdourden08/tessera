/* @layer stories @kind component */
import { Logo } from '../../../src/brand';
import { Box } from '../../../src/primitives';
import type { MarkOnGroundProps } from './MarkOnGround.type';
import './MarkOnGround.css';

const MarkOnGround = (props: MarkOnGroundProps) => {
  const { brand, ground, inks } = props;
  return (
    <Box className={`mark-on-ground mark-on-ground--${ground}`} data-palette={brand === 'tessera' ? undefined : brand}>
      <Logo brand={brand} size="xl" ground={ground} inks={inks} title="" />
    </Box>
  );
};

export { MarkOnGround };
