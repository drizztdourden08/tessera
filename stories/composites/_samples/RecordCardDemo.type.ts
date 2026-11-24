/* @layer stories @kind types */
import type { TagCategoryColor } from '../../../src/primitives';
import type { RecordCardDensity } from '../../../src/composites';

interface RecordCardDemoProps {
  density?: RecordCardDensity;
  open?: boolean;
  defaultOpen?: boolean;
  brand?: boolean;
  chevronOnIcon?: boolean;
  controlled?: boolean;
  menuOnHover?: boolean;
  tint?: TagCategoryColor;
}

export type { RecordCardDemoProps };
