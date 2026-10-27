/* @layer stories @kind component */
import { ListItemList, ListItemRow } from '../../../src/composites';
import type { ListItemHeader } from '../../../src/composites';
import { Box, Button, Icon, Text } from '../../../src/primitives';
import { NAV_ICONS } from './nav';
import { SESSIONS } from './sessions';

const HEADER: ListItemHeader = {
  main: 'Session',
  columns: [{ label: 'Players', align: 'end' }, { label: 'Server' }, { label: 'Started', align: 'end' }],
  action: 'Join',
};

const ROUNDS = [0, 1, 2];

const ListItemRowHeader = () => (
  <Box className="story-column list-item-row-story">
    <Text className="story-label">The header sits on the tracks of the rows and stays at the top while the list scrolls.</Text>
    <Box className="list-item-row-story__scroll">
      <ListItemList label="Sessions" header={HEADER}>
        {ROUNDS.flatMap((round) => SESSIONS.map((s) => (
          <ListItemRow
            key={`${round}-${s.id}`}
            icon={<Icon name={NAV_ICONS.sessions} />}
            name={s.name}
            columns={[
              { primary: `${s.players} players`, align: 'end' },
              { primary: s.server },
              { primary: s.started, align: 'end' },
            ]}
            action={<Button size="sm" variant="secondary">Join</Button>}
          />
        )))}
      </ListItemList>
    </Box>
  </Box>
);

export { ListItemRowHeader };
