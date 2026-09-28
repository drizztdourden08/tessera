/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Pressable } from '../../../primitives/Pressable';
import { BrandMark } from '../../BrandMark';
import { BrandWordmark } from '../../BrandWordmark';
import { BRAND_FAMILY } from '../../family.constants';
import { pctX } from '../behavior/pct-x';
import { pctY } from '../behavior/pct-y';
import { CALLOUT_EDGE } from '../TesseraLogo.constants';
import type { LogoCalloutProps } from './LogoCallout.type';

const LogoCallout = (props: LogoCalloutProps) => {
  const { spot, isLit } = props;
  const { app, centre, side } = spot;
  const { name } = BRAND_FAMILY[app];
  const place: CSSProperties = side === 'left'
    ? { right: `calc(100% - ${pctX(CALLOUT_EDGE.left)})`, top: pctY(centre.y) }
    : { left: pctX(CALLOUT_EDGE.right), top: pctY(centre.y) };
  return (
    <Pressable className="tessera-logo__callout" data-pick={app} data-lit={isLit || undefined} style={place} aria-label={name}>
      <BrandMark app={app} tile title="" />
      <BrandWordmark app={app} title="" />
    </Pressable>
  );
};

export { LogoCallout };
