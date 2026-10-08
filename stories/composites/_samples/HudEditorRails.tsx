/* @layer stories @kind component */
import { useId } from 'react';
import { ResizeHandle } from '../../../src/composites';
import type { ResizeHandleLook } from '../../../src/composites';
import { Box, Card, Paragraph } from '../../../src/primitives';
import { RAILS, RESIZE_TEXT as T } from './resize-handle-story.constants';
import { useRailSize } from './useRailSize';

const HudEditorRails = ({ look = 'grip' }: { look?: ResizeHandleLook }) => {
  const outline = useRailSize(RAILS.outline);
  const inspector = useRailSize(RAILS.inspector);
  const outlineId = useId();
  const inspectorId = useId();
  return (
    <Box className="resize-story__editor">
      <Box ref={outline.railRef} id={outlineId} className="resize-story__rail">
        <Card title={T.outlineTitle}><Paragraph tone="dim">{`${outline.size} px`}</Paragraph></Card>
      </Box>
      <ResizeHandle look={look} label={`Resize ${T.outline}`} controls={outlineId} {...outline.handle} />
      <Box className="resize-story__canvas">
        <Paragraph tone="dim">{T.canvasLine}</Paragraph>
      </Box>
      <ResizeHandle look={look} edge="end" label={`Resize ${T.inspector}`} controls={inspectorId} {...inspector.handle} />
      <Box ref={inspector.railRef} id={inspectorId} className="resize-story__rail">
        <Card title={T.inspectorTitle}><Paragraph tone="dim">{`${inspector.size} px`}</Paragraph></Card>
      </Box>
    </Box>
  );
};

export { HudEditorRails };
