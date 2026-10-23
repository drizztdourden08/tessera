/* @layer renderer-components @kind logic */
import { OUTLINES } from './outlines.constants';
import type { ControllerSilhouetteVariant } from '../ControllerSilhouette.type';

const silhouetteOutline = (variant: ControllerSilhouetteVariant): string => OUTLINES[variant];

export { silhouetteOutline };
