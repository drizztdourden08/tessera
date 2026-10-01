/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../Anchored';
import { Span } from '../../text-elements';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { MouseEvent } from 'react';
import type { TagSuggestionPanelProps } from '../TagInput.type';

const keepFocus = (e: MouseEvent) => e.preventDefault();

const TagSuggestionPanel = (props: TagSuggestionPanelProps) => {
  const { listId, optionId, panelRef, anchorRef, pos, suggestions, highlightIdx, createText, inline, onPick } = props;
  const detached = useRef<HTMLElement>(null);
  const { fields } = useTesseraStrings();

  const isEmpty = suggestions.length === 0 && createText === null;

  const rows = (
    <>
      {suggestions.map((tag, idx) => (
        <div
          key={tag}
          id={optionId(idx)}
          role="option"
          aria-selected={idx === highlightIdx}
          data-idx={idx}
          className={`tag-input__option${idx === highlightIdx ? ' tag-input__option--highlighted' : ''}`}
          onMouseDown={keepFocus}
          onClick={() => onPick(tag)}
        >
          <Span>{tag}</Span>
        </div>
      ))}

      {createText !== null && (
        <div
          role="option"
          aria-selected={false}
          className="tag-input__option tag-input__option--create"
          onMouseDown={keepFocus}
          onClick={() => onPick(createText)}
        >
          <Span className="tag-input__create-verb">{fields.createTag}</Span>
          <Span className="tag-input__create-value">{createText}</Span>
        </div>
      )}

      {isEmpty && <div className="tag-input__empty"><Span>{fields.noMatchingTags}</Span></div>}
    </>
  );

  if (inline) {
    return <div ref={panelRef} id={listId} role="listbox" className="tag-input__panel tag-input__panel--inline">{rows}</div>;
  }
  return (
    <Anchored
      ref={panelRef}
      anchorRef={anchorRef ?? detached}
      id={listId}
      role="listbox"
      className="tag-input__panel"
      data-drop-up={pos?.dropUp ? 'true' : undefined}
      fallback={pos && { top: pos.top, left: pos.left, width: pos.width }}
    >
      {rows}
    </Anchored>
  );
};

export { TagSuggestionPanel };
