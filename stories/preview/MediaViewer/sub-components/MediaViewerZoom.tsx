/* @layer stories @kind component */
import { Button, Flex, Icon, IconButton } from '../../../../src/primitives';
import { MEDIA_VIEWER_STRINGS } from '../media-viewer-strings.constants';
import type { MediaViewerZoomProps } from '../MediaViewer.type';

const MediaViewerZoom = ({ state }: MediaViewerZoomProps) => (
  <Flex align="center" gap="xs" className="media-viewer__zoom">
    <IconButton variant="ghost" size="sm" label={MEDIA_VIEWER_STRINGS.zoomOut} disabled={!state.canOut} onClick={state.zoomOut}>
      <Icon name="minimize-2" />
    </IconButton>
    <Button variant="secondary" size="sm" title={MEDIA_VIEWER_STRINGS.zoomTo} className="media-viewer__level" onClick={state.toggle}>
      {state.zoom === 'fit' ? MEDIA_VIEWER_STRINGS.fit : MEDIA_VIEWER_STRINGS.percent(state.zoom)}
    </Button>
    <IconButton variant="ghost" size="sm" label={MEDIA_VIEWER_STRINGS.zoomIn} disabled={!state.canIn} onClick={state.zoomIn}>
      <Icon name="maximize-2" />
    </IconButton>
  </Flex>
);

export { MediaViewerZoom };
