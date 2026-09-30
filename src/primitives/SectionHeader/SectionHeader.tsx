/* @layer renderer-components @kind component */
import './SectionHeader.css';
import { Span } from '../text-elements';
import type { SectionHeaderProps } from './SectionHeader.type';

const SectionHeader = (props: SectionHeaderProps) => {
  const { title, subtitle, action, className = '' } = props;
  return (
    <div className={`section-header${className ? ` ${className}` : ''}`}>
      <div className="section-header__text">
        <Span tone="dim" className="section-header__title">{title}</Span>
        {subtitle != null && <Span tone="muted" className="section-header__subtitle">{subtitle}</Span>}
      </div>
      {action != null && <div className="section-header__action">{action}</div>}
    </div>
  );
};

export { SectionHeader };
