/* @layer stories @kind story */
import { useState } from 'react';
import { SideNav } from '../../../src/composites';
import type { SideNavVariant } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';
import { SCROLL_CONFIG } from './side-nav-scroll';

type ScrollState = 'closed' | 'open';

const SCROLL_STATES: readonly { key: ScrollState; label: string }[] = [
  { key: 'closed', label: 'Closed' },
  { key: 'open', label: 'Open' },
];

const SCROLL_VARIANTS: readonly { key: SideNavVariant; label: string }[] = [
  { key: 'panel', label: 'Panel' },
  { key: 'rail', label: 'Rail' },
];

const ScrollNav = (props: { variant: SideNavVariant; state: ScrollState }) => {
  const { variant, state } = props;
  const [active, setActive] = useState('presets');
  return (
    <Box className="side-nav-story__scroll" data-variant={variant} data-state={state}>
      <SideNav
        variant={variant}
        collapsed={state === 'closed'}
        defaultOpen={state === 'open'}
        config={SCROLL_CONFIG}
        activeId={active}
        onSelect={setActive}
      />
    </Box>
  );
};

const SideNavScroll = () => (
  <Demonstrator
    rows={SCROLL_VARIANTS}
    columns={SCROLL_STATES}
    valign="start"
    cell={(variant, state) => <ScrollNav variant={variant} state={state} />}
  />
);

export { SideNavScroll };
