/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import type { Ref } from 'react';

const useVideoElement = (ref: Ref<HTMLVideoElement> | undefined) => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);

  const attach = useCallback((node: HTMLVideoElement | null) => {
    setVideo(node);
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  }, [ref]);

  return { video, attach };
};

export { useVideoElement };
