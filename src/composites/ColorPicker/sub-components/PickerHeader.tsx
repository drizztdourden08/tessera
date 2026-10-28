/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import type { PickerHeaderProps } from './PickerParts.type';

const PickerHeader = ({ title, name }: PickerHeaderProps) => (
  <>
    {title && <Text variant="subtitle" className="color-picker__title">{title}</Text>}
    {name !== undefined && <Box className="color-picker__name">{name}</Box>}
  </>
);

export { PickerHeader };
