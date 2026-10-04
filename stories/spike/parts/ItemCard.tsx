/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Flex, Icon, Stack, Status, Text } from '../../../src/primitives';
import type { IconName, StatusTone } from '../../../src/primitives';
import { ActionBar } from './ActionBar';
import type { BarAction } from './ActionBar';

type ItemCardProps = {
  title: ReactNode;
  eyebrow?: ReactNode;
  status?: { label: string; tone: StatusTone };
  tags?: ReactNode[];
  details?: ReactNode[];
  media?: IconName;
  mediaTone?: 'violet' | 'teal' | 'amber' | 'rose';
  layout?: 'top' | 'left';
  actions?: readonly BarAction[];
  selected?: boolean;
};

const ItemCard = ({ title, eyebrow, status, tags = [], details = [], media, mediaTone = 'violet', layout = 'top', actions = [], selected }: ItemCardProps) => (
  <Box className="spike-item" data-layout={layout} data-selected={selected ? '' : undefined} tabIndex={0}>
    {media && <Box className="spike-item__media" data-tone={mediaTone}><Icon name={media} size={layout === 'top' ? 40 : 28} /></Box>}
    <Stack gap="xs" className="spike-item__body">
      <Flex justify="between" align="center" gap="sm">
        <Text variant="caption">{eyebrow}</Text>
        {status && <Status tone={status.tone} dot>{status.label}</Status>}
      </Flex>
      <Text variant="body" className="spike-item__title">{title}</Text>
      {tags.length > 0 && <Flex gap="xs" wrap>{tags}</Flex>}
      <Text variant="caption" className="spike-item__details">{details.join(' · ')}</Text>
      {actions.length > 0 && <Box className="spike-item__actions"><ActionBar size="sm" actions={actions} keep={1} /></Box>}
    </Stack>
  </Box>
);

export { ItemCard };
export type { ItemCardProps };
