/* @layer stories @kind component */
import { useState } from 'react';
import { DropdownMenu } from '../../../src/composites';
import type { MenuGroup } from '../../../src/composites';
import { ValueReadout } from '../../_template/ValueReadout';

const STATUSES = [
  { value: 'todo', label: 'To do' },
  { value: 'doing', label: 'In progress' },
  { value: 'done', label: 'Done' },
];

const THREADS = [
  { value: 'argus', label: 'Argus' },
  { value: 'brock', label: 'Brock' },
  { value: 'tessera', label: 'Tessera' },
];

const ignore = (): void => undefined;

const MenuSelectDemo = () => {
  const [status, setStatus] = useState('doing');
  const [thread, setThread] = useState('tessera');
  const groups: MenuGroup[] = [
    {
      id: 'card',
      items: [
        { id: 'status', label: 'Status', kind: 'select', options: STATUSES, selected: status, onPick: setStatus },
        { id: 'thread', label: 'Thread', kind: 'select', options: THREADS, selected: thread, onPick: setThread },
        { separator: true },
        { id: 'edit', label: 'Edit', icon: 'pencil', onSelect: ignore },
        { id: 'archive', label: 'Archive', icon: 'archive', onSelect: ignore },
        { id: 'copy', label: 'Copy id', icon: 'copy', onSelect: ignore },
        { id: 'delete', label: 'Delete', icon: 'trash-2', tone: 'danger', onSelect: ignore },
      ],
    },
  ];
  return (
    <ValueReadout value={`status ${status}, thread ${thread}`}>
      <DropdownMenu trigger={{ label: 'Card', icon: 'ellipsis', iconOnly: true }} groups={groups} />
    </ValueReadout>
  );
};

export { MenuSelectDemo };
