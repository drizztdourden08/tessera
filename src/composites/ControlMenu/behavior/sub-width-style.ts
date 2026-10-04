/* @layer renderer-components @kind util */
import type { SubWidthStyle } from '../ControlMenu.type';

const subWidthStyle = (width: number): SubWidthStyle => ({ '--control-sub-width': `${width}px` });

export { subWidthStyle };
