/* @layer stories @kind component */
import { Box } from '../../src/primitives';
import { useComputedToken } from './use-computed-token';
import type { TokenValueProps } from './TokenValue.type';
import './TokenValue.css';

const TokenValue = (props: TokenValueProps) => {
  const { token, format } = props;
  const { ref, declared } = useComputedToken<HTMLElement>(token);
  return <Box as="span" ref={ref} className="token-value">{format ? format(declared) : declared}</Box>;
};

export { TokenValue };
