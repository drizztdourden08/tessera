/* @layer stories @kind component */
import { Box, Card, Paragraph } from '../../../../src/primitives';
import { ResizeHandle } from '../ResizeHandle';
import type { ResizeHandleLook } from '../ResizeHandle.type';
import { RAILS, RESIZE_TEXT } from './resize-story.constants';
import { useRail } from './useRail';

const EditorRails = ({ look = 'grip' }: { look?: ResizeHandleLook }) => {
  const outline = useRail(RAILS.outline);
  const inspector = useRail(RAILS.inspector);
  return (
    <Box className="resize-story__editor">
      <Box ref={outline.railRef} className="resize-story__rail">
        <Card title={RESIZE_TEXT.outlineTitle}><Paragraph tone="dim">{`${outline.width} px`}</Paragraph></Card>
      </Box>
      <ResizeHandle look={look} startLabel={RESIZE_TEXT.outline} endLabel={RESIZE_TEXT.canvas} size={outline.width} min={RAILS.outline.min} max={RAILS.outline.max} handlers={outline.handlers} />
      <Box className="resize-story__canvas">
        <Paragraph tone="dim">{RESIZE_TEXT.canvasLine}</Paragraph>
      </Box>
      <ResizeHandle look={look} edge="end" startLabel={RESIZE_TEXT.canvas} endLabel={RESIZE_TEXT.inspector} size={inspector.width} min={RAILS.inspector.min} max={RAILS.inspector.max} handlers={inspector.handlers} />
      <Box ref={inspector.railRef} className="resize-story__rail">
        <Card title={RESIZE_TEXT.inspectorTitle}><Paragraph tone="dim">{`${inspector.width} px`}</Paragraph></Card>
      </Box>
    </Box>
  );
};

export { EditorRails };
