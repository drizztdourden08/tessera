/* @layer stories @kind component */
import { useState } from 'react';
import { DataTable } from '../../../src/composites';
import { Text } from '../../../src/primitives';
import { LinkSandbox } from '../../primitives/_samples/LinkSandbox';
import {
  HINTS, HINT_SCHEMA, resolveSlotDefault, resolveSlotField, resolveTargetFields,
} from './data-hints';
import type { HintRow } from './data-hints';
import { slotHref } from './slot-href';

const HINT_COUNT: readonly [string, string] = ['hint', 'hints'];

const hintId = (hint: HintRow): string => hint.id;

const DataTableHints = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <LinkSandbox className="data-table-story">
      <Text className="story-label">
        Finder and receiver are slot references, each a link to its player. Open a column menu to pick which player field they show.
      </Text>
      <DataTable
        rows={HINTS}
        schema={HINT_SCHEMA}
        getRowId={hintId}
        selectedId={selectedId}
        onSelect={setSelectedId}
        countLabel={HINT_COUNT}
        resolveTargetFields={resolveTargetFields}
        resolveIdRefDisplay={resolveSlotField}
        resolveIdRefDefault={resolveSlotDefault}
        resolveIdRefHref={slotHref}
      />
    </LinkSandbox>
  );
};

export { DataTableHints };
