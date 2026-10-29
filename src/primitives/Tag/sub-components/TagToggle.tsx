/* @layer renderer-components @kind component */
import { Pressable } from '../../Pressable';
import type { TagToggleProps } from './TagParts.type';

const TagToggle = (props: TagToggleProps) => {
  const { cls, paint, role, selected, disabled, title, onSelect, data, body } = props;
  const radio = role === 'radio';
  return (
    <Pressable
      className={cls}
      style={paint}
      role={role}
      aria-pressed={radio ? undefined : selected}
      aria-checked={radio ? selected : undefined}
      disabled={disabled}
      title={title}
      onClick={onSelect}
      {...data}
    >
      {body}
    </Pressable>
  );
};

export { TagToggle };
