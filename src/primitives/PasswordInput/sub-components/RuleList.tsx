/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { HINT_ICON_SIZE } from '../PasswordInput.constants';
import type { RuleListProps } from './RuleList.type';

const RuleList = (props: RuleListProps) => {
  const { id, checks } = props;
  const { password } = useTesseraStrings();
  return (
    <ul id={id} className="password-rules" aria-label={password.requirements}>
      {checks.map((check) => (
        <li key={check.id} className="password-rules__item" data-met={check.met ? 'yes' : undefined}>
          <Icon name={check.met ? 'circle-check' : 'circle'} size={HINT_ICON_SIZE} />
          <span aria-hidden="true">{check.label}</span>
          <span className="password-input__spoken">{password.ruleState(check.label, check.met ? password.met : password.notMet)}</span>
        </li>
      ))}
    </ul>
  );
};

export { RuleList };
