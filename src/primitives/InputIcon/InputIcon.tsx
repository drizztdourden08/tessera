/* @layer renderer-components @kind component */
import { Icon } from '../Icon';
import { INPUT_ICON_FALLBACK } from './behavior/input-icon-fallback.constants';
import { inputIconData } from './behavior/input-icon-data';
import { isInputIconName } from './behavior/is-input-icon-name';
import { warnUnknownInputIcon } from './behavior/warn-unknown-input-icon';
import type { InputIconProps } from './InputIcon.type';
import './InputIcon.css';

const InputIcon = (props: InputIconProps) => {
  const { family, name, tone = 'color', className, ...look } = props;
  const known = isInputIconName(family, name);
  if (!known) warnUnknownInputIcon(family, name);
  const icon = inputIconData(known ? props : INPUT_ICON_FALLBACK);
  if (!icon) return null;
  const classes = ['input-icon', `input-icon--${tone}`, known ? null : 'input-icon--unknown', className].filter(Boolean).join(' ');
  return <Icon icon={icon} className={classes} {...look} />;
};

export { InputIcon };
