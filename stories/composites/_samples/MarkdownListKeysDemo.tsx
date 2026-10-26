/* @layer stories @kind component */
import { useState } from 'react';
import { MarkdownEditor } from '../../../src/composites';
import { Box } from '../../../src/primitives';

const START = '- Press Enter at the end of this item\n1. Numbers count up\n- [ ] Tasks continue as tasks\n';

const MarkdownListKeysDemo = () => {
  const [value, setValue] = useState(START);
  return (
    <Box className="markdown-editor-story__frame">
      <MarkdownEditor
        label="Note"
        hint="Enter continues a list and ends it on an empty item. Tab and Shift+Tab move an item. Backspace after an empty marker removes it."
        value={value}
        onChange={setValue}
        layout="tabs"
        rows={8}
      />
    </Box>
  );
};

export { MarkdownListKeysDemo };
