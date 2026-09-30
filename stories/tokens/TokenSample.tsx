/* @layer stories @kind component */
import { Box } from '../../src/primitives';
import type { TokenSampleProps } from './token-table.type';
import './TokenSample.css';

const TokenSample = ({ token, specimen }: TokenSampleProps) => {
  const value = `var(${token})`;
  if (specimen === 'size') return <Box className="token-sample token-sample--size" style={{ inlineSize: value }} />;
  if (specimen === 'radius') return <Box className="token-sample token-sample--radius" style={{ borderRadius: value }} />;
  if (specimen === 'gap') {
    return (
      <Box className="token-sample token-sample--gap" style={{ gap: value }}>
        <Box className="token-sample__block" />
        <Box className="token-sample__block" />
      </Box>
    );
  }
  return (
    <Box className={`token-sample token-sample--${specimen}`} style={specimen === 'padding' ? { padding: value } : undefined}>
      <Box className="token-sample__block" style={specimen === 'margin' ? { margin: value } : undefined} />
    </Box>
  );
};

export { TokenSample };
