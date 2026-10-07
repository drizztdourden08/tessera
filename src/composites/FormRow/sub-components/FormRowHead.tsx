/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { FoldText } from '../../../primitives/fold-text/FoldText';
import { Status } from '../../../primitives/Status';
import { Tag } from '../../../primitives/Tag';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { FormRowHeadProps } from '../FormRow.type';

const FormRowHead = (props: FormRowHeadProps) => {
  const { label, labelId, controlId, onNameClick, description, descriptionLines, descriptionId, changed, advanced } = props;
  const { options } = useTesseraStrings();
  return (
    <Box className="form-row__head">
      <Box className="form-row__title">
        <Text as="label" id={labelId} variant="body" className="form-row__label" onClick={onNameClick} {...{ htmlFor: controlId }}>{label}</Text>
        {advanced && <Tag>{options.advanced}</Tag>}
        {changed && <Status tone="warning" dot>{options.changed}</Status>}
      </Box>
      {description && (
        <FoldText lines={descriptionLines}>
          <Text id={descriptionId} variant="caption" tone="dim" className="form-row__description">{description}</Text>
        </FoldText>
      )}
    </Box>
  );
};

export { FormRowHead };
