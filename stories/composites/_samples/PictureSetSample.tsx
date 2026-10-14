/* @layer stories @kind component */
import { useState } from 'react';
import { MediaViewer } from '../../../src/composites';
import { Box, Image, Pressable } from '../../../src/primitives';
import { VIEWER_TEXT } from './media-viewer-story.constants';
import { PACK_ITEMS } from './viewer-items.constants';

const PictureSetSample = () => {
  const [opened, setOpened] = useState<number | null>(null);
  return (
    <Box className="viewer-story__set">
      {PACK_ITEMS.map((item, i) => (
        <Pressable key={item.id} className="viewer-story__thumb" aria-label={VIEWER_TEXT.expandName(item.name)} onClick={() => setOpened(i)}>
          <Image src={item.kind === 'image' ? item.src : item.poster} alt={item.name} aspectRatio="16 / 9" />
        </Pressable>
      ))}
      <MediaViewer open={opened !== null} items={PACK_ITEMS} index={opened ?? 0} onIndexChange={setOpened} onClose={() => setOpened(null)} />
    </Box>
  );
};

export { PictureSetSample };
