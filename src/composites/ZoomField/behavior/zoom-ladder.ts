/* @layer renderer-components @kind logic */
import { ZOOM_FACTOR } from '../ZoomField.constants';

const doublingStops = (min: number, max: number): number[] => {
  const stops: number[] = [];
  for (let stop = min; min > 0 && stop < max; stop *= ZOOM_FACTOR) stops.push(stop);
  return stops;
};

const zoomLadder = (presets: readonly number[] | undefined, min: number, max: number): number[] => {
  const inner = presets !== undefined && presets.length > 0 ? presets : doublingStops(min, max);
  return [...new Set([min, ...inner, max])].filter((stop) => stop >= min && stop <= max).sort((left, right) => left - right);
};

export { zoomLadder };
