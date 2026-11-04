/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { FoldText } from '../../../primitives/FoldText';
import { Status } from '../../../primitives/Status';
import { Tag } from '../../../primitives/Tag';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { OptionRowTextProps } from '../OptionRow.type';

const OptionRowText = (props: OptionRowTextProps) => {
  const { label, description, descriptionLines = 2, descriptionOverflow = 'hint', tag, note, changed = false, forced = false } = props;
  const { options } = useTesseraStrings();
  return (
    <Box className="option-row__text">
      <Box className="option-row__title">
        <Text className="option-row__label">{label}</Text>
        {tag !== undefined && <Tag>{tag}</Tag>}
        {changed && <Status tone="warning" dot>{options.changed}</Status>}
      </Box>
      {description !== undefined && (
        <FoldText lines={descriptionLines} overflow={descriptionOverflow} hint={description}>
          <Text variant="caption" tone="dim" className="option-row__description">{description}</Text>
        </FoldText>
      )}
      {forced && note !== undefined && <Text variant="caption" tone="danger" className="option-row__note">{note}</Text>}
    </Box>
  );
};

export { OptionRowText };
