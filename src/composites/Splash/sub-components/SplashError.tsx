/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { SplashErrorProps } from './SplashError.type';

const SplashError = ({ raw }: SplashErrorProps) => {
  const { common } = useTesseraStrings();
  return (
    <Box as="details" className="ts-error">
      <Box as="summary">{common.details}</Box>
      <Box as="pre" className="ts-error__text" tabIndex={0}>{raw}</Box>
    </Box>
  );
};

export { SplashError };
