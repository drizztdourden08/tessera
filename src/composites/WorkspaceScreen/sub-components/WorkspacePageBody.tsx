/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { SettingsSection } from '../../SettingsSection';
import { useFlashScroll } from '../behavior/useFlashScroll';
import { NO_SECTIONS } from '../WorkspaceScreen.constants';
import type { WorkspacePageBodyProps } from './WorkspacePageBody.type';

const WorkspacePageBody = (props: WorkspacePageBodyProps) => {
  const { page, flash, compactRows, readOnly, renderLock } = props;
  const ref = useRef<HTMLDivElement>(null);
  useFlashScroll(ref, flash, page.id);
  return (
    <Box ref={ref} className="workspace-screen__body">
      {page.content}
      {(page.sections ?? NO_SECTIONS).map((section) => (
        <SettingsSection key={section.id} {...section} flash={flash} compact={compactRows} readOnly={readOnly} renderLock={renderLock} />
      ))}
    </Box>
  );
};

export { WorkspacePageBody };
