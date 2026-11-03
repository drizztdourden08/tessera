/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Status } from '../../../primitives/Status';
import { Tag } from '../../../primitives/Tag';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResetButton } from '../../ResetButton';
import type { OptionRowTextProps } from '../OptionRow.type';

const OptionRowText = (props: OptionRowTextProps) => {
  const { label, description, tag, note, changed = false, onReset, forced = false } = props;
  const { options } = useTesseraStrings();
  return (
    <Box className="option-row__text">
      <Box className="option-row__title">
        <Text className="option-row__label">{label}</Text>
        {tag !== undefined && <Tag>{tag}</Tag>}
        <ResetButton label={label} changed={changed} onReset={onReset} />
        {changed && <Status tone="warning" dot>{options.changed}</Status>}
      </Box>
      {description !== undefined && <Text variant="caption" tone="dim" className="option-row__description">{description}</Text>}
      {forced && note !== undefined && <Text variant="caption" tone="danger" className="option-row__note">{note}</Text>}
    </Box>
  );
};

export { OptionRowText };
