/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import type { PatternErrorProps } from './PatternAdornment.type';

const PatternError = (props: PatternErrorProps) => {
  const { field, message } = props;
  return <Span id={field.errorId} tone="danger" className="dynamic-input__error" role="alert">{message}</Span>;
};

export { PatternError };
