/* @layer renderer-components @kind data */
import type { ScreenStatus } from './StatusBadge.type';

const STATUS_CLASS: Record<string, string> = {
  unsaved: 'status-badge--unsaved',
  draft: 'status-badge--draft',
  mapped: 'status-badge--mapped',
  verified: 'status-badge--verified',
};

const DEFAULT_LABELS: Record<string, string> = {
  unsaved: 'Unsaved',
  draft: 'Draft',
  mapped: 'Mapped',
  verified: 'Verified',
};

const STATUS_CYCLE: ScreenStatus[] = [undefined, 'draft', 'mapped', 'verified'];

export { STATUS_CLASS, DEFAULT_LABELS, STATUS_CYCLE };
