/* @layer renderer-components @kind util */
import type { LabelBox } from './value-rule.type';

const clear = (boxes: readonly LabelBox[], left: number, right: number, gap: number): boolean =>
  (boxes[right]?.start ?? 0) >= (boxes[left]?.end ?? 0) + gap;

const strideIndices = (boxes: readonly LabelBox[], stride: number, gap: number): number[] => {
  const last = boxes.length - 1;
  const shown = boxes.map((_, index) => index).filter((index) => index % stride === 0);
  const tail = shown[shown.length - 1] ?? 0;
  if (tail === last) return shown;
  if (shown.length > 1 && !clear(boxes, tail, last, gap)) shown.pop();
  return [...shown, last];
};

const fits = (boxes: readonly LabelBox[], shown: readonly number[], gap: number): boolean =>
  shown.every((index, at) => at === 0 || clear(boxes, shown[at - 1] ?? 0, index, gap));

const thinLabels = (boxes: readonly LabelBox[], gap: number): boolean[] => {
  for (let stride = 1; stride < boxes.length; stride += 1) {
    const shown = strideIndices(boxes, stride, gap);
    if (fits(boxes, shown, gap)) return boxes.map((_, index) => shown.includes(index));
  }
  return boxes.map((_, index) => index === 0);
};

export { thinLabels };
