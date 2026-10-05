/* @layer renderer-components @kind logic */
import type { Ground } from '../primitives/ground/ground.type';
import type { BrandInks, BrandMarkData } from './brand.type';
import type { GroundLook } from './ground-look.type';

const groundLook = (mark: BrandMarkData, ground?: Ground, inks?: BrandInks): GroundLook => {
  const look = ground === undefined ? {} : (mark.grounds?.[ground] ?? {});
  const onDark = (inks ?? look.inks) === 'onDark';
  const paths = onDark ? mark.paths.map((p) => (p.onDark ? { ...p, ink: p.onDark } : p)) : mark.paths;
  return look.outline === undefined ? { paths } : { paths, outline: look.outline };
};

export { groundLook };
