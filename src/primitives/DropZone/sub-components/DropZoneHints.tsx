/* @layer renderer-components @kind component */
import type { DropZoneHintsProps } from './DropZoneHints.type';

const DropZoneHints = (props: DropZoneHintsProps) => {
  const { hint } = props;
  return (
    <>
      {hint && <span className="dropzone__hint">{hint}</span>}
      <span className="dropzone__hint" style={{ marginTop: '2px', opacity: 0.6 }}>or click to browse files</span>
    </>
  );
};

export { DropZoneHints };
