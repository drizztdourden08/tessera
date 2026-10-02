/* @layer renderer-components @kind hook */
import { handleTypedKey } from './handle-typed-key';
import { useFreshClick } from './useFreshClick';
import { useTypedDraft } from './useTypedDraft';
import type { KeyboardEvent, MouseEvent } from 'react';
import type { TypedParams, TypedSegmentState } from './typed-segment.type';

const useTypedSegment = (params: TypedParams): TypedSegmentState => {
  const { field, slot } = params;
  const draft = useTypedDraft(params);
  const fresh = useFreshClick<HTMLInputElement>();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) =>
    handleTypedKey({ ...params, draftRef: draft.draftRef, typedRef: draft.typedRef, writeDraft: draft.writeDraft }, event);

  const handleMouseUp = (event: MouseEvent<HTMLInputElement>) => {
    if (fresh.takeFresh() && slot.type !== 'text') event.preventDefault();
    field.setOpen(true);
  };

  return { ...draft, handleKeyDown, handleMouseDown: fresh.handleMouseDown, handleMouseUp };
};

export { useTypedSegment };
