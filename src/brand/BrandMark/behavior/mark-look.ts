/* @layer renderer-components @kind logic */
import type { Ground } from '../../../primitives/ground/ground.type';
import type { BrandInks, BrandMarkData } from '../../brand.type';
import { groundLook } from '../../ground-look';
import type { BrandRim } from '../../rim.type';
import type { MarkLook } from './mark-look.type';

const markLook = (mark: BrandMarkData, ground: Ground | undefined, rim: BrandRim, inks?: BrandInks): MarkLook => {
  const { paths, outline } = groundLook(mark, ground, inks);
  const fromGround = rim === 'none' && outline !== undefined;
  return { paths, rim: fromGround ? outline : rim, fine: fromGround };
};

export { markLook };
