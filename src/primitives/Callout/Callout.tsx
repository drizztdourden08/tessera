/* @layer renderer-components @kind component */
import { Paragraph, Span } from '../text-elements';
import type { CalloutProps } from './Callout.type';
import './Callout.css';

const Callout = (props: CalloutProps) => {
  const { tone = 'primary', variant = 'box', icon, action, details, className = '', children } = props;
  const classes = ['callout', `callout--${variant}`, `callout--${tone}`, details != null && 'callout--details', className].filter(Boolean).join(' ');

  return (
    <div role="note" className={classes}>
      {icon != null && <Span className="callout__icon" aria-hidden>{icon}</Span>}
      <Paragraph tone={variant === 'box' ? 'dim' : 'muted'} className="callout__text">{children}</Paragraph>
      {action != null && <div className="callout__action">{action}</div>}
      {details != null && <div className="callout__details">{details}</div>}
    </div>
  );
};

export { Callout };
