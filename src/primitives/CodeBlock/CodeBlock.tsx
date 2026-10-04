/* @layer renderer-components @kind component */
import { Highlight } from 'prism-react-renderer';
import { Box } from '../Box';
import { CopyButton } from '../CopyButton';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { codeBlockClass } from './behavior/code-block-class';
import { tokenClass } from './behavior/token-class';
import { CODE_THEME } from './CodeBlock.constants';
import './CodeBlock.css';
import type { CodeBlockProps } from './CodeBlock.type';

const CodeBlock = (props: CodeBlockProps) => {
  const {
    code, language, className = '', highlightedLines, showLineNumbers = false, copyable = false, wrap = false, capped = false,
  } = props;
  const { fields } = useTesseraStrings();
  const highlighted = highlightedLines ? new Set(highlightedLines) : undefined;
  const text = code.trimEnd();
  const cls = codeBlockClass({ showLineNumbers, copyable, wrap, capped, className });
  return (
    <Box className={cls}>
      {copyable && <CopyButton text={text} label={fields.copyCode} className="code-block__copy" />}
      <Highlight code={text} language={language} theme={CODE_THEME}>
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

export { CodeBlock };
