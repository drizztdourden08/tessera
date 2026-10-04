/* @layer stories @kind component */
import { Box, Callout, Icon, Strong, Text } from '../../../src/primitives';
import type { OverviewHeadProps } from './description.type';
import { Markup } from './Markup';
import './description.css';

const OverviewHead = (props: OverviewHeadProps) => {
  const { name, description, points, instead } = props;
  return (
    <Box as="header" className="overview__head">
      <Text as="h1" className="overview__name">{name}</Text>
      <Text as="p" className="overview__lead"><Markup text={description} /></Text>
      {points.length > 0 && (
      <Box as="ul" className="overview__points">
        {points.map((point) => <Text as="li" key={point} className="overview__point"><Markup text={point} /></Text>)}
      </Box>
      )}
      {instead !== null && (
      <Callout tone="secondary" icon={<Icon name="arrow-right" />} className="overview__instead">
        <Strong>Use instead</Strong> <Markup text={instead} />
      </Callout>
      )}
    </Box>
  );
};

export { OverviewHead };
