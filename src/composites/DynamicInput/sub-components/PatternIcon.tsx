/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { isIconName } from '../../../primitives/Icon/behavior/is-icon-name';
import { ADORNMENT_ICON_SIZES } from '../../../primitives/field-control/input-adornment.constants';
import { InputAdornmentView } from '../../../primitives/field-control/InputAdornmentView';
import type { InputAdornmentIcon } from '../../../primitives/field-control/input-adornment.type';
import type { AdornmentProps } from './PatternAdornment.type';

const PatternIcon = (props: AdornmentProps) => {
  const { field, name } = props;
  const custom = field.setup.icons?.[name];
  let icon: InputAdornmentIcon = null;
  if (custom !== undefined) icon = <Icon icon={custom} size={ADORNMENT_ICON_SIZES[field.size]} />;
  else if (isIconName(name)) icon = name;
  if (icon === null) return null;
  return <InputAdornmentView className="dynamic-input__icon" adornment={{ icon }} size={field.size} />;
};

export { PatternIcon };
