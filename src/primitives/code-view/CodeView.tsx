/* @layer renderer-components @kind component */
import { Highlight } from 'prism-react-renderer';
import { Box } from '../Box';
import { codeViewClass } from './code-view-class';
import { CODE_THEME } from './code-view.constants';
import { tokenClass } from './token-class';
import './CodeView.css';
import type { CodeViewProps } from './code-view.type';

const CodeView = (props: CodeViewProps) => {
  const { code, language, className = '', highlightedLines, showLineNumbers = false, wrap = false, capped = false, copy } = props;
  const highlighted = highlightedLines ? new Set(highlightedLines) : undefined;
  const cls = codeViewClass({ showLineNumbers, copyable: copy !== undefined, wrap, capped, className });
  return (
    <Box className={cls}>
      {copy}
      <Highlight code={code.trimEnd()} language={language} theme={CODE_THEME}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <Box as="pre" className="code-block__pre">
            <Box as="code" className="code-block__code">
              {tokens.map((line, lineIndex) => {
                const { style: lineStyle } = getLineProps({ line });
                const isChanged = highlighted?.has(lineIndex + 1) ?? false;
                return (
                  <Box
                    key={lineIndex}
                    as="div"
                    className={`code-block__line${isChanged ? ' code-block__line--changed' : ''}`}
                    style={lineStyle}
                  >
                    {showLineNumbers && <Box as="span" className="code-block__number" aria-hidden>{lineIndex + 1}</Box>}
                    {line.map((token, tokenIndex) => {
                      const { style: tokenStyle, children } = getTokenProps({ token });
                      return (
                        <Box key={tokenIndex} as="span" className={tokenClass(token.types)} style={tokenStyle}>
                          {children}
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Highlight>
    </Box>
  );
};

export { CodeView };
