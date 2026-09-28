/* @layer renderer-components @kind types */
import type { ReferencedByHit } from '../RecordEditor.type';

interface ReferencedByProps {
  hits: readonly ReferencedByHit[];
}

interface KindGroup {
  kind: string;
  hits: readonly ReferencedByHit[];
}

export type { KindGroup, ReferencedByProps };
