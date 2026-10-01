/* @layer renderer-components @kind types */
import type { TermListItem } from '../../../primitives/TermList';

interface WizardReviewSection {
  stepId: string;
  title: string;
  rows: readonly TermListItem[];
}

interface WizardReviewProps {
  sections: readonly WizardReviewSection[];
  onEdit?: (stepId: string) => void;
  editLabel?: string;
  disabled?: boolean;
  className?: string;
}

export type { WizardReviewProps, WizardReviewSection };
