/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import { IconButton } from '../../IconButton';
import { ListboxValue } from '../../listbox/ListboxValue';
import { Spinner } from '../../Spinner';
import { Span } from '../../text-elements';
import { Tag } from '../../Tag';
import { comboboxClass } from '../behavior/combobox-class';
import { fieldPress } from '../behavior/field-press';
import { ComboboxInput } from './ComboboxInput';
import type { ComboboxFieldProps } from './ComboboxField.type';

const ComboboxField = <T,>(props: ComboboxFieldProps<T>) => {
  const { box, look } = props;
  const { drop, displays, field } = box;
  const editable = !field.disabled;
  const clearable = editable && box.min === 0 && displays.length > 0;

  return (
    <div
      ref={drop.anchorRef}
      className={comboboxClass({ open: drop.open, disabled: field.disabled, size: field.size, multi: box.multi, className: field.className })}
      data-drop={drop.open ? drop.attach : undefined}
      data-fillet={(drop.open && drop.fillet) || undefined}
      onMouseDown={(event) => fieldPress(event, box, field.disabled)}
    >
      {box.multi && displays.map((display, index) => (
        <Tag
          key={display.key}
          color="primary"
          name={display.label}
          disabled={!editable || displays.length <= box.min}
          onRemove={() => box.removeAt(index)}
        >
          {display.tag}
        </Tag>
      ))}
      {box.showValue && (
        <Span className="combobox__value" aria-hidden>
          <ListboxValue displays={displays} look={box.valueLook} placeholder="" />
        </Span>
      )}
      <ComboboxInput box={box} look={look} />
      {look.loading === true && <Spinner size="sm" className="combobox__spinner" />}
      {clearable && (
        <IconButton className="combobox__clear" variant="ghost" size="sm" type="button" label="Clear" tabIndex={-1} onClick={box.clear}>
          <Glyph name="close" />
        </IconButton>
      )}
      <Glyph name="chevronDown" className="combobox__chevron" />
    </div>
  );
};

export { ComboboxField };
