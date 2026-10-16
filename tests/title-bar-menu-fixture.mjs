/* @layer tooling-scripts @kind test */
const ignore = () => undefined;
const BUG = { id: 'bug', icon: 'bug', label: 'Report a bug', onSelect: ignore };
const STRINGS = { view: 'View', pinOnTop: 'Pin window on top', unpin: 'Unpin window', fullscreen: 'Fullscreen', exitFullscreen: 'Exit fullscreen' };
const item = (id) => ({ id, label: id, onSelect: ignore });
const MENU = [
  { id: 'screens', items: [item('home'), item('library')] },
  { id: 'tools', items: [item('tools'), { separator: true }, item('settings')] },
  { id: 'app', items: [item('about')] },
];
const MENU_INPUT = { menu: MENU, actions: [BUG], pin: true, fullscreenButton: true, pinned: false, fullscreen: false, onControl: ignore, strings: STRINGS };
const BOTH = ['control:pin', 'control:fullscreen'];
const ids = (groups) => groups.map((group) => [group.id, group.items.map((node) => node.id ?? '---')]);

export { BOTH, ids, ignore, MENU_INPUT };
