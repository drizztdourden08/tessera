/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A tile with one headline value that also does one thing: runs an action, copies a text, or leads to the full view.',
  useWhen: [
    'A dashboard row sums up a session or a store, and each tile has one obvious next step, such as Stop, Copy address or Clean old runs.',
    'A tile stands for a larger view, such as a widget or a page, and the user should reach it from the tile.',
    'A data domain has its own folder, and the tile should open it beside its main action.',
  ],
  avoidWhen: [
    { case: 'The tile only reads a value, with its trend, its change or a small chart.', use: 'StatTile' },
    { case: 'A label and its value sit on one row in a list of readings.', use: 'StatRow' },
    { case: 'The item has several actions of equal weight, such as Edit, Duplicate and Delete.', use: 'ActionBar' },
  ],
  rules: [
    'Give each tile one action at most; put small extras, such as open the folder or copy the path, in tools.',
    'Name the action after what it does to the value, such as Clean old runs or Copy address, not OK or Go.',
    'Use the danger variant for an action that stops or deletes, and primary for the one action the row is about.',
    'Pass onOpen when the tile sums up a view, with openLabel naming that view, such as Show the Players widget.',
    'Write the label in sentence case; it shows as written, at 12 px.',
  ],
  a11y: [
    'The tile is a group named by its label, so its buttons are heard with the name of the tile.',
    'Tools and the open chevron are icon buttons named by their label, with the same name as a tooltip.',
    'A copy action or tool confirms with Copied in a polite status region.',
  ],
  tree: {
    path: ['data', 'a headline number that does one thing'],
    rule: 'ActionTile reads like a StatTile and adds one action, tools and a way to the full view, laid out the same in every app.',
  },
  example: `import { ActionTile } from '@drizztdourden08/tessera';

const SessionTiles = ({ address, onShowPlayers, onStop }: { address: string; onShowPlayers: () => void; onStop: () => void }) => (
  <>
    <ActionTile label="Players" icon="users" value="2 / 3" unit="connected" onOpen={onShowPlayers} openLabel="Show the Players widget" />
    <ActionTile label="Address" icon="link" value={address} action={{ label: 'Copy address', copy: address }} />
    <ActionTile
      label="Uptime"
      icon="clock"
      value="42 min"
      status={{ label: 'hosting', tone: 'success' }}
      action={{ label: 'Stop', icon: 'square', variant: 'danger', onSelect: onStop }}
    />
  </>
);
`,
  propsHash: 'bfd57a652b5af170',
} satisfies ComponentUsage;

export { usage };
