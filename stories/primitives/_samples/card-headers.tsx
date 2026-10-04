/* @layer stories @kind story */
import type { ReactNode } from 'react';
import { ContentHeader } from '../../../src/composites';
import { Box, Button, Card, IconButton, Icon, SectionHeader, Stack, StatRow, Status, Text } from '../../../src/primitives';
import type { CardTone } from '../../../src/primitives';

const TONES: readonly CardTone[] = ['neutral', 'primary', 'info', 'success', 'warning', 'danger'];

const TONE_SAMPLES: Readonly<Record<CardTone, { title: string; body: string }>> = {
  neutral: { title: 'Templates', body: 'Three templates in this profile.' },
  primary: { title: 'Featured seed', body: 'Picked for this week.' },
  info: { title: 'Release notes', body: 'Version 0.16 is out.' },
  success: { title: 'Server tested', body: 'The host answered in 42 ms.' },
  warning: { title: 'Disk almost full', body: 'Two save states could not be written.' },
  danger: { title: 'Problems', body: 'The world file failed to load.' },
};

const toneCard = (tone: CardTone): ReactNode => (
  <Card title={TONE_SAMPLES[tone].title} tone={tone}>
    <Text variant="caption">{TONE_SAMPLES[tone].body}</Text>
  </Card>
);

const PlayersCard = () => (
  <Card
    title="Players"
    subtitle="In the current session"
    count={4}
    actions={<Button size="sm" variant="secondary">Invite</Button>}
  >
    <Stack gap="xs">
      <StatRow label="mira" value={<Status tone="success">Online</Status>} />
      <StatRow label="oskar" value={<Status tone="success">Online</Status>} />
      <StatRow label="ines" value={<Status tone="neutral">Away</Status>} />
      <StatRow label="tamsin" value={<Status tone="success">Online</Status>} />
    </Stack>
  </Card>
);

const HistoryCard = () => (
  <Card title="History" count={12} actions={<IconButton size="sm" label="Clear the history"><Icon name="trash-2" /></IconButton>}>
    <Text variant="caption">The last game ended 2 hours ago.</Text>
  </Card>
);

const PageWithCards = () => (
  <Box className="story-column">
    <ContentHeader title="Session" compact level={2} actions={<Button size="sm" variant="primary">Start</Button>} />
    <SectionHeader title="People" subtitle="Who plays, and who watches" level={3} />
    <PlayersCard />
    <HistoryCard />
  </Box>
);

export { PageWithCards, toneCard, TONES };
