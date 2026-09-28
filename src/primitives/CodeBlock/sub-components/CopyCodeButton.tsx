/* @layer renderer-components @kind component */
import { useCallback, useEffect, useState } from 'react';
import { PathIcon } from '../../PathIcon';
import { IconButton } from '../../IconButton';
import { COPY_PATHS, DONE_MS, DONE_PATHS } from './CopyCodeButton.constants';
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
      <PathIcon paths={done ? DONE_PATHS : COPY_PATHS} fillRule="evenodd" />
    </IconButton>
  );
};

export { CopyCodeButton };
