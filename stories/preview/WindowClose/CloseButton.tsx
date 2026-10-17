/* @layer stories @kind component */
import { Icon, IconButton, Pressable, Shortcut, Span, Tooltip, useTesseraStrings } from '../../../src/primitives';
import type { CloseButtonProps } from './window-close.type';

const CloseButton = ({ look, onClose }: CloseButtonProps) => {
  const { common } = useTesseraStrings();
  const tip = (
    <Span className="window-close__tip">
      {common.close}
      <Shortcut keys="esc" size="xs" />
    </Span>
  );
  const button = look === 'corner'
    ? <Pressable className="collapse-toggle window-close__corner" aria-label={common.close} onClick={onClose}><Icon name="x" size={14} /></Pressable>
    : (
      <IconButton variant="ghost" size={look === 'joined' ? 'sm' : 'md'} label={common.close} className={`window-close__x window-close__x--${look}`} onClick={onClose}>
        <Icon name="x" size={look === 'joined' ? 16 : 20} />
      </IconButton>
    );
  return <Tooltip content={tip} placement="bottom" className={`window-close__anchor window-close__anchor--${look}`}>{button}</Tooltip>;
};

export { CloseButton };
