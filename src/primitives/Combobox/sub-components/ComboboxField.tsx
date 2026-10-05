/* @layer renderer-components @kind component */
import { InputAdornmentView } from '../../field-control/InputAdornmentView';
import { ListboxValue } from '../../listbox/ListboxValue';
import { Span } from '../../text-elements';
import { Tag } from '../../Tag';
import { comboboxClass } from '../behavior/combobox-class';
import { fieldPress } from '../behavior/field-press';
import { ComboboxEnd } from './ComboboxEnd';
import { ComboboxInput } from './ComboboxInput';
import type { ComboboxFieldProps } from './ComboboxField.type';

const ComboboxField = <T,>(props: ComboboxFieldProps<T>) => {
  const { box, look } = props;
  const { drop, displays, field } = box;
  const editable = !field.disabled;

  return (
    <div
      ref={drop.anchorRef}
      className={comboboxClass({ open: drop.open, disabled: field.disabled, size: field.size, multi: box.multi, className: field.className })}
      data-drop={drop.open ? drop.attach : undefined}
      data-fillet={(drop.open && drop.fillet) || undefined}
      onMouseDown={(event) => fieldPress(event, box, field.disabled)}
    >
      {look.start !== undefined && <InputAdornmentView className="combobox__start" adornment={look.start} size={field.size} disabled={!editable} />}
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
      <ComboboxEnd box={box} look={look} />
    </div>
  );
};

export { ComboboxField };
