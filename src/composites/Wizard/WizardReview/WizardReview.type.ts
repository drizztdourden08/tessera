/* @layer renderer-components @kind types */
import type { FactsPanelFact } from '../../FactsPanel';

interface WizardReviewSection {
  stepId: string;
  title: string;
  rows: readonly FactsPanelFact[];
}

interface WizardReviewProps {
  sections: readonly WizardReviewSection[];
  onEdit?: (stepId: string) => void;
  editLabel?: string;
  disabled?: boolean;
  className?: string;
}

export type { WizardReviewProps, WizardReviewSection };
