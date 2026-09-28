/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import type { SelectTriggerProps } from './SelectTrigger.type';

const SelectTrigger = (props: SelectTriggerProps) => {
  const {
    dropdown, className, disabled, selectedLabel, placeholder, id, ariaLabel, ariaLabelledBy, ariaDescribedBy,
  } = props;

  return (
    <button
      ref={dropdown.triggerRef}
      type="button"
      className={className}
      onClick={() => (dropdown.open ? dropdown.handleClose() : dropdown.handleOpen())}
      onKeyDown={dropdown.handleKeyDown}
      disabled={disabled}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-haspopup="listbox"
      aria-expanded={dropdown.open}
    >
      <span className={`select-trigger__text ${selectedLabel === undefined ? 'select-trigger__placeholder' : ''}`}>
        {selectedLabel ?? placeholder}
      </span>
      <span className="select-trigger__chevron"><Glyph name="chevronDown" /></span>
    </button>
  );
};

export { SelectTrigger };
