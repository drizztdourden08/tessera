/* @layer renderer-components @kind logic */
import { STAGE } from '../TesseraLogo.constants';

const pctY = (y: number): string => `${(((y - STAGE.y) / STAGE.height) * 100).toFixed(3)}%`;

export { pctY };
