/* @layer stories @kind component */
import { Flex, Icon, IconButton, Text } from '../../../src/primitives';

const CardHeadRow = () => (
  <Flex gap="xs" align="center">
    <Icon name="bug" size={12} hue="rose" label="Bug" />
    <Text variant="caption" leading="16">Crash on save</Text>
    <IconButton label="Close card" size="2xs"><Icon name="x" size={10} /></IconButton>
  </Flex>
);

export { CardHeadRow };
