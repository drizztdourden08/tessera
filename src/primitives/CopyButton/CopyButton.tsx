/* @layer renderer-components @kind component */
import { useCopy } from '../TesseraProvider/behavior/useCopy';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
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
    <span className={className ? `copy-button ${className}` : 'copy-button'}>
      <CopyButtonControl {...props} name={copied ? done : (label ?? common.copyNamed(''))} copied={copied} onClick={onClick} />
      <span className="visually-hidden" role="status">{copied ? done : ''}</span>
    </span>
  );
};

export { CopyButton };
