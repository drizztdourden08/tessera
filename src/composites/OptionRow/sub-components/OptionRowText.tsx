/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Status } from '../../../primitives/Status';
import { Tag } from '../../../primitives/Tag';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { OptionRowTextProps } from '../OptionRow.type';

const OptionRowText = (props: OptionRowTextProps) => {
  const { label, description, tag, note, changed = false, onReset, forced = false } = props;
  const { common, options } = useTesseraStrings();
  return (
    <Box className="option-row__text">
      <Box className="option-row__title">
        <Text className="option-row__label">{label}</Text>
        {tag !== undefined && <Tag>{tag}</Tag>}
        {changed && onReset && (
          <IconButton size="xs" variant="ghost" label={common.resetNamed(label)} title={common.resetNamed(label)} onClick={onReset}>
            <Icon name="rotate-ccw" />
          </IconButton>
        )}
        {changed && <Status tone="warning" dot>{options.changed}</Status>}
      </Box>
      {description !== undefined && <Text variant="caption" tone="dim" className="option-row__description">{description}</Text>}
      {forced && note !== undefined && <Text variant="caption" tone="danger" className="option-row__note">{note}</Text>}
    </Box>
  );
};

export { OptionRowText };
