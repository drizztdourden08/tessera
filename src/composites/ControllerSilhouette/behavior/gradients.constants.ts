/* @layer renderer-components @kind constants */
import type { SilhouetteGradient } from '../ControllerSilhouette.type';

const GRADIENTS: readonly SilhouetteGradient[] = [
  { key: 'sheen', stops: [{ offset: 0, tone: 'lift' }, { offset: 0.36, tone: 'clear' }, { offset: 1, tone: 'dusk' }] },
  { key: 'bevel', stops: [{ offset: 0, tone: 'glint' }, { offset: 0.2, tone: 'clear' }, { offset: 0.8, tone: 'clear' }, { offset: 1, tone: 'shade' }] },
  { key: 'well', stops: [{ offset: 0, tone: 'deep' }, { offset: 1, tone: 'recess' }] },
  { key: 'dish', stops: [{ offset: 0, tone: 'shade' }, { offset: 1, tone: 'clear' }] },
  { key: 'rim', stops: [{ offset: 0, tone: 'shade' }, { offset: 1, tone: 'glint' }] },
];

export { GRADIENTS };
