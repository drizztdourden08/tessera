/* @layer renderer-components @kind types */
import type { RuleCheck } from '../behavior/checks.type';

interface RuleListProps {
  id: string;
  checks: readonly RuleCheck[];
}

export type { RuleListProps };
