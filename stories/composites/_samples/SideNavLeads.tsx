/* @layer stories @kind story */
import { useState } from 'react';
import { SideNav } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';
import { LEAD_CONFIGS, LEAD_ROWS } from './side-nav-leads';
import type { LeadCase } from './side-nav-leads';

type LeadState = 'closed' | 'open';

const LEAD_STATES: readonly { key: LeadState; label: string }[] = [
  { key: 'closed', label: 'Closed' },
  { key: 'open', label: 'Open' },
];

const LeadNav = (props: { lead: LeadCase; state: LeadState }) => {
  const { lead, state } = props;
  const [active, setActive] = useState('sessions');
  const [query, setQuery] = useState('');
  return (
    <Box className="side-nav-story__lead" data-lead={lead} data-state={state}>
      <SideNav
        config={LEAD_CONFIGS[lead]}
        activeId={active}
        onSelect={setActive}
        defaultOpen={state === 'open'}
        search={lead === 'search' ? { value: query, onChange: setQuery, placeholder: 'Search sessions' } : undefined}
      />
    </Box>
  );
};

const SideNavLeads = () => (
  <Demonstrator rows={LEAD_ROWS} columns={LEAD_STATES} valign="start" cell={(lead, state) => <LeadNav lead={lead} state={state} />} />
);

export { SideNavLeads };
