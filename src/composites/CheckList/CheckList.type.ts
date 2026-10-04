/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StatusDef } from '../../primitives/Status';

type CheckState = 'pass' | 'warn' | 'fail' | 'pending' | 'skip';

interface Check {
  id: string;
  label: string;
  state: CheckState;
  detail?: ReactNode;
  action?: ReactNode;
}

interface CheckListProps {
  checks: readonly Check[];
  summary?: ReactNode;
  compact?: boolean;
  label?: string;
  className?: string;
}

type CheckStatuses = Readonly<Record<CheckState, StatusDef>>;

interface CheckRowProps {
  check: Check;
  statuses: CheckStatuses;
}

interface CheckCountsProps {
  checks: readonly Check[];
  statuses: CheckStatuses;
}

export type { Check, CheckCountsProps, CheckListProps, CheckRowProps, CheckState };
