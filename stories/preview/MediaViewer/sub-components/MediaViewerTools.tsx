/* @layer stories @kind component */
import { Flex, Text } from '../../../../src/primitives';
import { MEDIA_VIEWER_STRINGS } from '../media-viewer-strings.constants';
import type { MediaViewerToolsProps } from '../MediaViewer.type';
import { MediaViewerZoom } from './MediaViewerZoom';

const MediaViewerTools = ({ at, count, zoom }: MediaViewerToolsProps) => (
  <Flex align="center" gap="md">
    {count > 1 && <Text as="span" variant="caption" aria-live="polite" className="media-viewer__count">{MEDIA_VIEWER_STRINGS.position(at + 1, count)}</Text>}
    {zoom && <MediaViewerZoom state={zoom} />}
  </Flex>
);

export { MediaViewerTools };
