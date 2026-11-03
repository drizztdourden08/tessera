/* @layer renderer-components @kind util */
import type { PasteShape } from './split-pasted.type';

const trimPasted = (shape: PasteShape, text: string): string => {
  const trail = shape.steps.at(-1)?.sep.trim() ?? '';
  const headless = shape.lead !== '' && text.toLowerCase().startsWith(shape.lead) ? text.slice(shape.lead.length) : text;
  const tailless = trail !== '' && headless.toLowerCase().endsWith(trail) ? headless.slice(0, headless.length - trail.length) : headless;
  return tailless.trim();
};

export { trimPasted };
