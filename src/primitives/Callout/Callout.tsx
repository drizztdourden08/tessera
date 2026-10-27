/* @layer renderer-components @kind component */
import { Span } from '../text-elements';
import { Text } from '../Text';
import type { CalloutProps } from './Callout.type';
import './Callout.css';

const Callout = (props: CalloutProps) => {
  const { tone = 'primary', variant = 'box', title, icon, action, details, className = '', children } = props;
  const classes = ['callout', `callout--${variant}`, `callout--${tone}`, details != null && 'callout--details', className].filter(Boolean).join(' ');

  const text = <Text as="div" tone={variant === 'box' ? 'dim' : 'muted'} className="callout__text">{children}</Text>;

  return (
    <div role="note" className={classes}>
      {icon != null && <Span className="callout__icon" aria-hidden>{icon}</Span>}
      {title != null ? <div className="callout__body"><div className="callout__title">{title}</div>{text}</div> : text}
      {action != null && <div className="callout__action">{action}</div>}
      {details != null && <div className="callout__details">{details}</div>}
    </div>
  );
};

export { Callout };
