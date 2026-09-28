/* @layer renderer-components @kind component */
import type { TagEntryProps } from './TagEntry.type';

const TagEntry = (props: TagEntryProps) => {
  const { tags, fieldId, listId, optionId, placeholder, disabled } = props;
  const { popup } = tags;

  return (
    <input
      id={fieldId}
      ref={tags.inputRef}
      type="text"
      role="combobox"
      className="tag-input__entry"
      autoComplete="off"
      aria-invalid={tags.blocked || undefined}
      aria-expanded={popup.open}
      aria-controls={popup.open ? listId : undefined}
      aria-activedescendant={
        popup.open && tags.highlightIdx >= 0 ? optionId(tags.highlightIdx) : undefined
      }
      placeholder={placeholder}
      value={tags.query}
      disabled={disabled}
      onChange={(e) => tags.handleQueryChange(e.target.value)}
      onFocus={popup.handleOpen}
      onKeyDown={tags.handleKeyDown}
    />
  );
};

export { TagEntry };
