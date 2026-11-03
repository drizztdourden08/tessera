/* @layer renderer-components @kind component */
import { Pressable } from '../../Pressable';
import type { TagButtonProps } from './TagParts.type';

const TagButton = (props: TagButtonProps) => {
  const { cls, paint, disabled, title, onClick, data, body } = props;
  return (
    <Pressable className={cls} style={paint} disabled={disabled} title={title} onClick={onClick} {...data}>
      {body}
    </Pressable>
  );
};

export { TagButton };
