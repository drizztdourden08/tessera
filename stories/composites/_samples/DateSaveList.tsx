/* @layer stories @kind component */
import { useState } from 'react';
import { DateText } from '../../../src/composites';
import { ItemListUndoDemo } from './ItemListUndoDemo';
import { MINUTE_MS } from './date-text-samples.constants';
import '../ItemList.stories.css';

const DateSaveList = () => {
  const [start] = useState(() => Date.now());
  return <ItemListUndoDemo meta={(save) => <DateText value={start - save.minutesAgo * MINUTE_MS} format="relative" />} />;
};

export { DateSaveList };
