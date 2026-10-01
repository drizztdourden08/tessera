/* @layer renderer-components @kind util */
import type { ProgressPart } from '../ProgressBar.type';

const progressValueText = (parts: readonly ProgressPart[], total: number, max: number): string =>
  `${total} of ${max}: ${parts.map((part) => `${part.label} ${part.value}`).join(', ')}`;

export { progressValueText };
