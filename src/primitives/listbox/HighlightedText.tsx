/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { matchParts } from '../../data/text/match-parts';
import { Mark } from '../text-elements';
import type { HighlightedTextProps } from './listbox-view.type';

const HighlightedText = (props: HighlightedTextProps) => {
  const { text, query, markClassName } = props;
  return (
    <>
      {matchParts(text, query).map((part, index) => (part.match
        ? <Mark key={index} className={markClassName}>{part.text}</Mark>
        : <Fragment key={index}>{part.text}</Fragment>))}
    </>
  );
};

export { HighlightedText };
