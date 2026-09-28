/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { RunningTextContext } from './behavior/running-text-context';
import { InlineQuote } from './sub-components/InlineQuote';
import { StandaloneQuote } from './sub-components/StandaloneQuote';
import type { QuoteProps } from './Quote.type';
import './Quote.css';

const Quote = (props: QuoteProps) => {
  const { inline, ...rest } = props;
  const inRunningText = useContext(RunningTextContext);
  const Look = (inline ?? inRunningText) ? InlineQuote : StandaloneQuote;
  return (
    <RunningTextContext.Provider value>
      <Look {...rest} />
    </RunningTextContext.Provider>
  );
};

Quote.displayName = 'Quote';

export { Quote };
