/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { Mark } from '../text-elements';
import { highlightParts } from './highlight-parts';
import type { HighlightedTextProps } from './listbox-view.type';

const HighlightedText = (props: HighlightedTextProps) => {
  const { text, query } = props;
  return (
    <>
      {highlightParts(text, query).map((part, index) => (part.match
        ? <Mark key={index}>{part.text}</Mark>
        : <Fragment key={index}>{part.text}</Fragment>))}
    </>
  );
};

export { HighlightedText };
