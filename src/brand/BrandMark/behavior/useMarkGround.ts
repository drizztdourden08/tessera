/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { GroundContext } from '../../../primitives/ground/ground-context';
import type { Ground } from '../../../primitives/ground/ground.type';

const useMarkGround = (ground: Ground | undefined, tile: boolean): Ground => {
  const around = useContext(GroundContext);
  return tile ? 'light' : (ground ?? around);
};

export { useMarkGround };
