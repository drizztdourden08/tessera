/* @layer renderer-components @kind component */
import { useId } from 'react';
import { useTagInput } from './behavior/useTagInput';
import { adviseTag } from './behavior/tag-convention';
import { TagChip } from './sub-components/TagChip';
import { TagEntry } from './sub-components/TagEntry';
import { TagHint } from './sub-components/TagHint';
import { TagSuggestionPanel } from './sub-components/TagSuggestionPanel';
import type { TagInputProps } from './TagInput.type';
import '../../theme/select-popup.css';
import './TagInput.css';

const TagInput = (props: TagInputProps) => {
  const {
    value, onChange, suggestions, validate, enforce, createError,
    placeholder = 'Add a tag...', disabled = false, label, maxSuggestions, className = '', id,
  } = props;

  const generatedId = useId();
  const fieldId = id ?? `tag-input-${generatedId}`;
  const listId = `${fieldId}-list`;
  const optionId = (idx: number) => `${fieldId}-opt-${idx}`;

  const tags = useTagInput({
    value, onChange, suggestions, maxSuggestions, disabled, validate, enforce, createError,
  });
  const { popup } = tags;

  const rootCls = ['tag-input', disabled && 'tag-input--disabled', className].filter(Boolean).join(' ');

  return (
    <div className={rootCls}>
      {label != null && (
        <label className="tag-input__label" htmlFor={fieldId}>
          {label}
        </label>
      )}

      <div ref={popup.anchorRef} className="tag-input__field">
        {value.map((tag, idx) => (
          <TagChip
            key={tag}
            tag={tag}
            advice={adviseTag(tag, validate)}
            disabled={disabled}
            onRemove={() => tags.handleRemove(idx)}
          />
        ))}

        <TagEntry
          tags={tags}
          fieldId={fieldId}
          listId={listId}
          optionId={optionId}
          placeholder={value.length === 0 ? placeholder : ''}
          disabled={disabled}
        />
      </div>

      <TagHint advice={tags.advice} createError={tags.createError} blocked={tags.blocked} />

      {popup.open && !disabled && (
        <TagSuggestionPanel
          listId={listId}
          optionId={optionId}
          panelRef={popup.panelRef}
          pos={popup.pos}
          suggestions={tags.filtered}
          highlightIdx={tags.highlightIdx}
          createText={tags.createText}
          onPick={tags.commit}
        />
      )}
    </div>
  );
};

export { TagInput };
