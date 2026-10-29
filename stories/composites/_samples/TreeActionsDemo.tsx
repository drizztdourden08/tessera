/* @layer stories @kind component */
import { useState } from 'react';
import { Icon, IconButton } from '../../../src/primitives';
import { TreeDemo } from './TreeDemo';

const TreeActionsDemo = () => {
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
  const toggle = (id: string) => setHidden((now) => {
    const next = new Set(now);
    if (!next.delete(id)) next.add(id);
    return next;
  });

  return (
    <TreeDemo
      trail="hover"
      mode="single"
      renderTrail={(entry) => (
        <IconButton size="xs" variant="ghost" label={hidden.has(entry.id) ? `Show ${entry.name}` : `Hide ${entry.name}`} onClick={() => toggle(entry.id)}>
          <Icon name={hidden.has(entry.id) ? 'eye-off' : 'eye'} />
        </IconButton>
      )}
    />
  );
};

export { TreeActionsDemo };
