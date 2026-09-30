/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

type TagValidationResult = boolean | string;

type TagValidator = (raw: string) => TagValidationResult;

interface TagAdvice {
  ok: boolean;
  message: string | null;
}

interface PopupPosition {
  top: number;
  left: number;
  width: number;
  dropUp: boolean;
}

interface TagInputProps {
  value: readonly string[];
  onChange: (next: readonly string[]) => void;
  suggestions?: readonly string[];
  validate?: TagValidator;
  enforce?: boolean;
  createError?: string | null;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  maxSuggestions?: number;
  defaultOpen?: boolean;
  inline?: boolean;
  className?: string;
  id?: string;
}

interface TagSuggestionPanelProps {
  listId: string;
  optionId: (idx: number) => string;
  panelRef: RefObject<HTMLDivElement | null>;
  anchorRef?: RefObject<HTMLElement | null>;
  pos: PopupPosition | null;
  suggestions: readonly string[];
  highlightIdx: number;
  createText: string | null;
  inline: boolean;
  onPick: (tag: string) => void;
}

export type {
  TagAdvice,
  TagInputProps,
  TagSuggestionPanelProps,
  TagValidationResult,
  TagValidator,
};
