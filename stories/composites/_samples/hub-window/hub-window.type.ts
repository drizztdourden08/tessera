/* @layer stories @kind types */
import type { IconName } from '../../../../src/primitives';
import type { Rect } from '../../../../src/composites';

interface HubWindowProps {
  defaultLocked?: boolean;
  defaultRect?: Rect;
}

interface DataPage {
  id: string;
  label: string;
  icon: IconName;
  group?: string;
}

export type { DataPage, HubWindowProps };
