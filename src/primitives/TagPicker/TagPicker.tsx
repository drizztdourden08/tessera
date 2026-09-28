/* @layer renderer-components @kind component */
import './TagPicker.css';
import type { TagPickerProps } from './TagPicker.type';

const TagPicker = <T extends string = string>(props: TagPickerProps<T>) => {
  const { value, groups, onChange, label, disabled = false, single = false } = props;

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
    <div className={`tag-picker ${disabled ? 'tag-picker--disabled' : ''}`}>
      {label && <span className="tag-picker__label">{label}</span>}
      {groups.map(group => (
        <div key={group.id} className="tag-picker__group">
          {group.label && <span className="tag-picker__group-label">{group.label}</span>}
          <div className="tag-picker__tags" role={single ? 'radiogroup' : undefined} aria-label={single ? label : undefined}>
            {group.options.map(opt => (
              <button
                key={opt.value}
                type="button"
                role={single ? 'radio' : undefined}
                aria-checked={single ? value.includes(opt.value) : undefined}
                aria-pressed={single ? undefined : value.includes(opt.value)}
                className={`tag-picker__tag ${value.includes(opt.value) ? 'tag-picker__tag--active' : ''}`}
                onClick={() => toggle(opt.value)}
                disabled={disabled}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { TagPicker };
