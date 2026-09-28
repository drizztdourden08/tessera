/* @layer renderer-components @kind component */
import { Badge } from '../../Badge';
import { Glyph } from '../../Icon';
import { IconButton } from '../../IconButton';
import type { TagChipProps } from '../TagInput.type';

const TagChip = (props: TagChipProps) => {
  const { tag, advice, disabled, onRemove } = props;

  const cls = `tag-input__chip${advice.ok ? '' : ' tag-input__chip--off-convention'}`;

  return (
    <Badge variant="neutral" className={cls}>
      <span className="tag-input__chip-text" title={advice.message ?? undefined}>
        {tag}
      </span>
      <IconButton
        className="tag-input__chip-remove"
        variant="ghost"
        size="sm"
        type="button"
        label={`Remove ${tag}`}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={onRemove}
      >
        <Glyph name="close" />
      </IconButton>
    </Badge>
  );
};

export { TagChip };
