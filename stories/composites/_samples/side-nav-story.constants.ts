/* @layer stories @kind data */
const SIDE_NAV_CODE = `import { SideNav } from '@drizztdourden08/tessera';

const [active, setActive] = useState('sessions');
const [query, setQuery] = useState('');

<SideNav
  config={{ home: HOME, top: [INBOX], groups: GROUPS }}
  activeId={active}
  onSelect={setActive}
  search={{ value: query, onChange: setQuery, placeholder: 'Search sessions' }}
/>`;

export { SIDE_NAV_CODE };
