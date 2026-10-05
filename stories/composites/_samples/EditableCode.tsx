/* @layer stories @kind component */
import { useState } from 'react';
import { CodeBlock } from '../../../src/composites';
import type { CodeBlockLanguage } from '../../../src/composites';

const EditableCode = ({ start, language }: { start: string; language: CodeBlockLanguage }) => {
  const [text, setText] = useState(start);
  return <CodeBlock editable language={language} value={text} onChange={setText} aria-label={`Code in ${language}`} />;
};

export { EditableCode };
