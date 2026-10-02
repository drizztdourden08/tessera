/* @layer renderer-components @kind util */
import { FLOAT_PLACES } from './slot-format.constants';

const roundTo = (value: number, places = FLOAT_PLACES): number => Number(value.toFixed(places));

export { roundTo };
