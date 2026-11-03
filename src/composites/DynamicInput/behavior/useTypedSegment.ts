/* @layer renderer-components @kind hook */
import { handleTypedKey } from './handle-typed-key';
import { pasteHandler } from './paste-handler';
import { useFreshClick } from './useFreshClick';
import { useTypedDraft } from './useTypedDraft';
import type { KeyboardEvent, MouseEvent } from 'react';
import type { TypedParams, TypedSegmentState } from './typed-segment.type';

const useTypedSegment = (params: TypedParams): TypedSegmentState => {
  const { field, slot, index } = params;
  const draft = useTypedDraft(params);
  const fresh = useFreshClick<HTMLInputElement>();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) =>
    handleTypedKey({ ...params, draftRef: draft.draftRef, typedRef: draft.typedRef, writeDraft: draft.writeDraft }, event);

  const handleMouseUp = (event: MouseEvent<HTMLInputElement>) => {
    if (fresh.takeFresh() && slot.type !== 'text') event.preventDefault();
    field.setOpen(true);
  };

  const handlePaste = pasteHandler<HTMLInputElement>(field, { index, release: () => draft.writeDraft(null) });

  return { ...draft, handleKeyDown, handlePaste, handleMouseDown: fresh.handleMouseDown, handleMouseUp };
};

export { useTypedSegment };
