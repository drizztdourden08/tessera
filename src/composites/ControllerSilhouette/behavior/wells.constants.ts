/* @layer renderer-components @kind constants */
import { wellsOf } from './wells-of';
import type { ControllerSilhouetteVariant, SilhouetteWell } from '../ControllerSilhouette.type';

const WELLS: Readonly<Record<ControllerSilhouetteVariant, readonly SilhouetteWell[]>> = {
  offset: wellsOf('offset'),
  symmetric: wellsOf('symmetric'),
  nintendo: wellsOf('nintendo'),
  pad: wellsOf('pad'),
};

export { WELLS };
