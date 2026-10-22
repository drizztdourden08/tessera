/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../Icon';
import type { TagCategoryColor } from '../Tag';

type StepperOrientation = 'horizontal' | 'vertical';

type StepperStatus = 'done' | 'current' | 'upcoming' | 'error';

type StepperDirection = 'still' | 'forward' | 'back';

type StepperStepState = Exclude<StepperStatus, 'error'>;

type StepperSelectMode = 'navigate' | 'toggle';

type StepperLabelPlacement = 'above' | 'below' | 'hidden';

type StepperMediaPlacement = 'above' | 'below';

type StepperSize = 'sm' | 'md';

type StepperDotVariant = 'filled' | 'ring';

type StepperStepWidth = 'sm' | 'md' | 'lg';

type StepperMediaSize = 'sm' | 'md' | 'lg';

type StepperTone = 'neutral' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info' | TagCategoryColor;

type StepperDoneIcon = IconName | false;

type StepperReserve = 'summaries' | 'none';

interface StepperSizeLook {
  dot: string;
  digit: string;
  gap: string;
  gapMin: string;
  icon: number;
}

interface StepperSubStep {
  id: string;
  label: string;
  count?: number;
}

interface StepperStep {
  id: string;
  label: string;
  summary?: string;
  subSteps?: readonly StepperSubStep[];
  error?: boolean;
  tone?: StepperTone;
  doneIcon?: StepperDoneIcon;
  state?: StepperStepState;
  media?: ReactNode;
  struck?: boolean;
}

interface StepperProps {
  steps: readonly StepperStep[];
  currentId?: string;
  complete?: boolean;
  orientation?: StepperOrientation;
  compact?: boolean;
  tone?: StepperTone;
  doneIcon?: StepperDoneIcon;
  reserve?: StepperReserve;
  selectMode?: StepperSelectMode;
  labelPlacement?: StepperLabelPlacement;
  labelLines?: 1 | 2 | 3;
  mediaPlacement?: StepperMediaPlacement;
  size?: StepperSize;
  dotVariant?: StepperDotVariant;
  stepWidth?: StepperStepWidth;
  mediaSize?: StepperMediaSize;
  scroll?: boolean;
  canSelect?: (id: string) => boolean;
  onSelect?: (id: string) => void;
  activeSubStepId?: string;
  onSubStepSelect?: (stepId: string, subStepId: string) => void;
  label?: string;
  className?: string;
}

export type {
  StepperDirection, StepperDoneIcon, StepperDotVariant, StepperLabelPlacement, StepperMediaPlacement, StepperMediaSize, StepperOrientation, StepperProps, StepperReserve,
  StepperSelectMode, StepperSize, StepperSizeLook, StepperStatus, StepperStep, StepperStepState, StepperStepWidth, StepperSubStep, StepperTone,
};
