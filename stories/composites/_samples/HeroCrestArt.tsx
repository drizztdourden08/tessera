/* @layer stories @kind component */
import { Svg, SvgCircle, SvgPath } from '../../../src/primitives';

const HeroCrestArt = () => (
  <Svg className="hero-crest" viewBox="0 0 120 140" preserveAspectRatio="xMidYMax meet">
    <SvgPath className="hero-crest__shield" d="M60 4 L112 22 V70 C112 104 88 126 60 136 C32 126 8 104 8 70 V22 Z" />
    <SvgPath className="hero-crest__band" d="M8 58 H112 V78 H8 Z" />
    <SvgCircle className="hero-crest__gem" cx={60} cy={68} r={16} />
  </Svg>
);

export { HeroCrestArt };
