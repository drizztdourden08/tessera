/* @layer stories @kind component */
import { useState } from 'react';
import { ItemListUndoDemo } from '../../../composites/_samples/ItemListUndoDemo';
import { RelativeTime } from '../RelativeTime';

const MINUTE_MS = 60_000;

const SaveListWithTimes = () => {
  const [start] = useState(() => Date.now());
  return <ItemListUndoDemo meta={(save) => <RelativeTime value={start - save.minutesAgo * MINUTE_MS} />} />;
};

export { SaveListWithTimes };
