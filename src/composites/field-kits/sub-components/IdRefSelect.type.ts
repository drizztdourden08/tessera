/* @layer renderer-components @kind types */
import type { IdRefOption } from '../registry.type';

interface IdRefSelectProps {
  options: readonly IdRefOption[];
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export type { IdRefSelectProps };
