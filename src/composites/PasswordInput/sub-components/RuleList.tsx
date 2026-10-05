/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { HINT_ICON_SIZE } from '../PasswordInput.constants';
import type { RuleListProps } from './RuleList.type';

const RuleList = (props: RuleListProps) => {
  const { id, checks } = props;
  const { password } = useTesseraStrings();
  return (
    <Box as="ul" id={id} className="password-rules" aria-label={password.requirements}>
      {checks.map((check) => (
        <Box as="li" key={check.id} className="password-rules__item" data-met={check.met ? 'yes' : undefined}>
          <Icon name={check.met ? 'circle-check' : 'circle'} size={HINT_ICON_SIZE} />
          <Box as="span" aria-hidden="true">{check.label}</Box>
          <Box as="span" className="password-input__spoken">{password.ruleState(check.label, check.met ? password.met : password.notMet)}</Box>
        </Box>
      ))}
    </Box>
  );
};

export { RuleList };
