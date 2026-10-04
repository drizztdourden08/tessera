/* @layer renderer-components @kind component */
import './EmptyState.css';
import { useTesseraOverride } from '../TesseraProvider/behavior/useTesseraOverride';
import type { EmptyStateProps } from './EmptyState.type';

const EmptyState = (props: EmptyStateProps) => {
  const { message, title, hint, icon, action, size = 'md', className = '' } = props;
  const art = useTesseraOverride('emptyArt');
  const showsArt = icon === undefined && art != null;
  return (
    <div className={`empty-state empty-state--${size}${className ? ` ${className}` : ''}`}>
      {icon != null && <div className="empty-state__icon">{icon}</div>}
      {showsArt && <div className="empty-state__art">{art}</div>}
      {title != null && <div className="empty-state__title">{title}</div>}
      <div className="empty-state__message">{message}</div>
      {action != null && <div className="empty-state__action">{action}</div>}
      {hint != null && <div className="empty-state__hint">{hint}</div>}
    </div>
  );
};

export { EmptyState };
