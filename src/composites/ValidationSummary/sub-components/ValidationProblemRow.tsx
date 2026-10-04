/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import type { ValidationProblemRowProps } from '../ValidationSummary.type';

const ValidationProblemRow = (props: ValidationProblemRowProps) => {
  const { problem, onFocusField } = props;
  const { field, message } = problem;
  return (
    <Span role="listitem" className="validation-summary__item">
      {field !== undefined && onFocusField ? (
        <Pressable className="validation-summary__problem validation-summary__jump" onClick={() => onFocusField(field)}>
          <Span className="validation-summary__message">{message}</Span>
          <Icon name="arrow-right" size={16} aria-hidden />
        </Pressable>
      ) : (
        <Span className="validation-summary__problem" tabIndex={-1}>{message}</Span>
      )}
    </Span>
  );
};

export { ValidationProblemRow };
