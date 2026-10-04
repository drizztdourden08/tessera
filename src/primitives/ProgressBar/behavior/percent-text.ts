/* @layer renderer-components @kind logic */
import { share } from './share';

const percentText = (value: number, max: number): string => `${Math.round(share(value, max))}%`;

export { percentText };
