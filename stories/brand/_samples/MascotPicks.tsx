/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { AnimatedMascot, BRAND_FAMILY } from '../../../src/brand';
import type { AnimatedMascotBrand } from '../../../src/brand';
import { Span } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';

interface MascotPicksProps {
  brand: AnimatedMascotBrand;
}

const PICK_WAYS = [
  { key: 'brand', label: 'by brand' },
  { key: 'palette', label: 'auto, inside data-palette' },
  { key: 'none', label: 'auto, a palette without a mascot' },
] as const;

type PickWay = (typeof PICK_WAYS)[number]['key'];

const pickCell = (brand: AnimatedMascotBrand, way: PickWay): ReactNode => {
  if (way === 'brand') return <AnimatedMascot brand={brand} animation="scan" scale={3} />;
  if (way === 'palette') return <Span data-palette={brand}><AnimatedMascot brand="auto" animation="wave" scale={3} /></Span>;
  return <Span data-palette="tessera"><AnimatedMascot brand="auto" animation="wave" scale={3} /></Span>;
};

const MascotPicks = (props: MascotPicksProps) => {
  const { brand } = props;
  return (
    <Demonstrator
      rows={[{ key: brand, label: `${brand}: ${BRAND_FAMILY[brand].mascot?.name ?? brand}` }]}
      columns={PICK_WAYS}
      cell={pickCell}
    />
  );
};

export { MascotPicks };
