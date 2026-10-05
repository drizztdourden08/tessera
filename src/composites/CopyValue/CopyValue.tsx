/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CopyButton } from '../CopyButton';
import { copyText } from './behavior/copy-text';
import { CopyValueText } from './sub-components/CopyValueText';
import type { CopyValueProps } from './CopyValue.type';
import '../../theme/visually-hidden.css';
import './CopyValue.css';

const CopyValue = (props: CopyValueProps) => {
  const { value, text, label, mono = false, truncate, copyLabel, copiedLabel, size = 'sm', onCopied, className } = props;
  const { common } = useTesseraStrings();
  const copied = copyText(value, text);
  const cls = ['copy-value', `copy-value--${size}`, truncate && `copy-value--${truncate}`, className].filter(Boolean).join(' ');
  return (
    <Box as="span" className={cls} data-mono={mono ? '' : undefined} role="group" aria-label={label}>
      <CopyValueText value={value} truncate={truncate} />
      {copied !== undefined && (
        <CopyButton
          text={copied}
          label={copyLabel ?? common.copyNamed(label ?? '')}
          copiedLabel={copiedLabel}
          size={size === 'md' ? 'sm' : 'xs'}
          onCopied={onCopied}
        />
      )}
    </Box>
  );
};

export { CopyValue };
