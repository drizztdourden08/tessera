/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import type { PanelSectionProps } from './PanelSection.type';

const PanelSection = (props: PanelSectionProps) => {
  const { title, fill = false, children } = props;

  return (
    <Box className={`dynamic-input__section${fill ? ' dynamic-input__section--fill' : ''}`}>
      <Text variant="subtitle">{title}</Text>
      {children}
    </Box>
  );
};

export { PanelSection };
