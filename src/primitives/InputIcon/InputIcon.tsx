/* @layer renderer-components @kind component */
import { Icon } from '../Icon';
import { inputIconData } from './behavior/input-icon-data';
import type { InputIconProps } from './InputIcon.type';
import './InputIcon.css';

const InputIcon = (props: InputIconProps) => {
  const { family: _family, name: _name, tone = 'color', className, ...look } = props;
  const icon = inputIconData(props);
  if (!icon) return null;
  const classes = ['input-icon', `input-icon--${tone}`, className].filter(Boolean).join(' ');
  return <Icon icon={icon} className={classes} {...look} />;
};

export { InputIcon };
