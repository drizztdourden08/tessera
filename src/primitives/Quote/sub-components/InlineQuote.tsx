/* @layer renderer-components @kind component */
import type { QuoteProps } from '../Quote.type';
import { QuoteMark } from './QuoteMark';

const InlineQuote = (props: Omit<QuoteProps, 'inline'>) => {
  const { className, children, ...rest } = props;
  return (
    <q className={['quote', 'quote--inline', className].filter(Boolean).join(' ')} {...rest}>
      <QuoteMark side="open" />
      <span className="quote__text">{children}</span>
      <QuoteMark side="close" />
    </q>
  );
};

export { InlineQuote };
