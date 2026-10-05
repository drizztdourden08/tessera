/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { MouseEvent } from 'react';
import type { TagSuggestionPanelProps } from '../TagInput.type';

const keepFocus = (e: MouseEvent) => e.preventDefault();

const TagSuggestionPanel = (props: TagSuggestionPanelProps) => {
  const { listId, optionId, panelRef, anchorRef, pos, suggestions, highlightIdx, createText, inline, onPick } = props;
  const detached = useRef<HTMLElement>(null);
  const { common, fields } = useTesseraStrings();

  const isEmpty = suggestions.length === 0 && createText === null;

  const rows = (
    <>
      {suggestions.map((tag, idx) => (
        <Box
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
        </Box>
      ))}

      {createText !== null && (
        <Box
          role="option"
          aria-selected={false}
          className="tag-input__option tag-input__option--create"
          onMouseDown={keepFocus}
          onClick={() => onPick(createText)}
        >
          <Span className="tag-input__create-verb">{common.create}</Span>
          <Span className="tag-input__create-value">{createText}</Span>
        </Box>
      )}

      {isEmpty && <Box className="tag-input__empty"><Span>{fields.noMatchingTags}</Span></Box>}
    </>
  );

  if (inline) {
    return <Box ref={panelRef} id={listId} role="listbox" className="tag-input__panel tag-input__panel--inline">{rows}</Box>;
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
