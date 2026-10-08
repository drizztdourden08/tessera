/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Small, Span } from '../../../primitives/text-elements';
import { LoadError } from '../../LoadError';
import { isLoadProblem } from '../behavior/is-load-problem';
import { PROBLEM_ICON_SIZE } from '../SettingsRow.constants';
import type { SettingsRowProblemProps } from './SettingsRowProblem.type';

const SettingsRowProblem = ({ problem }: SettingsRowProblemProps) => {
  if (isLoadProblem(problem)) return <LoadError {...problem} variant="inline" className="settings-row__load-problem" />;
  return (
    <Small tone="danger" className="settings-row__problem" role="alert">
      <Icon name="circle-alert" size={PROBLEM_ICON_SIZE} className="settings-row__problem-icon" />
      <Span>{problem}</Span>
    </Small>
  );
};

export { SettingsRowProblem };
