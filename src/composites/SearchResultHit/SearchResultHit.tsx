/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Icon } from '../../primitives/Icon';
import { Pressable } from '../../primitives/Pressable';
import { Span } from '../../primitives/text-elements';
import { PATH_ICON_SIZE } from './SearchResultHit.constants';
import { MatchText } from './sub-components/MatchText';
import type { SearchResultHitProps } from './SearchResultHit.type';
import './SearchResultHit.css';

const SearchResultHit = (props: SearchResultHitProps) => {
  const { label, description, path, icon, query = '', onOpen, className = '' } = props;
  return (
    <Pressable className={`search-result-hit${className ? ` ${className}` : ''}`} onClick={onOpen}>
      {icon != null && <Box as="span" className="search-result-hit__icon" aria-hidden="true">{icon}</Box>}
      <Box as="span" className="search-result-hit__text">
        <MatchText className="search-result-hit__label" text={label} query={query} />
        {description !== undefined && <MatchText className="search-result-hit__description" text={description} query={query} />}
      </Box>
      {path !== undefined && path.length > 0 && (
        <Span className="search-result-hit__path">
          {path.map((step, index) => (
            <Span key={`${index}-${step}`} className="search-result-hit__step">
              {index > 0 && <Icon name="chevron-right" size={PATH_ICON_SIZE} aria-hidden="true" />}
              {step}
            </Span>
          ))}
        </Span>
      )}
      <Icon name="arrow-right" size={PATH_ICON_SIZE} className="search-result-hit__go" aria-hidden="true" />
    </Pressable>
  );
};

export { SearchResultHit };
