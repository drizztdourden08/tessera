/* @layer renderer-components @kind types */
import type { AnimatedMascotBrand, AnimatedMascotProps } from '../AnimatedMascot.type';

type AnimatedMascotActorProps = Omit<AnimatedMascotProps, 'brand'> & { brand: AnimatedMascotBrand };

export type { AnimatedMascotActorProps };
