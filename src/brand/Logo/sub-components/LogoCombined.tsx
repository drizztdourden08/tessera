/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { BrandMark } from '../../BrandMark';
import { BrandWordmark } from '../../BrandWordmark';
import { BRAND_FAMILY } from '../../family.constants';
import { WORDMARK_SIZE_FOR } from '../Logo.constants';
import type { LogoCombinedProps } from '../Logo.type';
import './LogoCombined.css';

const LogoCombined = (props: LogoCombinedProps) => {
  const { brand = 'tessera', direction = 'inline', size = 'md', variant, rim, ground, title, className = '' } = props;
  const label = title ?? BRAND_FAMILY[brand].name;
  return (
    <Box
      as="span"
      className={`logo-combined logo-combined--${direction}${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={label}
    >
      <BrandMark app={brand} size={size} variant={variant} rim={rim} ground={ground} title={label} />
      <BrandWordmark app={brand} size={WORDMARK_SIZE_FOR[size]} rim={rim} title={label} />
    </Box>
  );
};

export { LogoCombined };
