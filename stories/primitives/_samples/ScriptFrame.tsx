/* @layer stories @kind component */
import { Text, ToolFrame } from '../../../src/primitives';
import { ScriptTools } from './ScriptTools';
import { TOOL_TEXT as T } from './tool-story.constants';
import type { ScriptFrameProps } from './tool-story.type';

const ScriptFrame = ({ toolbar = true, padded = true }: ScriptFrameProps) => (
  <ToolFrame as="section" aria-label={T.editor} padded={padded} toolbar={toolbar && <ScriptTools count={2} />} className="tool-story__frame">
    {T.lines.map((line) => <Text key={line} mono className="tool-story__line">{line}</Text>)}
  </ToolFrame>
);

export { ScriptFrame };
