/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { BrandMark } from '../../BrandMark';
import { BrandWordmark } from '../../BrandWordmark';
import { BRAND_FAMILY } from '../../family.constants';
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
