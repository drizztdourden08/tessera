/* @layer stories @kind component */
import { Logo } from '../../../src/brand';
import { Box } from '../../../src/primitives';
import { GroundContext } from '../../../src/primitives/ground/ground-context';
import type { MarkOnGroundProps } from './MarkOnGround.type';
import './MarkOnGround.css';

const MarkOnGround = (props: MarkOnGroundProps) => {
  const { brand } = props;
  return (
    <Box className="mark-on-ground" data-palette={brand === 'tessera' ? undefined : brand}>
      <GroundContext.Provider value="dark">
        <Logo brand={brand} size="xl" title="" />
      </GroundContext.Provider>
    </Box>
  );
};

export { MarkOnGround };
