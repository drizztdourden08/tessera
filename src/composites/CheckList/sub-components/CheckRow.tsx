/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Spinner } from '../../../primitives/Spinner';
import { Span } from '../../../primitives/text-elements';
import type { CheckRowProps } from '../CheckList.type';

const CheckRow = (props: CheckRowProps) => {
  const { check, statuses } = props;
  const { label, state, detail, action } = check;
  const def = statuses[state];
  return (
    <Box as="li" className="check-list__row" data-state={state}>
      {def.icon ? (
        <Span className="check-list__mark" data-tone={def.tone} role="img" aria-label={def.label}><Icon name={def.icon} size={18} aria-hidden /></Span>
      ) : (
        <Span className="check-list__mark" data-tone={def.tone}><Spinner size="sm" label={def.label} /></Span>
      )}
      <Span className="check-list__text">
        <Span className="check-list__label">{label}</Span>
        {detail !== undefined && detail !== null && <Span className="check-list__detail">{detail}</Span>}
      </Span>
      {action !== undefined && action !== null && <Box className="check-list__action">{action}</Box>}
    </Box>
  );
};

export { CheckRow };
