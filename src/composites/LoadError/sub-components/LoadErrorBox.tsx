/* @layer renderer-components @kind component */
import { Callout } from '../../../primitives/Callout';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import type { LoadErrorBoxProps } from '../LoadError.type';

const LoadErrorBox = ({ message, retry, details, className }: LoadErrorBoxProps) => (
  <Callout tone="danger" icon={<Icon name="circle-alert" />} action={retry} details={details} className={className}>
    <Span role="alert" className="load-error__message">{message}</Span>
  </Callout>
);

export { LoadErrorBox };
