/* @layer renderer-components @kind component */
import { Highlight } from 'prism-react-renderer';
import { Box } from '../Box';
import { codeBlockClass } from './behavior/code-block-class';
import { CODE_THEME } from './CodeBlock.constants';
import { CopyCodeButton } from './sub-components/CopyCodeButton';
import './CodeBlock.css';
import type { CodeBlockProps } from './CodeBlock.type';

const CodeBlock = (props: CodeBlockProps) => {
  const {
    code, language, className = '', highlightedLines, showLineNumbers = false, copyable = false, wrap = false, capped = false,
  } = props;
  const highlighted = highlightedLines ? new Set(highlightedLines) : undefined;
  const text = code.trimEnd();
  const cls = codeBlockClass({ showLineNumbers, copyable, wrap, capped, className });
  return (
    <Box className={cls}>
      {copyable && <CopyCodeButton code={text} />}
      <Highlight code={text} language={language} theme={CODE_THEME}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <Box as="pre" className="code-block__pre">
            <Box as="code" className="code-block__code">
              {tokens.map((line, lineIndex) => {
                const { className: lineClassName, style: lineStyle } = getLineProps({ line });
                const isChanged = highlighted?.has(lineIndex + 1) ?? false;
                return (
                  <Box
                    key={lineIndex}
                    as="div"
                    className={
                      `code-block__line${lineClassName ? ` ${lineClassName}` : ''}${isChanged ? ' code-block__line--changed' : ''}`
                    }
                    style={lineStyle}
                  >
                    {showLineNumbers && <Box as="span" className="code-block__number" aria-hidden>{lineIndex + 1}</Box>}
                    {line.map((token, tokenIndex) => {
                      const { className: tokenClassName, style: tokenStyle, children } = getTokenProps({ token });
                      return (
                        <Box key={tokenIndex} as="span" className={tokenClassName} style={tokenStyle}>
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

export { CodeBlock };
