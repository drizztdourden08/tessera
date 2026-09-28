/* @layer renderer-components @kind logic */
import { STAGE } from '../TesseraLogo.constants';

const pctX = (x: number): string => `${(((x - STAGE.x) / STAGE.width) * 100).toFixed(3)}%`;

export { pctX };
