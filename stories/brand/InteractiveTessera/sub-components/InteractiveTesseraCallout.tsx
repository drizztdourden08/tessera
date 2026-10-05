/* @layer stories @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../../../src/primitives/Box';
import { Pressable } from '../../../../src/primitives/Pressable';
import { BrandMark } from '../../../../src/brand/BrandMark';
import { BrandWordmark } from '../../../../src/brand/BrandWordmark';
import { BRAND_FAMILY } from '../../../../src/brand/family.constants';
import { pctX } from '../behavior/pct-x';
import { pctY } from '../behavior/pct-y';
import { CALLOUT_EDGE } from '../InteractiveTessera.constants';
import type { InteractiveTesseraCalloutProps } from './InteractiveTesseraCallout.type';

const InteractiveTesseraCallout = (props: InteractiveTesseraCalloutProps) => {
  const { spot, isLit } = props;
  const { app, centre, side } = spot;
  const { name } = BRAND_FAMILY[app];
  const place: CSSProperties = side === 'left'
    ? { right: `calc(100% - ${pctX(CALLOUT_EDGE.left)})`, top: pctY(centre.y) }
    : { left: pctX(CALLOUT_EDGE.right), top: pctY(centre.y) };
  return (
    <Pressable className="interactive-tessera__callout" data-pick={app} data-side={side} data-lit={isLit || undefined} style={place} aria-label={name}>
      <BrandMark app={app} variant="app-icon" title="" />
      <Box as="span" className="interactive-tessera__name">
        <BrandWordmark app={app} title="" />
      </Box>
    </Pressable>
  );
};

export { InteractiveTesseraCallout };
