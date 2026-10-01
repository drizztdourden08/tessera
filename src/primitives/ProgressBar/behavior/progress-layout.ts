/* @layer renderer-components @kind util */
import type { ProgressPart, ProgressSegment } from '../ProgressBar.type';
import { share } from './share';

const progressLayout = (parts: readonly ProgressPart[], max: number): { segments: ProgressSegment[]; total: number } => {
  const segments: ProgressSegment[] = [];
  let start = 0;
  for (const part of parts) {
    const width = Math.min(share(part.value, max), 100 - start);
    if (width > 0) segments.push({ ...part, start, width });
    start += Math.max(0, width);
  }
  const sum = parts.reduce((acc, part) => acc + Math.max(0, part.value), 0);
  return { segments, total: Math.min(sum, Math.max(0, max)) };
};

export { progressLayout };
