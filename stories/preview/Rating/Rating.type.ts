/* @layer stories @kind types */
import type { KeyboardEvent } from 'react';

type RatingSize = 'sm' | 'md' | 'lg';

type RatingStarFill = 'full' | 'half' | 'empty';

interface RatingProps {
  value: number | null;
  count?: number;
  showValue?: boolean;
  max?: number;
  size?: RatingSize;
  onChange?: (value: number) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

interface RatingShowProps {
  value: number | null;
  count?: number;
  showValue: boolean;
  max: number;
  size: RatingSize;
  label?: string;
  className?: string;
}

interface RatingStarProps {
  fill: RatingStarFill;
  size: RatingSize;
}

interface RatingPickerProps {
  value: number | null;
  max: number;
  size: RatingSize;
  label: string;
  disabled: boolean;
  onChange: (value: number) => void;
}

interface RatingPick {
  shown: number;
  tabStop: number;
  hover: (star: number | null) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { RatingPick, RatingPickerProps, RatingProps, RatingShowProps, RatingSize, RatingStarFill, RatingStarProps };
