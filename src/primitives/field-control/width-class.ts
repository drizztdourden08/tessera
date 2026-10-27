/* @layer renderer-components @kind util */
import type { FieldWidth } from './field-width.type';

const widthClass = (width: FieldWidth | undefined, className = ''): string =>
  (width === undefined ? className : `${className} control-${width}`.trim());

export { widthClass };
