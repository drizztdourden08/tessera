/* @layer renderer-components @kind logic */
import { colorAlpha } from './color-alpha';
import { OPAQUE } from './color-alpha.constants';

const isTranslucent = (color: string, transparent: boolean): boolean => !transparent && colorAlpha(color) < OPAQUE;

export { isTranslucent };
