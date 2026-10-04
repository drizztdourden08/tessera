/* @layer stories @kind component */
import { Box, Svg, SvgCircle, SvgGroup, SvgPath } from '../../../src/primitives';

const CLOUD = 'M0 40 a30 30 0 0 1 46 -26 a40 40 0 0 1 74 6 a26 26 0 0 1 20 20 Z';

const CLOUDS = [
  { id: 'a', x: 180, y: 70, scale: 1.4 },
  { id: 'b', x: 760, y: 130, scale: 1 },
  { id: 'c', x: 1240, y: 60, scale: 1.2 },
] as const;

const HILLS = [
  { id: 'far', d: 'M0 360 C200 300 380 330 560 340 S940 270 1180 320 S1480 300 1600 310 V600 H0 Z' },
  { id: 'mid', d: 'M0 430 C240 380 420 410 640 430 S1060 360 1300 410 S1520 420 1600 400 V600 H0 Z' },
  { id: 'near', d: 'M0 500 C300 460 520 500 820 512 S1300 470 1600 490 V600 H0 Z' },
] as const;

const HeroHillsScene = () => (
  <Box className="hero-scene">
    <Svg className="hero-scene__svg" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice">
      <SvgCircle className="hero-scene__sun" cx={1180} cy={170} r={70} />
      {CLOUDS.map((cloud) => (
        <SvgGroup key={cloud.id} className={`hero-scene__cloud hero-scene__cloud--${cloud.id}`}>
          <SvgPath d={CLOUD} transform={`translate(${cloud.x} ${cloud.y}) scale(${cloud.scale})`} />
        </SvgGroup>
      ))}
      {HILLS.map((hill) => <SvgPath key={hill.id} className={`hero-scene__hill hero-scene__hill--${hill.id}`} d={hill.d} />)}
    </Svg>
  </Box>
);

export { HeroHillsScene };
