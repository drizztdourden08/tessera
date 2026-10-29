/* @layer renderer-components @kind component */
import { Fragment, useMemo } from 'react';
import { Span } from '../../../primitives/text-elements';
import { ansiClass } from '../behavior/ansi-class';
import { parseAnsi } from '../behavior/parse-ansi';
import type { AnsiTextProps } from './AnsiText.type';
import './AnsiText.css';

const AnsiText = (props: AnsiTextProps) => {
  const { text } = props;
  const spans = useMemo(() => parseAnsi(text), [text]);

  return (
    <>
      {spans.map((span, index) => {
        const className = ansiClass(span);
        return className === ''
          ? <Fragment key={index}>{span.text}</Fragment>
          : <Span key={index} className={`log-panel__ansi ${className}`}>{span.text}</Span>;
      })}
    </>
  );
};

export { AnsiText };
