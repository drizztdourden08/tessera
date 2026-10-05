/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { CapsLockHint } from './CapsLockHint';
import { RuleList } from './RuleList';
import { StrengthMeter } from './StrengthMeter';
import type { PasswordNotesProps } from './PasswordNotes.type';

const PasswordNotes = (props: PasswordNotesProps) => {
  const { field, capsLockWarning } = props;
  const { report, rules, rulesId, caps } = field;
  const checked = rules.length > 0 || report.score !== null;
  return (
    <>
      {capsLockWarning && <CapsLockHint on={caps.on} />}
      {report.score !== null && <StrengthMeter score={report.score} level={report.level} />}
      {rules.length > 0 && <RuleList id={rulesId} checks={report.checks} />}
      {checked && <Box as="span" className="password-input__spoken" role="status">{report.announcement}</Box>}
    </>
  );
};

export { PasswordNotes };
