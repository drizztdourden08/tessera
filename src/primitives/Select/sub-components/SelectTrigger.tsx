/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import { activeOptionId } from '../../listbox/active-option-id';
import { ListboxValue } from '../../listbox/ListboxValue';
import { Span } from '../../text-elements';
import { triggerClass } from '../behavior/trigger-class';
import { DEFAULT_PLACEHOLDER } from '../Select.constants';
import type { SelectTriggerProps } from './SelectTrigger.type';

const SelectTrigger = <T, V>(props: SelectTriggerProps<T, V>) => {
  const { select, setup, look } = props;
  const { drop, model, control, field } = select;
  const { open } = drop;
  const full = setup.valueDisplay === 'full' || setup.valueComponent !== undefined;

  return (
    <button
      ref={drop.anchorRef}
      type="button"
      role="combobox"
      id={control.id}
      className={triggerClass({ open, disabled: field.disabled, size: field.size, full, className: field.className })}
      disabled={field.disabled}
      aria-label={look['aria-label']}
      aria-labelledby={look['aria-labelledby']}
      aria-describedby={control.describedBy}
      aria-invalid={field.invalid || undefined}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={open ? model.listId : undefined}
      aria-activedescendant={activeOptionId(open && look.searchable !== true, model)}
      data-drop={open ? drop.attach : undefined}
      data-fillet={(open && drop.fillet) || undefined}
      onClick={() => (open ? drop.close() : drop.show())}
      onKeyDown={select.onKeyDown}
    >
      <Span className="select-trigger__value">
        <ListboxValue
          displays={select.displays}
          look={setup}
          placeholder={look.placeholder ?? DEFAULT_PLACEHOLDER}
          tags={setup.max > 1 && look.multiDisplay === 'tags'}
        />
      </Span>
      <Glyph name="chevronDown" className="select-trigger__chevron" />
    </button>
  );
};

export { SelectTrigger };
