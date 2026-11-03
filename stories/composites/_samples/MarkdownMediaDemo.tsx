/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { MarkdownEditor } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { MEDIA_TEXT, UPLOAD_DELAY, textOnly } from './markdown-media-demo.constants';

interface MarkdownMediaDemoProps {
  initial: string;
  refuse?: boolean;
  limit?: number;
  uploads?: boolean;
}

const MarkdownMediaDemo = ({ initial, refuse = false, limit, uploads = true }: MarkdownMediaDemoProps) => {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState<string | undefined>(undefined);
  const saved = useRef(0);

  const upload = (files: File[]): Promise<string> => new Promise((resolve, reject) => {
    setError(undefined);
    setTimeout(() => {
      if (refuse) {
        setError(MEDIA_TEXT.refused);
        reject(new Error(MEDIA_TEXT.refused));
        return;
      }
      const first = saved.current;
      saved.current += files.length;
      resolve(files.map((file, index) => `![${file.name}](img:${first + index + 1})`).join('\n'));
    }, UPLOAD_DELAY);
  });

  return (
    <Box className="markdown-editor-story__frame">
      <MarkdownEditor
        label="Description"
        value={value}
        onChange={setValue}
        layout="tabs"
        rows={5}
        error={error}
        maxLength={limit}
        count={limit === undefined ? undefined : textOnly}
        onImageFiles={uploads ? upload : undefined}
        placeholder="Write some Markdown"
      />
      <Text className="story-label">{limit === undefined ? MEDIA_TEXT.start : MEDIA_TEXT.limitNote}</Text>
    </Box>
  );
};

export { MarkdownMediaDemo };
