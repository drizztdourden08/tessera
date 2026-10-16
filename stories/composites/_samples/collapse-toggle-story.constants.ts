/* @layer stories @kind data */
const COLLAPSE_TEXT = {
  panel: 'profiles',
  body: 'The panel of the app. The chevron points to its edge: a click folds it there.',
  main: 'The main view takes the room the panel gives back.',
} as const;

const COLLAPSE_CODE = `import { CollapseToggle } from '@drizztdourden08/tessera';

<aside id="profiles" className="profile-rail">
  <CollapseToggle
    collapsed={collapsed}
    onToggle={() => setCollapsed(!collapsed)}
    label="profiles"
    side="start"
    controls="profiles"
    className="profile-rail__toggle"
  />
  {!collapsed && <ProfileList />}
</aside>`;

export { COLLAPSE_CODE, COLLAPSE_TEXT };
