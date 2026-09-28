/* @layer stories @kind component */
import { Box, CodeBlock, Text } from '../../src/primitives';
import { OverviewPlayground } from './OverviewPlayground';
import type { OverviewPlaygroundProps } from './OverviewPlayground';
import type { ReactNode } from 'react';
import './overview.css';

interface OverviewVariant {
  title: string;
  node: ReactNode;
}

interface OverviewPageProps {
  name: string;
  description: string;
  variants: readonly OverviewVariant[];
  playground: OverviewPlaygroundProps | null;
  code: string | null;
}

const OverviewPage = (props: OverviewPageProps) => {
  const { name, description, variants, playground, code } = props;
  return (
    <Box className="overview">
      <Box as="header" className="overview__head">
        <Text as="h1" className="overview__name">{name}</Text>
        <Text as="p" className="overview__description">{description}</Text>
      </Box>
      {variants.length > 0 && (
      <Box as="section" className="overview__section">
        <Text as="h2" className="overview__heading">Variants</Text>
        {variants.map((variant) => (
          <Box key={variant.title} className="overview__variant">
            {variants.length > 1 && <Text className="overview__variant-title">{variant.title}</Text>}
            <Box className="overview__showcase">{variant.node}</Box>
          </Box>
        ))}
      </Box>
      )}
      {playground !== null && <OverviewPlayground {...playground} />}
      {playground === null && code !== null && (
      <Box as="section" className="overview__section">
        <Text as="h2" className="overview__heading">Code</Text>
        <CodeBlock code={code} language="tsx" showLineNumbers copyable />
      </Box>
      )}
    </Box>
  );
};

export { OverviewPage };
