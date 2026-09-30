/* @layer renderer-components @kind types */
import type { BrandSceneData } from '../brand.type';

interface BrandSceneProps {
  scene: BrandSceneData;
  scale?: number;
  title?: string;
  className?: string;
}

export type { BrandSceneProps };
