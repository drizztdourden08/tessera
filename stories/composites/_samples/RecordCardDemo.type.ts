/* @layer stories @kind types */
import type { RecordCardDensity } from '../../../src/composites';

interface RecordCardDemoProps {
  density?: RecordCardDensity;
  open?: boolean;
  defaultOpen?: boolean;
  brand?: boolean;
  controlled?: boolean;
}

export type { RecordCardDemoProps };
