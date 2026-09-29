/* @layer renderer-components @kind util */
import type { SettledImage } from '../Image.type';

const settledImageOf = (source: string, img: HTMLImageElement, loaded: boolean): SettledImage => {
  const { naturalHeight, naturalWidth } = img;
  const hasSize = naturalWidth > 0 && naturalHeight > 0;
  return {
    source,
    status: loaded ? 'loaded' : 'broken',
    ratio: loaded && hasSize ? `${naturalWidth} / ${naturalHeight}` : undefined,
  };
};

export { settledImageOf };
