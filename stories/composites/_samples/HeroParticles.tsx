/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import './HeroParticles.css';

const DOTS = Array.from({ length: 12 }, (_, index) => index);

const HeroParticles = () => (
  <Box className="hero-particles">
    {DOTS.map((dot) => <Box key={dot} className="hero-particles__dot" />)}
  </Box>
);

export { HeroParticles };
