/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../primitives/Box';
import type { BrandApp } from '../brand.type';
import { tileSpots } from './behavior/tile-spots';
import { useInteractiveTesseraPick } from './behavior/useInteractiveTesseraPick';
import { LogoArt } from './sub-components/LogoArt';
import { LogoCallout } from './sub-components/LogoCallout';
import { LogoDetail } from './sub-components/LogoDetail';
import { STAGE_STYLE } from './InteractiveTessera.constants';
import type { InteractiveTesseraProps } from './InteractiveTessera.type';
import './InteractiveTessera.css';

const InteractiveTessera = (props: InteractiveTesseraProps) => {
  const { selected, defaultSelected, onSelect, className = '' } = props;
  const { picked, pointed, handlers } = useInteractiveTesseraPick({ selected, defaultSelected, onSelect });
  const spots = useMemo(() => tileSpots(), []);
  const side = spots.find((s) => s.app === picked)?.side;
  const isLit = (app: BrandApp) => app === picked || app === pointed;

  return (
    <Box className={`interactive-tessera${className ? ` ${className}` : ''}`} data-picked={picked ?? undefined} data-side={side} {...handlers}>
      <Box className="interactive-tessera__stage" style={STAGE_STYLE}>
        <LogoArt spots={spots} isLit={isLit} />
        {spots.map((spot) => <LogoCallout key={spot.app} spot={spot} isLit={isLit(spot.app)} />)}
        {spots.map((spot) => <LogoDetail key={spot.app} spot={spot} isOpen={spot.app === picked} />)}
      </Box>
    </Box>
  );
};

export { InteractiveTessera };
