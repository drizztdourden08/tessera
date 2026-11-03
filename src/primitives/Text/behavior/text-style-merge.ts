/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';

const textStyleMerge = (typeset: CSSProperties | undefined, style: CSSProperties | undefined, clamp: number | undefined): CSSProperties | undefined => {
  const merged = typeset ? { ...typeset, ...style } : style;
  return clamp === undefined ? merged : { ...merged, WebkitLineClamp: clamp };
};

export { textStyleMerge };
