/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { MediaViewerToolsProps } from '../MediaViewer.type';
import { MediaViewerZoom } from './MediaViewerZoom';

const MediaViewerTools = ({ at, count, zoom }: MediaViewerToolsProps) => {
  const { mediaViewer } = useTesseraStrings();
  return (
    <Flex align="center" gap="md">
      {count > 1 && <Text as="span" variant="caption" aria-live="polite" className="media-viewer__count">{mediaViewer.position(at + 1, count)}</Text>}
      {zoom && <MediaViewerZoom state={zoom} />}
    </Flex>
  );
};

export { MediaViewerTools };
