/* @layer renderer-components @kind data */
import type { ControlSize, Density } from './field-control.type';

const DENSITY_SIZE: Readonly<Record<Density, ControlSize>> = { comfortable: 'md', compact: 'sm' };

export { DENSITY_SIZE };
