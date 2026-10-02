/* @layer renderer-components @kind types */
import type { ChangeEvent, KeyboardEvent, MouseEvent, RefCallback, RefObject } from 'react';
import type { PatternSlotSpec } from './parse-pattern.type';
import type { CaretPlace, PatternField } from './pattern-field.type';
import type { SlotKind } from './slot-kind.type';

interface SegmentParams {
  field: PatternField;
  slot: PatternSlotSpec;
  index: number;
}

interface TypedParams extends SegmentParams {
  kind: SlotKind;
}

interface TypedDraft {
  draft: string | null;
  draftRef: RefObject<string | null>;
  typedRef: RefObject<boolean>;
  writeDraft: (text: string | null, caret?: CaretPlace | null) => void;
  attach: RefCallback<HTMLInputElement>;
  handleFocus: () => void;
  handleBlur: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface TypedKeyContext extends TypedParams {
  draftRef: RefObject<string | null>;
  typedRef: RefObject<boolean>;
  writeDraft: (text: string | null, caret?: CaretPlace | null) => void;
}

interface FreshClick<E extends HTMLElement> {
  handleMouseDown: (event: MouseEvent<E>) => void;
  takeFresh: () => boolean;
}

interface TypedSegmentState extends TypedDraft {
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  handleMouseDown: (event: MouseEvent<HTMLInputElement>) => void;
  handleMouseUp: (event: MouseEvent<HTMLInputElement>) => void;
}

export type { FreshClick, SegmentParams, TypedDraft, TypedKeyContext, TypedParams, TypedSegmentState };
