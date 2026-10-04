/* @layer stories @kind component */
import { Fragment } from 'react';
import { Box, Span } from '../../../../src/primitives';
import type { EditorContextProps } from '../EditorBar.type';

const EditorContext = ({ items }: EditorContextProps) => (
  <Box as="span" className="editor-context">
    {items.map((item, index) => (
      <Fragment key={`item-${String(index)}`}>
        {index > 0 && <Span className="editor-context__sep" aria-hidden>·</Span>}
        <Span className="editor-context__item">{item}</Span>
      </Fragment>
    ))}
  </Box>
);

export { EditorContext };
