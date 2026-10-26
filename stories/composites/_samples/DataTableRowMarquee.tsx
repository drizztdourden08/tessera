/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { DataTable, MarqueeBox, useMarqueeSelect } from '../../../src/composites';
import type { DataTableHandle } from '../../../src/composites';
import { Text } from '../../../src/primitives';
import { PEERS, PEER_SCHEMA } from './data-peers';
import { PEER_COUNT, PEER_GROUP_BY, PEER_VIRTUAL_FROM, peerId } from './peer-table.constants';
import { LinkSandbox } from '../../primitives/_samples/LinkSandbox';

const OPEN_GROUPS: readonly string[] = ['Connected', 'Known'];

const DataTableRowMarquee = () => {
  const areaRef = useRef<HTMLElement>(null);
  const tableRef = useRef<DataTableHandle>(null);
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const marquee = useMarqueeSelect({
    containerRef: areaRef,
    selected: [...picked],
    onChange: (keys) => setPicked(new Set(keys)),
    getRects: () => tableRef.current?.getRects() ?? [],
  });

  return (
    <LinkSandbox className="data-table-story">
      <Text className="story-label">
        {`${picked.size} selected. Drag over the rows, even past the ones drawn; Shift adds, Ctrl or Cmd toggles, Escape cancels.`}
      </Text>
      <DataTable
        ref={tableRef}
        rows={PEERS}
        schema={PEER_SCHEMA}
        getRowId={peerId}
        fallbackGroupBy={PEER_GROUP_BY}
        defaultExpanded={OPEN_GROUPS}
        virtualizeFrom={PEER_VIRTUAL_FROM}
        selectable
        selectedIds={picked}
        onSelectionChange={setPicked}
        scrollRef={areaRef}
        bind={marquee.bind}
        overlay={<MarqueeBox rect={marquee.rect} />}
        countLabel={PEER_COUNT}
      />
    </LinkSandbox>
  );
};

export { DataTableRowMarquee };
