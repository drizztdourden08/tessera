/* @layer stories @kind component */
import { useState } from 'react';
import { InlineEdit, Markdown } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { nameRule } from './inline-edit.constants';
import type { InlineEditDemoProps } from './inline-edit.type';

const InlineEditDemo = ({ initial = '', label, placeholder, multiline, disabled, validated, link, markdown }: InlineEditDemoProps) => {
  const [value, setValue] = useState(initial);
  const [commits, setCommits] = useState(0);
  return (
    <Box className="inline-edit-story__frame">
      <InlineEdit
        value={value}
        label={label}
        placeholder={placeholder}
        multiline={multiline}
        disabled={disabled}
        look={link ? 'link' : undefined}
        renderValue={markdown ? (text) => <Markdown source={text} size="inline" /> : undefined}
        validate={validated ? nameRule : undefined}
        onCommit={(next) => {
          setValue(next);
          setCommits((count) => count + 1);
        }}
      />
      <Text className="story-label">{commits === 0 ? 'Nothing committed yet' : `Committed ${commits} time${commits === 1 ? '' : 's'}`}</Text>
    </Box>
  );
};

export { InlineEditDemo };
