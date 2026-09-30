/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { highlightParts } from './highlight-parts';
import type { HighlightedTextProps } from './listbox-view.type';

const HighlightedText = (props: HighlightedTextProps) => {
  const { text, query } = props;
  return (
    <>
      {highlightParts(text, query).map((part, index) => (part.match
        ? <mark key={index} className="listbox-match">{part.text}</mark>
        : <Fragment key={index}>{part.text}</Fragment>))}
    </>
  );
};

export { HighlightedText };
