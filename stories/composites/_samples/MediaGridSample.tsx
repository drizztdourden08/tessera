/* @layer stories @kind component */
import { useState } from 'react';
import { MediaGrid, MediaViewer } from '../../../src/composites';
import type { MediaGridItem } from '../../../src/composites';
import { EmptyState } from '../../../src/primitives';
import { GRID_TEXT, GRID_VIEWER_ITEMS } from './media-grid-story.constants';

interface MediaGridSampleProps {
  items: readonly MediaGridItem[];
  columns?: number;
}

const MediaGridSample = ({ items, columns }: MediaGridSampleProps) => {
  const [opened, setOpened] = useState<number | null>(null);
  return (
    <>
      <MediaGrid
        items={items}
        columns={columns}
        onOpen={setOpened}
        aria-label={GRID_TEXT.listName}
        empty={<EmptyState message={GRID_TEXT.empty} hint={GRID_TEXT.emptyHint} />}
      />
      <MediaViewer open={opened !== null} items={GRID_VIEWER_ITEMS} index={opened ?? 0} onIndexChange={setOpened} onClose={() => setOpened(null)} />
    </>
  );
};

export { MediaGridSample };
