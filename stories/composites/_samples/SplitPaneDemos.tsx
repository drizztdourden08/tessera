/* @layer stories @kind component */
import { useState } from 'react';
import { SplitPane } from '../../../src/composites';
import type { SplitPaneProps } from '../../../src/composites';
import { Box, CodeBlock, Icon, Pressable, Text } from '../../../src/primitives';
import { CONSOLE_LINES, EDITOR_CODE, FILES } from './split-pane-data';

type SplitSettings = Omit<SplitPaneProps, 'start' | 'end'>;

const FileRow = (props: { name: string; size: string; picked: boolean; onPick: () => void }) => (
  <Pressable
    className={`split-pane-story__file focus-ring-inset${props.picked ? ' split-pane-story__file--picked' : ''}`}
    onClick={props.onPick}
    aria-current={props.picked ? 'true' : undefined}
  >
    <Icon name="file-text" size={14} />
    <Text className="split-pane-story__file-name">{props.name}</Text>
    <Text className="split-pane-story__file-size">{props.size}</Text>
  </Pressable>
);

const FilesSplit = (props: SplitSettings) => {
  const [picked, setPicked] = useState(FILES[0]?.name ?? '');
  const file = FILES.find((entry) => entry.name === picked);
  const list = (
    <Box className="split-pane-story__pane">
      <Text className="story-label">Files</Text>
      {FILES.map((entry) => (
        <FileRow key={entry.name} name={entry.name} size={entry.size} picked={entry.name === picked} onPick={() => setPicked(entry.name)} />
      ))}
    </Box>
  );
  const preview = (
    <Box className="split-pane-story__pane">
      <Text className="story-label">Preview of {picked}</Text>
      {file?.lines.map((line) => <Text key={line} className="split-pane-story__mono">{line}</Text>)}
    </Box>
  );
  return <SplitPane startLabel="files" endLabel="preview" {...props} start={list} end={preview} />;
};

const EditorSplit = (props: SplitSettings) => {
  const editor = (
    <Box className="split-pane-story__pane">
      <Text className="story-label">workspace.tsx</Text>
      <CodeBlock code={EDITOR_CODE} language="tsx" showLineNumbers />
    </Box>
  );
  const output = (
    <Box className="split-pane-story__pane split-pane-story__console">
      <Text className="story-label">Console</Text>
      {CONSOLE_LINES.map((line) => <Text key={line} className="split-pane-story__mono">{line}</Text>)}
    </Box>
  );
  return <SplitPane orientation="vertical" defaultRatio={0.7} startLabel="editor" endLabel="console" {...props} start={editor} end={output} />;
};

export { EditorSplit, FilesSplit };
export type { SplitSettings };
