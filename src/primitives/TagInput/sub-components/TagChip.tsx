/* @layer renderer-components @kind component */
import { Badge } from '../../Badge';
import { Glyph } from '../../Glyph';
import { IconButton } from '../../IconButton';
import { Span } from '../../text-elements';
import { tagChipClass } from '../behavior/tag-chip-class';
import type { TagChipProps } from '../TagInput.type';

const TagChip = (props: TagChipProps) => {
  const { tag, name = String(tag), advice, tone = 'neutral', disabled = false, onRemove } = props;

  return (
    <Badge variant="neutral" className={tagChipClass(tone, advice)}>
      <Span className="tag-input__chip-text" title={advice?.message ?? undefined}>
        {tag}
      </Span>
      {onRemove && (
        <IconButton
          className="tag-input__chip-remove"
          variant="ghost"
          size="sm"
          type="button"
          label={`Remove ${name}`}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={onRemove}
        >
          <Glyph name="close" />
        </IconButton>
      )}
    </Badge>
  );
};

export { TagChip };
