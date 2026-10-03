/* @layer stories @kind component */
import { useState } from 'react';
import { FloatingSwitch, WorkspaceScreen } from '../../../src/composites';
import { ScreenDemo } from './ScreenDemo';
import { useSampleSettings } from './settings-sample-state';
import { workspaceSample } from './workspace-sample';
import { WORKSPACE_MODES } from './workspace-modes';

interface WorkspaceDemoProps {
  narrow?: boolean;
  withSwitch?: boolean;
  pageHeader?: boolean;
  compactRows?: boolean;
  readOnly?: boolean;
  search?: boolean;
  startPage?: string;
  query?: string;
}

const WorkspaceDemo = (props: WorkspaceDemoProps) => {
  const { narrow, withSwitch, search, startPage, query, ...look } = props;
  const [mode, setMode] = useState('game');
  const [hidden, setHidden] = useState(false);
  const [typed, setTyped] = useState(query ?? '');
  const state = useSampleSettings();
  const floating = withSwitch === true ? <FloatingSwitch items={WORKSPACE_MODES} activeId={mode} onSelect={setMode} label="Workspace" /> : undefined;

  return (
    <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="Search for tray, volume or colour" narrow={narrow === true}>
      <WorkspaceScreen
        title="Settings"
        subtitle="Profile: mira"
        floating={floating}
        hidden={hidden}
        onClose={() => setHidden(true)}
        narrow={narrow}
        content={workspaceSample(state)}
        defaultActiveId={startPage ?? 'general'}
        search={search === false ? false : { query: typed, onQueryChange: setTyped }}
        {...look}
      />
    </ScreenDemo>
  );
};

export { WorkspaceDemo };
