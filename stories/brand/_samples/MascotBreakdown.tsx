/* @layer stories @kind component */
import { BRAND_FAMILY } from '../../../src/brand';
import type { BrandApp } from '../../../src/brand';
import { Stack, Text } from '../../../src/primitives';
import { AssemblySteps } from './AssemblySteps';
import { PieceTable } from './PieceTable';
import './MascotBreakdown.css';

interface MascotBreakdownProps {
  brand: BrandApp;
}

const MascotBreakdown = (props: MascotBreakdownProps) => {
  const { brand } = props;
  const { mascot, name } = BRAND_FAMILY[brand];
  if (!mascot) return null;
  return (
    <Stack gap="xl">
      {mascot.variants.map((variant) => (
        <Stack key={variant.id} gap="lg" className="mascot-breakdown">
          <Stack gap="xs">
            <Text variant="title">{`${name}: ${variant.name}`}</Text>
            <Text>{variant.summary}</Text>
          </Stack>
          <Text variant="subtitle">Each piece alone</Text>
          <PieceTable pieces={variant.pieces} />
          <Text variant="subtitle">The assembly, step by step</Text>
          <AssemblySteps scene={variant.compose()} />
        </Stack>
      ))}
    </Stack>
  );
};

export { MascotBreakdown };
