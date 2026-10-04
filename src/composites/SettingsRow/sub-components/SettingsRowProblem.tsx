/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Small, Span } from '../../../primitives/text-elements';
import { PROBLEM_ICON_SIZE } from '../SettingsRow.constants';
import type { SettingsRowProblemProps } from './SettingsRowProblem.type';

const SettingsRowProblem = (props: SettingsRowProblemProps) => (
  <Small tone="danger" className="settings-row__problem" role="alert">
    <Icon name="circle-alert" size={PROBLEM_ICON_SIZE} className="settings-row__problem-icon" />
    <Span>{props.problem}</Span>
  </Small>
);

export { SettingsRowProblem };
