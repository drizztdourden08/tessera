/* @layer stories @kind types */
import type { OptionGroupTone } from '../../../src/composites';

interface SampleOption {
  id: string;
  label: string;
  description?: string;
  tag?: string;
  note?: string;
  locked?: boolean;
  forced?: boolean;
  readOnly?: boolean;
  aside?: string;
  on: boolean;
}

interface SampleGroup {
  title: string;
  tone: OptionGroupTone;
  options: readonly SampleOption[];
}

export type { SampleGroup, SampleOption };
