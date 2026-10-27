/* @layer renderer-components @kind component */
import { HIT_AREA_CLASS } from '../../dom/hit-area.constants';
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { TagChipProps } from './TagParts.type';

const TagChip = (props: TagChipProps) => {
  const { cls, paint, label, onRemove, disabled, title, data, body } = props;
  const { common } = useTesseraStrings();
  return (
    <span className={cls} style={paint} title={title} {...data}>
      {body}
      {onRemove !== undefined && (
        <IconButton
          className={`tag__remove ${HIT_AREA_CLASS}`}
          variant="ghost"
          size="sm"
          label={common.removeNamed(label)}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={onRemove}
        >
          <Icon name="x" />
        </IconButton>
      )}
    </span>
  );
};

export { TagChip };
