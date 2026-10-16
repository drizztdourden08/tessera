/* @layer renderer-components @kind types */
import type { FloatingSwitchItem } from '../FloatingSwitch.type';

interface FloatingSwitchOptionProps {
  item: FloatingSwitchItem;
  active: boolean;
  onSelect: (id: string) => void;
}

export type { FloatingSwitchOptionProps };
