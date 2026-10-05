/* @layer stories @kind logic */
import { STAGE } from '../InteractiveTessera.constants';

const pctY = (y: number): string => `${(((y - STAGE.y) / STAGE.height) * 100).toFixed(3)}%`;

export { pctY };
