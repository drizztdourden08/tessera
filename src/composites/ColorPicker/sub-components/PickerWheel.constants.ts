/* @layer renderer-components @kind data */
import type { ColorChangeHandler } from 'react-color';

const RIM = { radius: 'var(--radius-sm)', shadow: 'inset 0 0 0 1px var(--c-border)' };

const IGNORE_CHANGE: ColorChangeHandler = () => undefined;

export { IGNORE_CHANGE, RIM };
