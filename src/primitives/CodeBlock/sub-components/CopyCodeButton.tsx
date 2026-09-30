/* @layer renderer-components @kind component */
import { useCallback, useEffect, useState } from 'react';
import { Glyph } from '../../Glyph';
import { IconButton } from '../../IconButton';
import { DONE_MS } from './CopyCodeButton.constants';
import type { CopyCodeButtonProps } from './CopyCodeButton.type';

const CopyCodeButton = (props: CopyCodeButtonProps) => {
  const { code } = props;
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return undefined;
    const timer = setTimeout(() => setDone(false), DONE_MS);
    return () => clearTimeout(timer);
  }, [done]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => setDone(true)).catch(() => setDone(false));
  }, [code]);

  return (
    <IconButton className="code-block__copy" variant="ghost" size="sm" label={done ? 'Copied' : 'Copy code'} onClick={handleCopy}>
      <Glyph name={done ? 'check' : 'copy'} />
    </IconButton>
  );
};

export { CopyCodeButton };
