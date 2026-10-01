/* @layer renderer-components @kind component */
import './EmptyState.css';
import { useTesseraOverride } from '../TesseraProvider/behavior/useTesseraOverride';
import type { EmptyStateProps } from './EmptyState.type';

const EmptyState = (props: EmptyStateProps) => {
  const { message, icon, action, className = '' } = props;
  const art = useTesseraOverride('emptyArt');
  const showsArt = icon === undefined && art != null;
  return (
    <div className={`empty-state${className ? ` ${className}` : ''}`}>
      {icon != null && <div className="empty-state__icon">{icon}</div>}
      {showsArt && <div className="empty-state__art">{art}</div>}
      <div className="empty-state__message">{message}</div>
      {action != null && <div className="empty-state__action">{action}</div>}
    </div>
  );
};

export { EmptyState };
