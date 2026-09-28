/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Svg, SvgCircle, SvgGroup, SvgLine, SvgPath } from '../../../primitives/Svg';
import { BRAND_FAMILY } from '../../family.constants';
import type { BrandApp } from '../../brand.type';
import { CALLOUT_EDGE } from '../TesseraLogo.constants';
import { PATHS, VIEW_BOX } from './LogoArt.constants';
import type { LogoArtProps } from './LogoArt.type';

const inkOf = (app: BrandApp): CSSProperties => ({ '--tessera-logo-ink': BRAND_FAMILY[app].colour } as CSSProperties);

const LogoArt = (props: LogoArtProps) => {
  const { spots, isLit } = props;
  return (
    <Svg className="tessera-logo__art" viewBox={VIEW_BOX} role="group" aria-label="Tessera logo: a T laid from mosaic tiles, one coloured tile per project">
      <SvgGroup className="tessera-logo__leads">
        {spots.map(({ app, centre, side }) => (
          <SvgGroup key={app} className="tessera-logo__lead" data-lit={isLit(app) || undefined} style={inkOf(app)}>
            <SvgLine x1={CALLOUT_EDGE[side]} y1={centre.y} x2={centre.x} y2={centre.y} />
            <SvgCircle cx={centre.x} cy={centre.y} r={9} />
          </SvgGroup>
        ))}
      </SvgGroup>
      <SvgGroup className="tessera-logo__t">
        {PATHS.map((p, i) => {
          const app = p.group && p.group !== 'tessera' ? p.group : null;
          return app
            ? <SvgPath key={i} className="tessera-logo__tile" d={p.d} fill={p.ink} data-pick={app} tabIndex={0} role="button" aria-label={BRAND_FAMILY[app].name} />
            : <SvgPath key={i} className="tessera-logo__tile" d={p.d} fill={p.ink} />;
        })}
        {spots.map(({ app }) => {
          const tile = PATHS.find((p) => p.group === app);
          return tile && <SvgPath key={app} className="tessera-logo__glow" d={tile.d} fill={tile.ink} data-lit={isLit(app) || undefined} style={inkOf(app)} aria-hidden />;
        })}
      </SvgGroup>
    </Svg>
  );
};

export { LogoArt };
