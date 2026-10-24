/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { GroundContext } from '../../../primitives/ground/ground-context';
import type { Ground } from '../../../primitives/ground/ground.type';

const useMarkGround = (tile: boolean): Ground | undefined => {
  const around = useContext(GroundContext);
  return tile ? undefined : around;
};

export { useMarkGround };
