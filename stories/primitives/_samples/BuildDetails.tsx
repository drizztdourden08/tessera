/* @layer stories @kind component */
import { Badge, Box, EmojiIcon, Flex, Text } from '../../../src/primitives';
import type { BadgeVariant, ListboxItemProps } from '../../../src/primitives';
import { STATUS_EMOJI } from './picker-emoji';
import type { Build } from './picker-data';

const STATUS_BADGE: Readonly<Record<Build['status'], BadgeVariant>> = {
  done: 'success',
  running: 'warning',
  failed: 'danger',
  queued: 'neutral',
};

const BuildDetails = (props: ListboxItemProps<Build>) => {
  const { item, place } = props;
  return (
    <Box className="build-details" data-place={place}>
      <Flex className="build-details__head" gap="sm" align="center">
        <EmojiIcon glyph={STATUS_EMOJI[item.status] ?? ''} size="sm" />
        <Text as="span" className="build-details__name">{item.name}</Text>
        <Badge variant={STATUS_BADGE[item.status]}>{item.status}</Badge>
      </Flex>
      <Text as="span" className="build-details__meta">{`${item.branch} - build ${item.id}`}</Text>
      <Text as="span" className="build-details__notes">{item.notes}</Text>
    </Box>
  );
};

export { BuildDetails };
