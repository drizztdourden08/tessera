/* @layer stories @kind component */
import { useState } from 'react';
import { Button, Card, Flex, Icon, Image, Pressable, Stack } from '../../../../src/primitives';
import { MediaViewer } from '../MediaViewer';
import { VIEWER_TEXT } from './media-viewer-story.constants';
import { SPRITE_ITEM } from './viewer-items.constants';

const FileMediaSample = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card title={SPRITE_ITEM.name} className="viewer-story__file">
      <Stack gap="xs" align="stretch">
        <Pressable className="viewer-story__thumb" aria-label={VIEWER_TEXT.expandName(SPRITE_ITEM.name)} onClick={() => setOpen(true)}>
          <Image src={SPRITE_ITEM.src} alt={SPRITE_ITEM.name} aspectRatio="2 / 1" className="viewer-story__pixels" />
        </Pressable>
        <Flex justify="end">
          <Button variant="secondary" size="sm" icon={<Icon name="maximize-2" />} onClick={() => setOpen(true)}>{VIEWER_TEXT.expand}</Button>
        </Flex>
      </Stack>
      <MediaViewer open={open} items={[SPRITE_ITEM]} onClose={() => setOpen(false)} />
    </Card>
  );
};

export { FileMediaSample };
