/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { ChosenMascot } from '../../../src/brand';
import type { AnimatedMascotBrand } from '../../../src/brand';
import { Span } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';
import { MASCOT_NAME_OF } from './mascot-poses.constants';

interface MascotPicksProps {
  brand: AnimatedMascotBrand;
}

const PICK_WAYS = [
  { key: 'name', label: 'by name' },
  { key: 'brand', label: 'auto, by brand' },
  { key: 'palette', label: 'auto, inside data-palette' },
] as const;

type PickWay = (typeof PICK_WAYS)[number]['key'];

const pickCell = (brand: AnimatedMascotBrand, way: PickWay): ReactNode => {
  if (way === 'name') return <ChosenMascot mascot={MASCOT_NAME_OF[brand]} animation="scan" scale={3} />;
  if (way === 'brand') return <ChosenMascot mascot="auto" brand={brand} animation="scan" scale={3} />;
  return <Span data-palette={brand}><ChosenMascot animation="wave" scale={3} /></Span>;
};

const MascotPicks = (props: MascotPicksProps) => {
  const { brand } = props;
  return (
    <Demonstrator
      rows={[{ key: brand, label: `${brand}: ${MASCOT_NAME_OF[brand]}` }]}
      columns={PICK_WAYS}
      cell={pickCell}
    />
  );
};

export { MascotPicks };
