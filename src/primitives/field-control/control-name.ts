/* @layer renderer-components @kind util */
import type { ControlName } from './control-name.type';

const controlName = (props: ControlName): ControlName => ({ 'aria-label': props['aria-label'], 'aria-labelledby': props['aria-labelledby'] });

export { controlName };
