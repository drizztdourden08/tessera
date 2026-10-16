/* @layer stories @kind component */
import { Box } from '../../../../src/primitives';
import type { StudioEditorProps } from '../StudioLayout.type';
import { StudioGroups } from './StudioGroups';

const StudioEditor = (props: StudioEditorProps) => {
  const { label, toolbar, children } = props;
  return (
    <Box as="section" surface="sunken" aria-label={label} className="studio-layout__editor">
      {toolbar && toolbar.length > 0 && <StudioGroups groups={toolbar} className="studio-layout__toolbar" />}
      <Box className="studio-layout__surface">{children}</Box>
    </Box>
  );
};

export { StudioEditor };
