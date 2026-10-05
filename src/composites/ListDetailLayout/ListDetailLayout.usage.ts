/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The two panes of a list and detail screen: the list on the left and the detail of the picked item beside it, each on its own surface.',
  useWhen: [
    'A screen lists things on the left and shows the picked one on the right, such as sessions, servers or saves.',
    'The user needs more room for the detail now and then, so the list folds away to a rail.',
  ],
  avoidWhen: [
    { case: 'The detail is an editor whose edits can be lost when the user picks another item.', use: 'ListDetail' },
    { case: 'Two panes of equal weight split the room by share.', use: 'SplitPane' },
    { case: 'The left side is the navigation of the app.', use: 'SideNavLayout' },
  ],
  rules: [
    'Pass the list and the detail as content; the layout draws the panes, their surfaces and their scroll.',
    'Leave detail out, or pass null, while nothing is picked; emptyDetail replaces the default placeholder.',
    'Pass onBack to clear the selection; under 768 px it shows the list again.',
    'Pass storageKey to keep the width and the fold between visits; the fold is kept under storageKey:collapsed.',
    'Pass collapsed with onCollapsedChange when the app holds the fold, such as from a menu or its own shortcut.',
    'Put a SaveBar last in the detail: it sits flush with the foot of the pane.',
    'Name the panes with listLabel and detailLabel, in lower case, such as presets and preset editor.',
  ],
  a11y: [
    'The divider is a separator: the arrow keys resize it, Home and End jump to the limits, Space and a double click reset it.',
    'Enter on the divider folds the list and moves focus to the button that brings it back.',
    'The fold button names the list, Hide presets or Show presets, and reports aria-expanded on the list pane.',
    'Under 768 px the panes stack and Back sits at the top of the detail.',
  ],
  tree: {
    path: ['layout', 'a list beside its detail'],
    rule: 'ListDetailLayout draws the panes, the resize, the fold and the small window of every list and detail screen the same way.',
  },
  example: `import { ListDetailLayout, ListItemList, ListItemRow } from '@drizztdourden08/tessera';
import { useState } from 'react';

interface Session {
  id: string;
  name: string;
}

const SessionsScreen = ({ sessions, renderSession }: { sessions: Session[]; renderSession: (session: Session) => React.ReactNode }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = sessions.find((session) => session.id === selectedId);
  return (
    <ListDetailLayout
      list={(
        <ListItemList heading="Sessions">
          {sessions.map((session) => (
            <ListItemRow key={session.id} name={session.name} selected={session.id === selectedId} onClick={() => setSelectedId(session.id)} />
          ))}
        </ListItemList>
      )}
      detail={selected && renderSession(selected)}
      onBack={() => setSelectedId(null)}
      listLabel="sessions"
      storageKey="sessions.list"
    />
  );
};
`,
  propsHash: 'fdcf07fa45ab4c80',
} satisfies ComponentUsage;

export { usage };
