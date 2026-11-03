/* @layer renderer-components @kind util */
import type { PasteShape } from './split-pasted.type';

const hasSeparator = (shape: PasteShape, text: string): boolean => {
  const lower = text.toLowerCase();
  return shape.steps.some((step) => step.sep.trim() !== '' && lower.includes(step.sep.trim()));
};

export { hasSeparator };
