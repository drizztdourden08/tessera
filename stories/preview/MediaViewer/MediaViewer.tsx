/* @layer stories @kind component */
import { DialogShell } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { useViewerMedia } from './behavior/useViewerMedia';
import type { MediaViewerProps } from './MediaViewer.type';
import { MediaViewerStage } from './sub-components/MediaViewerStage';
import { MediaViewerStep } from './sub-components/MediaViewerStep';
import { MediaViewerTools } from './sub-components/MediaViewerTools';
import './MediaViewer.css';

const MediaViewer = (props: MediaViewerProps) => {
  const { open, items, index, defaultIndex = 0, onIndexChange, startAt = 0, pixelated = 'auto', onClose } = props;
  const media = useViewerMedia({ open, items, index, defaultIndex, onIndexChange });
  const { item, current } = media;
  if (!item) return null;

  return (
    <DialogShell
      open={open}
      title={item.name}
      headerExtra={<MediaViewerTools at={current} count={items.length} zoom={item.kind === 'image' ? media.zoom : null} />}
      onClose={onClose}
      className="media-viewer"
    >
      <Box className="media-viewer__body">
        <MediaViewerStage
          item={item}
          zoom={media.zoom}
          startAt={current === defaultIndex ? startAt : 0}
          pixelated={pixelated}
          natural={media.natural}
          onNatural={media.measure}
          stageRef={media.stageRef}
        />
        {items.length > 1 && <MediaViewerStep onStep={media.step} />}
      </Box>
    </DialogShell>
  );
};

export { MediaViewer };
