/* @layer renderer-components @kind component */
import { Tag } from '../../Tag';
import type { TagInputTagProps } from './TagInputTag.type';

const TagInputTag = (props: TagInputTagProps) => {
  const { tag, advice, disabled, onRemove } = props;
  const title = advice.message ?? undefined;

  return advice.ok
    ? <Tag title={title} disabled={disabled} onRemove={onRemove}>{tag}</Tag>
    : <Tag variant="urgency" color="warning" title={title} disabled={disabled} onRemove={onRemove}>{tag}</Tag>;
};

export { TagInputTag };
