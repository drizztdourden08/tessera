/* @layer renderer-components @kind component */
import './SectionHeader.css';
import { Badge } from '../Badge';
import { TextElement } from '../TextElement';
import { Span } from '../text-elements';
import type { SectionHeaderProps } from './SectionHeader.type';

const SectionHeader = (props: SectionHeaderProps) => {
  const { title, subtitle, action, count, level = 3, className = '' } = props;
  return (
    <div className={`section-header${className ? ` ${className}` : ''}`}>
      <div className="section-header__text">
        <TextElement as={`h${level}`} tone="dim" className="section-header__title">
          {title}
          {count !== undefined && <Badge variant="inline" value={count} color="tame" className="section-header__count" />}
        </TextElement>
        {subtitle != null && <Span tone="muted" className="section-header__subtitle">{subtitle}</Span>}
      </div>
      {action != null && <div className="section-header__action">{action}</div>}
    </div>
  );
};

export { SectionHeader };
