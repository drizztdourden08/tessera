/* @layer renderer-components @kind logic */
import { CHANGES } from './change-rows.constants';

const changeRows = (height: number): number[] => CHANGES.map((share) => Math.round(share * height));

export { changeRows };
