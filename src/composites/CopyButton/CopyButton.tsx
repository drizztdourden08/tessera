/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useCopy } from '../../primitives/TesseraProvider/behavior/useCopy';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CopyButtonControl } from './sub-components/CopyButtonControl';
import type { CopyButtonProps } from './CopyButton.type';
import '../../theme/visually-hidden.css';
import './CopyButton.css';

const CopyButton = (props: CopyButtonProps) => {
  const { text, label, copiedLabel, onCopied, className } = props;
  const { copied, copy } = useCopy();
  const { common } = useTesseraStrings();
  const done = copiedLabel ?? common.copied;
  const onClick = () => {
    void copy(typeof text === 'function' ? text() : text).then((ok) => { if (ok) onCopied?.(); });
  };
  return (
    <Box as="span" className={className ? `copy-button ${className}` : 'copy-button'}>
      <CopyButtonControl {...props} name={copied ? done : (label ?? common.copyNamed(''))} copied={copied} onClick={onClick} />
      <Box as="span" className="visually-hidden" role="status">{copied ? done : ''}</Box>
    </Box>
  );
};

export { CopyButton };
