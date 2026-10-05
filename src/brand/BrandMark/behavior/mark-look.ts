/* @layer renderer-components @kind logic */
import type { Ground } from '../../../primitives/ground/ground.type';
import type { BrandMarkData } from '../../brand.type';
import { groundPaths } from '../../ground-paths';
import type { BrandRim } from '../../rim.type';
import type { MarkLook } from './mark-look.type';

const markLook = (mark: BrandMarkData, ground: Ground, rim: BrandRim): MarkLook => {
  const fromGround = rim === 'none' && ground === 'dark' && mark.onDarkRim !== undefined;
  return { paths: groundPaths(mark.paths, ground), rim: fromGround ? (mark.onDarkRim ?? rim) : rim, fine: fromGround };
};

export { markLook };
