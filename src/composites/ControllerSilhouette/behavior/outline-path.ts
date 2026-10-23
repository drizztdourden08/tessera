/* @layer renderer-components @kind logic */
import { PLACES } from './path.constants';
import type { Cubic, Outline } from '../ControllerSilhouette.type';

const num = (value: number): string => String(Math.round(value * PLACES) / PLACES);

const curveText = (curve: Cubic): string => `C ${curve.map(num).join(' ')}`;

const outlinePath = (outline: Outline): string =>
  `M ${outline.start.map(num).join(' ')} ${outline.curves.map(curveText).join(' ')} Z`;

export { outlinePath };
