/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { BrandScene } from '../BrandScene';
import { BRAND_FAMILY } from '../family.constants';
import { mascotTitle } from './behavior/mascot-title';
import { pickMascotVariant } from './behavior/pick-mascot-variant';
import type { MascotProps } from './Mascot.type';
import './Mascot.css';

const Mascot = (props: MascotProps) => {
  const { brand = 'rotp', variant, pose, size = 'md', scale, title, className = '' } = props;
  const { mascot } = BRAND_FAMILY[brand];
  const chosen = mascot && pickMascotVariant(mascot, variant);
  const scene = useMemo(() => chosen?.compose(pose), [chosen, pose]);
  if (!mascot || !chosen || !scene) return null;
  const cls = ['mascot', scale === undefined ? `mascot--${size}` : '', className].filter(Boolean).join(' ');
  return <BrandScene scene={scene} scale={scale} title={title ?? mascotTitle(mascot, chosen)} className={cls} />;
};

export { Mascot };
