/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One seat of a lobby: who sits there with a name, a meta line and actions, an open seat, a seat that needs the user, or a dashed card that adds a seat.',
  useWhen: [
    'A screen shows the places of a session as a game lobby, such as the agents of a project, the players of a match or the seats of a table.',
    'Some places are taken, some are open, and the user adds one more from the same grid.',
    'One taken seat needs the user, such as an agent waiting for an answer, and must stand out from the rest.',
  ],
  avoidWhen: [
    { case: 'Items of a catalogue the user browses, with media, tags and details.', use: 'ItemCard' },
    { case: 'Many items read as one line each, in a list.', use: 'ListItemRow' },
    { case: 'A box of content under a header row with its own actions.', use: 'Card' },
  ],
  rules: [
    'Set state to filled, attention, empty or add. Put the cards in a SeatGrid so they share one size and wrap.',
    'A filled seat takes name and, optionally, lead (an avatar, an icon or any node), meta (one short line) and actions.',
    'Pass onSelect to a filled seat when it opens something; the name becomes the one button of the card and a click anywhere on the card goes through it.',
    'Use attention for a filled seat that waits on the user, and give reason a short phrase, such as Waiting for your answer. The colour is never the only signal.',
    'An empty seat takes label, such as Seat 3, and a short hint, such as Invite a player. It is quiet and not clickable.',
    'The add seat is a dashed button. Its label names what it adds, such as Add an agent, and onSelect only asks: the app adds the seat.',
    'Give a filled seat at most one or two actions; more fold under More, danger ones asking first.',
  ],
  a11y: [
    'The name of a filled seat is a heading, level 3 by default, so a screen reader can jump from seat to seat.',
    'With onSelect the name is the one button of the card, and the focus ring circles the card.',
    'The add seat is a real button named by its label, a tab stop with a focus ring.',
    'An attention seat says why in text with the reason, so it is heard and seen.',
  ],
  tree: {
    path: ['data', 'the seats of a lobby, taken, open or to add'],
    rule: 'SeatCard gives every lobby the same four seats, with who sits there, the open seat and the add button in fixed places.',
  },
  example: `import { SeatCard, SeatGrid } from '@drizztdourden08/tessera';

interface LobbyProps {
  addSeat: () => void;
  openAgent: () => void;
}

const Lobby = ({ addSeat, openAgent }: LobbyProps) => (
  <SeatGrid label="Agents of the project">
    <SeatCard state="filled" name="Planner" meta="Opus, 12 min" onSelect={openAgent} />
    <SeatCard state="attention" name="Builder" meta="Sonnet, 3 min" reason="Waiting for your answer" onSelect={openAgent} />
    <SeatCard state="empty" label="Seat 3" hint="Add an agent to fill it" />
    <SeatCard state="add" label="Add a seat" onSelect={addSeat} />
  </SeatGrid>
);
`,
  propsHash: '81a8725fc45213c3',
} satisfies ComponentUsage;

export { usage };
