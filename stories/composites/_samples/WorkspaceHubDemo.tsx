/* @layer stories @kind component */
import { useState } from 'react';
import { FloatingSwitch, WorkspaceScreen } from '../../../src/composites';
import { HUB_NAV, HUB_PAGES } from './hub';
import { useSwitches } from './hub-search';
import { HubPageBody } from './HubPageBody';
import { HubResults } from './HubResults';
import { ScreenDemo } from './ScreenDemo';
import { WORKSPACE_MODES } from './workspace-modes';

const WorkspaceHubDemo = (props: { compact?: boolean; withSwitch?: boolean }) => {
  const { compact = false, withSwitch = true } = props;
  const [active, setActive] = useState('general');
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('game');
  const [hidden, setHidden] = useState(false);
  const switches = useSwitches();
  const open = (id: string) => { setQuery(''); setActive(id); };
  const page = HUB_PAGES.find((p) => p.id === active);
  const floating = withSwitch ? <FloatingSwitch items={WORKSPACE_MODES} activeId={mode} onSelect={setMode} label="Workspace" /> : undefined;

  return (
    <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="Search for tray, players or session" narrow={compact}>
      <WorkspaceScreen
        title="Home"
        subtitle="Profile: mira"
        floating={floating}
        hidden={hidden}
        onClose={() => setHidden(true)}
        compact={compact}
        nav={{ config: HUB_NAV, activeId: active, onSelect: open, defaultOpen: !compact, search: { value: query, onChange: setQuery, placeholder: 'Search every setting' } }}
        results={<HubResults query={query} switches={switches} onOpen={open} />}
        page={{ icon: page?.icon, title: page?.label ?? active }}
      >
        <HubPageBody id={active} switches={switches} />
      </WorkspaceScreen>
    </ScreenDemo>
  );
};

export { WorkspaceHubDemo };
