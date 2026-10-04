/* @layer stories @kind component */
import { useState } from 'react';
import { ActionBar } from '../../../src/composites';
import type { ActionItem } from '../../../src/composites';
import { ValueReadout } from '../../_template/ValueReadout';
import { PRESET_ACTIONS } from './action-bar-samples.constants';

const ASKS = { title: 'Delete Keysanity?', confirmLabel: 'Delete Keysanity' };

const ActionBarDemo = () => {
  const [last, setLast] = useState('none');
  const actions: ActionItem[] = PRESET_ACTIONS.map((action) => ({
    ...action,
    confirm: action.kind === 'danger' ? ASKS : undefined,
    onSelect: () => setLast(action.label),
  }));
  return (
    <ValueReadout value={last}>
      <ActionBar actions={actions} label="Keysanity" />
    </ValueReadout>
  );
};

export { ActionBarDemo };
