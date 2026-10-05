/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { HIT_AREA_CLASS } from '../../../primitives/dom/hit-area.constants';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { COPY_ICON_SIZE } from '../CopyButton.constants';
import type { CopyButtonControlProps } from '../CopyButton.type';

const CopyButtonControl = (props: CopyButtonControlProps) => {
  const { name, copied, onClick, showLabel = false, variant = 'ghost', size = 'sm', disabled, loading } = props;
  const icon = <Icon name={copied ? 'check' : 'copy'} size={showLabel ? undefined : COPY_ICON_SIZE[size]} />;
  const shared = { variant, disabled, loading, onClick, 'data-copied': copied ? '' : undefined };
  return showLabel
    ? <Button {...shared} size={size === 'md' ? 'md' : 'sm'} icon={icon}>{name}</Button>
    : <IconButton {...shared} size={size} className={size === 'xs' ? HIT_AREA_CLASS : undefined} label={name} title={name}>{icon}</IconButton>;
};

export { CopyButtonControl };
