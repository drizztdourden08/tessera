/* @layer stories @kind component */
import { ListItemList, ListItemRow } from '../../../src/composites';
import { Box, Button } from '../../../src/primitives';
import { SESSIONS } from './sessions';

const ListItemRowFlat = () => (
  <Box className="story-column list-item-row-story">
    <ListItemList label="Sessions" header={{ icon: 'Id', main: 'Name' }}>
      {SESSIONS.map((session, index) => (
        <ListItemRow
          key={session.id}
          flat
          lead={`#${index + 1}`}
          name={session.name}
          selected={index === 0}
          onClick={() => undefined}
          action={<Button size="sm" variant="ghost">Join</Button>}
        />
      ))}
    </ListItemList>
  </Box>
);

export { ListItemRowFlat };
