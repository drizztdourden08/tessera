/* @layer stories @kind component */
import { CopyValue, ListItemList, ListItemRow } from '../../../src/composites';
import { Box, Button, ButtonRow, Icon, SectionHeader, StatRow, Status, Text } from '../../../src/primitives';
import { PLAYERS, STATUS_LABEL } from './sessions';
import type { SampleSession } from './sessions';
import './SessionDetail.css';

const TONE = { running: 'success', waiting: 'warning', finished: 'neutral' } as const;

const SessionDetail = ({ session }: { session: SampleSession }) => (
  <Box className="session-detail">
    <Box className="session-detail__head">
      <Box className="session-detail__title">
        <Text variant="title">{session.name}</Text>
        <Status tone={TONE[session.status]}>{STATUS_LABEL[session.status]}</Status>
      </Box>
      <Text variant="caption">{`Hosted by ${session.host} on ${session.server} · started ${session.started.toLowerCase()}`}</Text>
    </Box>
    <ButtonRow align="start">
      <Button variant="primary" icon={<Icon name="log-in" />} disabled={session.status === 'finished'}>Join</Button>
      <Button variant="secondary" icon={<Icon name="eye" />}>Watch</Button>
    </ButtonRow>
    <SectionHeader title="Session" level={3} />
    <Box className="session-detail__facts">
      <StatRow label="Session id" value={<CopyValue value={session.id} mono label="session id" />} />
      <StatRow label="Server" value={session.server} mono />
      <StatRow label="Preset" value={session.preset} />
      <StatRow label="Players" value={session.players} />
    </Box>
    <SectionHeader title="Players" count={Math.min(session.players, PLAYERS.length)} level={3} />
    <ListItemList label="Players">
      {PLAYERS.slice(0, session.players).map((player) => (
        <ListItemRow key={player.slot} icon={<Icon name="user" />} name={player.name} meta={player.game} columns={[{ primary: player.checks, align: 'end' }]} />
      ))}
    </ListItemList>
  </Box>
);

export { SessionDetail };
