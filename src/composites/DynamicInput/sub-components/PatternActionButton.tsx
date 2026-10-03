/* @layer renderer-components @kind component */
import { isIconName } from '../../../primitives/Icon/behavior/is-icon-name';
import { InputAdornmentView } from '../../../primitives/field-control/InputAdornmentView';
import { FALLBACK_ACTION_ICON } from '../DynamicInput.constants';
import type { AdornmentProps } from './PatternAdornment.type';

const PatternActionButton = (props: AdornmentProps) => {
  const { field, name } = props;
  const action = field.setup.actions?.[name];
  if (action === undefined) return null;
  const icon = action.icon ?? (isIconName(name) ? name : FALLBACK_ACTION_ICON);

  return (
    <InputAdornmentView
      className="dynamic-input__action"
      adornment={{ icon, label: action.label, onClick: () => action.onPress(field.value) }}
      size={field.size}
      disabled={field.disabled || action.disabled === true}
    />
  );
};

export { PatternActionButton };
