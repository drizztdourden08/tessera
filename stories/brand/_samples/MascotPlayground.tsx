/* @layer stories @kind component */
import { AnimatedMascot, BRAND_FAMILY, Mascot } from '../../../src/brand';
import type { MascotPlaygroundArgs } from './MascotPlayground.type';
import { useMascotTab } from './useMascotTab';

const MascotPlayground = (props: MascotPlaygroundArgs) => {
  const { animation, speed, loop, face, playing, variant, scale, lookX, lookY, limbLeft, limbRight } = props;
  const [brand] = useMascotTab();
  if (animation !== 'none') return <AnimatedMascot brand={brand} animation={animation} speed={speed} loop={loop} face={face} playing={playing} scale={scale} />;
  const own = BRAND_FAMILY[brand].mascot?.variants.some((v) => v.id === variant) ? variant : undefined;
  return (
    <Mascot
      brand={brand}
      variant={own}
      scale={scale}
      pose={{ look: [lookX, lookY], podAngles: { left: limbLeft, right: limbRight }, handAngles: { left: limbLeft, right: limbRight } }}
    />
  );
};

export { MascotPlayground };
