/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { useConfirmAsk } from '../../ConfirmIconButton/behavior/useConfirmAsk';
import { ConfirmIconButtonQuestion } from '../../ConfirmIconButton/sub-components/ConfirmIconButtonQuestion';
import type { SettingsRowActionButtonProps } from './SettingsRowActionButton.type';

const SettingsRowActionButton = (props: SettingsRowActionButtonProps) => {
  const { action, disabled } = props;
  const ask = useConfirmAsk<true>({ onConfirm: action.onSelect });

  if (ask.asking !== null) {
    return (
      <ConfirmIconButtonQuestion
        className="settings-row__confirm"
        label={action.label}
        question={action.confirm}
        danger={action.tone === 'danger'}
        confirmLabel={action.label}
        ask={ask}
      />
    );
  }
  return (
    <Button
      size="sm"
      variant={action.tone === 'danger' ? 'danger' : 'secondary'}
      icon={action.icon}
      disabled={disabled || action.disabled === true}
      loading={action.loading === true}
      onClick={action.confirm === undefined ? action.onSelect : () => ask.ask(true)}
    >
      {action.label}
    </Button>
  );
};

export { SettingsRowActionButton };
