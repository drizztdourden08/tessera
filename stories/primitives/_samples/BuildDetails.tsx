/* @layer stories @kind component */
import { Box, EmojiIcon, Flex, Status, Text } from '../../../src/primitives';
import type { ListboxItemProps, StatusTone } from '../../../src/primitives';
import { STATUS_EMOJI } from './picker-emoji';
import type { Build } from './picker-data';

const STATUS_TONE: Readonly<Record<Build['status'], StatusTone>> = {
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
        <Status tone={STATUS_TONE[item.status]}>{item.status}</Status>
      </Flex>
      <Text as="span" className="build-details__meta">{`${item.branch} - build ${item.id}`}</Text>
      <Text as="span" className="build-details__notes">{item.notes}</Text>
    </Box>
  );
};

export { BuildDetails };
