/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { isIconName } from '../behavior/is-icon-name';
import { ICON_SIZES } from '../PatternInput.constants';
import type { AdornmentProps } from './PatternAdornment.type';

const PatternIcon = (props: AdornmentProps) => {
  const { field, name } = props;
  const size = ICON_SIZES[field.size];
  const custom = field.setup.icons?.[name];
  if (custom !== undefined) return <Icon icon={custom} size={size} className="pattern-input__icon" />;
  return isIconName(name) ? <Icon name={name} size={size} className="pattern-input__icon" /> : null;
};

export { PatternIcon };
