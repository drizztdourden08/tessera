/* @layer renderer-components @kind logic */
import { SVG_DATA_PREFIX } from '../IconPicker.constants';

const svgDataUrl = (svg: string): string => `${SVG_DATA_PREFIX}${encodeURIComponent(svg)}`;

export { svgDataUrl };
