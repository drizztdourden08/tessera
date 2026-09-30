/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { Em, Paragraph } from '../../../primitives/text-elements';
import { BrandMark } from '../../BrandMark';
import { BrandWordmark } from '../../BrandWordmark';
import { BRAND_FAMILY } from '../../family.constants';
import type { LogoDetailProps } from './LogoDetail.type';
import './LogoDetail.css';

const LogoDetail = (props: LogoDetailProps) => {
  const { spot, isOpen } = props;
  const { app, side } = spot;
  const b = BRAND_FAMILY[app];
  return (
    <Box as="section" className="tessera-logo__detail" data-side={side} data-open={isOpen || undefined} aria-label={b.name} aria-hidden={!isOpen}>
      <Box as="header" className="tessera-logo__detail-head">
        <BrandMark app={app} tile title="" />
        <Box className="tessera-logo__detail-title">
          <BrandWordmark app={app} />
          <Em>{b.kind}</Em>
        </Box>
        {b.mascot && <BrandMark app={app} variant="mascot" className="tessera-logo__mascot" title={`${b.name} mascot`} />}
      </Box>
      <Paragraph>{b.summary}</Paragraph>
      <Box as="dl">
        <Text as="dt">Its tile</Text>
        <Text as="dd">{b.placement}</Text>
        <Text as="dt">Its colour</Text>
        <Text as="dd">{b.colourName}</Text>
      </Box>
    </Box>
  );
};

export { LogoDetail };
