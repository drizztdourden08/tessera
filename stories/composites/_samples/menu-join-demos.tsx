/* @layer stories @kind story */
import { useState } from 'react';
import { DropdownMenu } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { JOIN_MENUS, viewMenu } from './data-menu-joins';
import { NESTED_DEEP } from './data-menu-nested';

const JoinDemos = () => (
  <Demonstrator
    rows={axis(Object.keys(JOIN_MENUS))}
    align="start"
    cell={(where) => <DropdownMenu inline groups={JOIN_MENUS[where] ?? []} />}
  />
);

const MarksDemo = () => {
  const [flags, setFlags] = useState({ pinned: false, status: true });
  const [group, setGroup] = useState(0);
  const [last, setLast] = useState('Nothing picked yet.');
  const groups = viewMenu({
    ...flags,
    group,
    onToggle: (id) => setFlags((all) => ({ ...all, [id]: !all[id] })),
    onGroup: setGroup,
    onAction: (label) => setLast(`Picked ${label}; the menu closed.`),
  });
  return (
    <Demonstrator
      columns={axis(['In place', 'From a button'])}
      valign="start"
      cell={(_row, where) => (where === 'In place'
        ? <DropdownMenu inline groups={groups} />
        : (
          <Box className="story-row">
            <DropdownMenu trigger={{ label: 'View', icon: 'chevron-down', iconSide: 'end' }} groups={groups} />
            <Text className="story-label">{last}</Text>
          </Box>
        ))}
    />
  );
};

const NestedDemo = () => <DropdownMenu trigger={{ label: 'File', icon: 'chevron-down', iconSide: 'end' }} groups={NESTED_DEEP} />;

export { JoinDemos, MarksDemo, NestedDemo };
