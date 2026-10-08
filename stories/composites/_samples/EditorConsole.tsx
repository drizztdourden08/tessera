/* @layer stories @kind component */
import { useId } from 'react';
import { ResizeHandle } from '../../../src/composites';
import { Box, Card, Paragraph } from '../../../src/primitives';
import { RAILS, RESIZE_TEXT as T } from './resize-handle-story.constants';
import { useRailSize } from './useRailSize';

const EditorConsole = () => {
  const tray = useRailSize(RAILS.console, 'block-size');
  const consoleId = useId();
  return (
    <Box className="resize-story__stacked">
      <Box className="resize-story__canvas">
        <Paragraph tone="dim">{T.editorLine}</Paragraph>
      </Box>
      <ResizeHandle orientation="vertical" edge="end" label={`Resize ${T.console}`} controls={consoleId} {...tray.handle} />
      <Box ref={tray.railRef} id={consoleId} className="resize-story__rail">
        <Card title={T.consoleTitle}><Paragraph tone="dim">{`${tray.size} px`}</Paragraph></Card>
      </Box>
    </Box>
  );
};

export { EditorConsole };
