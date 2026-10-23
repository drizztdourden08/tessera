/* @layer renderer-components @kind logic */
import { DRAWINGS } from './drawings.constants';
import type { ControllerSilhouetteVariant, SilhouetteDrawing } from '../ControllerSilhouette.type';

const silhouetteDrawing = (variant: ControllerSilhouetteVariant): SilhouetteDrawing => DRAWINGS[variant];

export { silhouetteDrawing };
