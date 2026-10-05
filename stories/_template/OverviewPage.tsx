/* @layer stories @kind component */
import { CodeBlock } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { OverviewHead } from './description/OverviewHead';
import { OverviewPlayground } from './OverviewPlayground';
import { StatesSection } from './states/StatesSection';
import type { OverviewStates } from './states/states.type';
import type { OverviewPlaygroundProps } from './OverviewPlayground';
import type { ReactNode } from 'react';
import './overview.css';

interface OverviewVariant {
  title: string;
  node: ReactNode;
}

interface OverviewSection {
  title: string;
  node: ReactNode;
}

interface OverviewPageProps {
  name: string;
  description: string;
  points: readonly string[];
  instead: string | null;
  variants: readonly OverviewVariant[];
  sections: readonly OverviewSection[];
  switcher: ReactNode;
  states: OverviewStates | null;
  playground: OverviewPlaygroundProps | null;
  code: string | null;
}

const OverviewPage = (props: OverviewPageProps) => {
  const { name, description, points, instead, variants, sections, switcher, states, playground, code } = props;
  return (
    <Box className="overview">
      <OverviewHead name={name} description={description} points={points} instead={instead} />
      {switcher}
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
      {sections.map((section) => (
      <Box as="section" key={section.title} className="overview__section">
        <Text as="h2" className="overview__heading">{section.title}</Text>
        {section.node}
      </Box>
      ))}
      {states !== null && <StatesSection {...states} />}
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
export type { OverviewSection };
