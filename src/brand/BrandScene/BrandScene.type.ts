/* @layer renderer-components @kind types */
import type { Ref } from 'react';
import type { BrandSceneData } from '../brand.type';

interface BrandSceneProps {
  scene: BrandSceneData;
  scale?: number;
  title?: string;
  className?: string;
  ref?: Ref<SVGSVGElement>;
}

export type { BrandSceneProps };
