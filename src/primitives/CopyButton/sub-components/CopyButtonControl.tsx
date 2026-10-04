/* @layer renderer-components @kind component */
import { Button } from '../../Button';
import { Glyph } from '../../Glyph';
import { IconButton } from '../../IconButton';
import type { CopyButtonControlProps } from '../CopyButton.type';

const CopyButtonControl = (props: CopyButtonControlProps) => {
  const { name, copied, onClick, showLabel = false, variant = 'ghost', size = 'sm', disabled, loading } = props;
  const icon = <Glyph name={copied ? 'check' : 'copy'} />;
  const shared = { variant, disabled, loading, onClick, 'data-copied': copied ? '' : undefined };
  return showLabel
    ? <Button {...shared} size={size === 'md' ? 'md' : 'sm'} icon={icon}>{name}</Button>
    : <IconButton {...shared} size={size} label={name} title={name}>{icon}</IconButton>;
};

export { CopyButtonControl };
