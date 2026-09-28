/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../primitives/Box';
import { PathIcon } from '../../primitives/PathIcon';
import { Text } from '../../primitives/Text';
import { SEARCH_ICON_PATHS } from './SearchSpark.constants';
import type { SearchSparkProps } from './SearchSpark.type';
import './SearchSpark.css';

const SearchSpark = (props: SearchSparkProps) => {
  const { size = 14, className = '' } = props;
  const style = { '--search-spark-size': `${size}px` } as CSSProperties;
  return (
    <Box as="span" className={`search-spark${className ? ` ${className}` : ''}`} style={style} aria-hidden="true">
      <PathIcon paths={SEARCH_ICON_PATHS} size={size} />
      <Text as="span" className="search-spark__star">✦</Text>
    </Box>
  );
};

export { SearchSpark };
