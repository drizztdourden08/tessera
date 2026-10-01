/* @layer renderer-components @kind component */
import '../../theme/control-size.css';
import './TagPicker.css';
import { useControlSize } from '../field-control/useControlSize';
import { Tag } from '../Tag';
import { Span } from '../text-elements';
import { optionLook } from './behavior/option-look';
import type { TagPickerProps } from './TagPicker.type';

const TagPicker = <T extends string = string>(props: TagPickerProps<T>) => {
  const { value, groups, onChange, label, disabled = false, single = false, size } = props;
  const controlSize = useControlSize(size);

  const toggle = (tag: T) => {
    if (single) {
      onChange(value.includes(tag) ? [] : [tag]);
    } else if (value.includes(tag)) {
      onChange(value.filter(v => v !== tag));
    } else {
      onChange([...value, tag]);
    }
  };

  return (
    <div className={`tag-picker control-size--${controlSize} ${disabled ? 'tag-picker--disabled' : ''}`}>
      {label && <Span className="tag-picker__label">{label}</Span>}
      {groups.map(group => (
        <div key={group.id} className="tag-picker__group">
          {group.label && <Span tone="dim" className="tag-picker__group-label">{group.label}</Span>}
          <div className="tag-picker__tags" role={single ? 'radiogroup' : undefined} aria-label={single ? label : undefined}>
            {group.options.map(opt => (
              <Tag
                key={opt.value}
                {...optionLook(opt)}
                selected={value.includes(opt.value)}
                role={single ? 'radio' : undefined}
                disabled={disabled}
                onSelect={() => toggle(opt.value)}
              >
                {opt.label}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { TagPicker };
