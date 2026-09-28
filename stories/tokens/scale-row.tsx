/* @layer stories @kind component */
import type { CSSProperties } from 'react';
import { Box, Text } from '../../src/primitives';
import { useComputedToken } from './use-computed-token';

type Specimen = 'shadow' | 'z' | 'duration' | 'easing' | 'transition';

const SPECIMEN_STYLE: Record<Specimen, (token: string) => CSSProperties> = {
  shadow: (token) => ({ boxShadow: `var(${token})` }),
  z: () => ({}),
  duration: (token) => ({ transitionDuration: `var(${token})` }),
  easing: (token) => ({ transitionTimingFunction: `var(${token})` }),
  transition: (token) => ({ transition: `var(${token})` }),
};

const ScaleRow = ({ token, specimen }: { token: string; specimen: Specimen }) => {
  const { ref, declared } = useComputedToken<HTMLElement>(token);
  const style = SPECIMEN_STYLE[specimen](token);
  return (
    <Box ref={ref} className="scale-row">
      <Text className="scale-row__name">{token}</Text>
      <Text className="scale-row__value">{declared}</Text>
      {specimen !== 'z' && (
        <Box className={`scale-row__track scale-row__track--${specimen}`}>
          <Box className={`scale-row__specimen scale-row__specimen--${specimen}`} style={style} />
        </Box>
      )}
      {specimen === 'z' && <Text className="scale-row__value">{`stacks above anything lower than ${declared}`}</Text>}
    </Box>
  );
};

export { ScaleRow };
export type { Specimen };
