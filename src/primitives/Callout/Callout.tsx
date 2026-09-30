/* @layer renderer-components @kind component */
import { Paragraph, Span } from '../text-elements';
import type { CalloutProps } from './Callout.type';
import './Callout.css';

const Callout = (props: CalloutProps) => {
  const { tone = 'primary', variant = 'box', icon, action, className = '', children } = props;

  return (
    <div role="note" className={`callout callout--${variant} callout--${tone}${className ? ` ${className}` : ''}`}>
      {icon != null && <Span className="callout__icon" aria-hidden>{icon}</Span>}
      <Paragraph tone={variant === 'box' ? 'dim' : 'muted'} className="callout__text">{children}</Paragraph>
      {action != null && <div className="callout__action">{action}</div>}
    </div>
  );
};

export { Callout };
