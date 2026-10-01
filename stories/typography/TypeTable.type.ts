/* @layer stories @kind types */
import type { TypeEntry } from './type-lists';

type TypeProperty = 'fontFamily' | 'fontWeight' | 'fontSize' | 'lineHeight' | 'letterSpacing';

interface TypeTableProps {
  entries: readonly TypeEntry[];
  property: TypeProperty;
  specimen: string;
  showValue?: boolean;
}

export type { TypeTableProps };
