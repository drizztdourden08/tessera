/* @layer renderer-components @kind component */
import { Portal } from '../../Portal';
import type { MouseEvent } from 'react';
import type { TagSuggestionPanelProps } from '../TagInput.type';

const keepFocus = (e: MouseEvent) => e.preventDefault();

const TagSuggestionPanel = (props: TagSuggestionPanelProps) => {
  const { listId, optionId, panelRef, pos, suggestions, highlightIdx, createText, onPick } = props;

  const isEmpty = suggestions.length === 0 && createText === null;

  return (
    <Portal layer="popover">
      <div
        ref={panelRef}
        id={listId}
        role="listbox"
        className="tag-input__panel"
        data-drop-up={pos?.dropUp ? 'true' : undefined}
        style={pos ? { top: pos.top, left: pos.left, width: pos.width } : undefined}
      >
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
            {tag}
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
            <span className="tag-input__create-verb">Create</span>
            <span className="tag-input__create-value">{createText}</span>
          </div>
        )}

        {isEmpty && <div className="tag-input__empty">No matching tags</div>}
      </div>
    </Portal>
  );
};

export { TagSuggestionPanel };
