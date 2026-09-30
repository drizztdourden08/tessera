/* @layer stories @kind component */
import { EmojiIcon, Flex, Text } from '../../../src/primitives';
import type { ListboxItemProps } from '../../../src/primitives';
import { STATUS_EMOJI } from './picker-emoji';
import type { Build } from './picker-data';

const BuildLine = (props: ListboxItemProps<Build>) => {
  const { item } = props;
  return (
    <Flex className="build-line" gap="sm" align="center">
      <EmojiIcon glyph={STATUS_EMOJI[item.status] ?? ''} size="sm" />
      <Text as="span" className="build-line__name">{item.name}</Text>
      <Text as="span" className="build-line__branch">{item.branch}</Text>
    </Flex>
  );
};

export { BuildLine };
