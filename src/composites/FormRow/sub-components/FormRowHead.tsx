/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { HelpTip } from '../../../primitives/field-control/HelpTip';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { FoldText } from '../../../primitives/FoldText';
import { Status } from '../../../primitives/Status';
import { Tag } from '../../../primitives/Tag';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { FormRowHeadProps } from '../FormRow.type';

const FormRowHead = (props: FormRowHeadProps) => {
  const { label, labelId, controlId, onNameClick, help, description, descriptionLines, descriptionOverflow, descriptionId, changed, advanced, onReset } = props;
  const { common, options } = useTesseraStrings();
  return (
    <Box className="form-row__head">
      <Box className="form-row__title">
        <Text as="label" id={labelId} variant="body" className="form-row__label" onClick={onNameClick} {...{ htmlFor: controlId }}>{label}</Text>
        <HelpTip help={help} />
        {changed && onReset && (
          <IconButton size="xs" variant="ghost" label={common.resetNamed(label)} title={common.resetNamed(label)} onClick={onReset}>
            <Icon name="rotate-ccw" />
          </IconButton>
        )}
        {advanced && <Tag>{options.advanced}</Tag>}
        {changed && <Status tone="warning" dot>{options.changed}</Status>}
      </Box>
      {description && (
        <FoldText lines={descriptionLines} overflow={descriptionOverflow} hint={description}>
          <Text id={descriptionId} variant="caption" tone="dim" className="form-row__description">{description}</Text>
        </FoldText>
      )}
    </Box>
  );
};

export { FormRowHead };
