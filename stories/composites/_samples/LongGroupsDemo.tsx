/* @layer stories @kind story */
import { useState } from 'react';
import { DataTable } from '../../../src/composites';
import { Text } from '../../../src/primitives';
import { LinkSandbox } from '../../primitives/_samples/LinkSandbox';
import { PEERS, PEER_SCHEMA } from './data-peers';
import { PEER_COUNT, PEER_GROUP_BY, PEER_VIRTUAL_FROM, peerId } from './peer-table.constants';

const OPEN_GROUPS: readonly string[] = ['Connected'];

const LongGroupsDemo = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <LinkSandbox className="data-table-story">
      <Text className="story-label">
        Known holds 900 rows and starts collapsed; Connected starts open. Rows are drawn as you scroll once the table has 100 rows or more.
      </Text>
      <DataTable
        rows={PEERS}
        schema={PEER_SCHEMA}
        getRowId={peerId}
        fallbackGroupBy={PEER_GROUP_BY}
        defaultExpanded={OPEN_GROUPS}
        virtualizeFrom={PEER_VIRTUAL_FROM}
        selectedId={selectedId}
        onSelect={setSelectedId}
        countLabel={PEER_COUNT}
      />
    </LinkSandbox>
  );
};

export { LongGroupsDemo };
