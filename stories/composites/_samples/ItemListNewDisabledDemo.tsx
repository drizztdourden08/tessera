/* @layer stories @kind component */
import { useState } from 'react';
import { ItemList } from '../../../src/composites';
import { Card, Icon, Toggle } from '../../../src/primitives';
import { SAMPLE_SAVES } from './save-samples.constants';
import type { SampleSave } from './save-samples.type';

const idOf = (save: SampleSave) => save.id;
const nameOf = (save: SampleSave) => save.name;

const ItemListNewDisabledDemo = () => {
  const [running, setRunning] = useState(false);
  const [saves, setSaves] = useState(SAMPLE_SAVES);
  const add = () => setSaves((list) => [{ id: `n${list.length}`, name: `Save ${list.length + 1}`, when: 'Just now', minutesAgo: 0 }, ...list]);
  return (
    <Card className="item-list-story item-list-story--switch">
      <Toggle label="Game running" checked={running} onChange={setRunning} />
      <ItemList
        title="Saves"
        items={saves}
        getId={idOf}
        getName={nameOf}
        render={(save) => ({ meta: save.when, icon: <Icon name="save" /> })}
        onCreate={add}
        createLabel="New save"
        newDisabled={running ? false : 'Start a game to make a new save.'}
      />
    </Card>
  );
};

export { ItemListNewDisabledDemo };
