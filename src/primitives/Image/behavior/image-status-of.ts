/* @layer renderer-components @kind util */
import type { ImageStatus, SettledImage } from '../Image.type';

const imageStatusOf = (source: string, pending: boolean, settled: SettledImage | null): ImageStatus => {
  if (!source) return pending ? 'loading' : 'empty';
  return settled?.status ?? 'loading';
};

export { imageStatusOf };
