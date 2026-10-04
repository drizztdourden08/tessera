/* @layer stories @kind component */
import { AnimatedMascot, BRAND_FAMILY, Mascot } from '../../../src/brand';
import type { AnimatedMascotBrand } from '../../../src/brand';
import { Card, Flex, Stack, Text } from '../../../src/primitives';

interface BrandMascotRowProps {
  app: AnimatedMascotBrand;
}

const BrandMascotRow = (props: BrandMascotRowProps) => {
  const { app } = props;
  const brand = BRAND_FAMILY[app];
  const name = brand.mascot?.name ?? app;
  return (
    <Card className="brand-family__card">
      <Flex gap="lg" align="center" wrap>
        <Mascot brand={app} size="xl" title={`${name}, the ${brand.name} mascot`} />
        <Mascot brand={app} size="lg" title="" />
        <Mascot brand={app} size="md" title="" />
        <Mascot brand={app} size="sm" title="" />
        <AnimatedMascot brand={app} animation="idle" scale={3} className="brand-family__mascot" />
      </Flex>
      <Stack gap="xs">
        <Text variant="title">{`${name}, for ${brand.name}`}</Text>
        <Text variant="caption">{`import { AnimatedMascot, Mascot } from '@drizztdourden08/tessera/brand';  <Mascot brand="${app}" />  <AnimatedMascot brand="${app}" animation="idle" />`}</Text>
      </Stack>
    </Card>
  );
};

export { BrandMascotRow };
