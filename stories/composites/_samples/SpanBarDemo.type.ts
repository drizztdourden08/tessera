/* @layer stories @kind types */
import type { SpanSnap } from '../../../src/composites';
import type { TagCategoryColor } from '../../../src/primitives/Tag';

interface SpanBarDemoProps {
  time?: boolean;
  lane?: boolean;
  selected?: boolean;
  readOnly?: boolean;
  colour?: TagCategoryColor;
  snap?: SpanSnap;
  label?: string;
}

export type { SpanBarDemoProps };
