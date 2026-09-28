/* @layer renderer-components @kind component */
import { useQuoteLines } from '../behavior/useQuoteLines';
import type { QuoteProps } from '../Quote.type';
import { QuoteMark } from './QuoteMark';

const StandaloneQuote = (props: Omit<QuoteProps, 'inline'>) => {
  const { className, children, ...rest } = props;
  const { rootRef, textRef, isMultiline } = useQuoteLines(children);
  const look = isMultiline ? 'quote--multiline' : 'quote--single';
  return (
    <blockquote ref={rootRef} className={['quote', 'quote--block', look, className].filter(Boolean).join(' ')} {...rest}>
      <QuoteMark side="close" />
      <span ref={textRef} className="quote__text">{children}</span>
    </blockquote>
  );
};

export { StandaloneQuote };
